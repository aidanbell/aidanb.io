import { z } from 'zod';

const fieldTypeSchema = z.enum([
  'string',
  'email',
  'number',
  'boolean',
  'select',
  'textarea',
]);

const fieldDefinitionSchema = z
  .object({
    name: z
      .string()
      .min(1, 'Field name is required')
      .regex(/^[a-zA-Z_][a-zA-Z0-9_]*$/, 'Field name must be a valid identifier'),
    type: fieldTypeSchema,
    label: z.string().optional(),
    required: z.boolean().optional(),
    placeholder: z.string().optional(),
    options: z.array(z.string().min(1)).optional(),
    min: z.number().optional(),
    max: z.number().optional(),
    minLength: z.number().int().nonnegative().optional(),
    maxLength: z.number().int().positive().optional(),
  })
  .superRefine((field, ctx) => {
    if (field.type === 'select' && (!field.options || field.options.length === 0)) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: `Field "${field.name}" with type "select" requires a non-empty options array`,
        path: ['options'],
      });
    }
  });

const formDefinitionSchema = z.object({
  title: z.string().optional(),
  fields: z.array(fieldDefinitionSchema).min(1, 'At least one field is required'),
});

export function parseFormDefinition(input) {
  let json;
  try {
    json = JSON.parse(input);
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Invalid JSON',
    };
  }

  const result = formDefinitionSchema.safeParse(json);
  if (!result.success) {
    const issue = result.error.issues[0];
    const path = issue.path.length > 0 ? ` at ${issue.path.join('.')}` : '';
    return {
      success: false,
      error: `${issue.message}${path}`,
    };
  }

  const names = result.data.fields.map((field) => field.name);
  const duplicates = names.filter((name, index) => names.indexOf(name) !== index);
  if (duplicates.length > 0) {
    return {
      success: false,
      error: `Duplicate field name: "${duplicates[0]}"`,
    };
  }

  return { success: true, data: result.data };
}

export function buildFormValidationSchema(fields) {
  const shape = {};

  for (const field of fields) {
    let validator;

    switch (field.type) {
      case 'email':
        validator = z.string().email('Enter a valid email address');
        break;
      case 'number': {
        let numberValidator = z.coerce.number({
          invalid_type_error: 'Enter a valid number',
        });
        if (field.min !== undefined) {
          numberValidator = numberValidator.min(
            field.min,
            `Must be at least ${field.min}`
          );
        }
        if (field.max !== undefined) {
          numberValidator = numberValidator.max(
            field.max,
            `Must be at most ${field.max}`
          );
        }
        validator = numberValidator;
        break;
      }
      case 'boolean':
        validator = z.boolean();
        break;
      case 'select':
        validator = z.enum(field.options, {
          errorMap: () => ({ message: 'Select an option' }),
        });
        break;
      case 'textarea':
      case 'string':
      default: {
        let stringValidator = z.string();
        if (field.minLength !== undefined) {
          stringValidator = stringValidator.min(
            field.minLength,
            `Must be at least ${field.minLength} characters`
          );
        }
        if (field.maxLength !== undefined) {
          stringValidator = stringValidator.max(
            field.maxLength,
            `Must be at most ${field.maxLength} characters`
          );
        }
        validator = stringValidator;
        break;
      }
    }

    if (!field.required) {
      if (field.type === 'boolean') {
        validator = validator.optional();
      } else if (field.type === 'number') {
        validator = z
          .union([z.literal(''), z.coerce.number()])
          .optional()
          .transform((value) => (value === '' ? undefined : value));
      } else {
        validator = validator.optional().or(z.literal(''));
      }
    }

    shape[field.name] = validator;
  }

  return z.object(shape);
}

export function getDefaultValues(fields) {
  return fields.reduce((defaults, field) => {
    if (field.type === 'boolean') {
      defaults[field.name] = false;
    } else if (field.type === 'select' && field.options?.length) {
      defaults[field.name] = field.required ? field.options[0] : '';
    } else {
      defaults[field.name] = '';
    }
    return defaults;
  }, {});
}

import type { FormDefinition } from '@aidanbell/schema-form';
import { useSchemaForm } from '@aidanbell/schema-form';
import Button from '../ui/Button';
import Checkbox from '../ui/Checkbox';
import Input from '../ui/Input';
import Label from '../ui/Label';
import Select from '../ui/Select';
import Textarea from '../ui/Textarea';

function fieldErrorMessage(message: unknown) {
  return typeof message === 'string' ? message : undefined;
}

function FieldError({ message }: { message?: string }) {
  if (!message) return null;
  return <p className="text-xs text-red-500">{message}</p>;
}

function FieldDescription({ text }: { text?: string }) {
  if (!text) return null;
  return (
    <p className="text-xs text-neutral-500 dark:text-neutral-400">{text}</p>
  );
}

type HeadlessFormProps = {
  definition: FormDefinition;
  onSubmit: (values: Record<string, unknown>) => void;
};

/**
 * "Bring your own UI" demo: the headless @aidanbell/schema-form hook wired to
 * this site's own form primitives instead of the styled schema-form-ui package.
 */
export default function HeadlessForm({
  definition,
  onSubmit,
}: HeadlessFormProps) {
  const { fields, form, handleSubmit } = useSchemaForm({
    definition,
    onSubmit,
  });
  const {
    register,
    reset,
    formState: { errors },
  } = form;

  return (
    <form
      onSubmit={handleSubmit}
      className="flex h-full flex-col gap-4"
      noValidate
    >
      <div className="space-y-4">
        {fields.map((field) => {
          const fieldId = `headless-${field.name}`;
          const error = fieldErrorMessage(errors[field.name]?.message);
          const label = field.label ?? field.name;

          if (field.type === 'boolean') {
            return (
              <div key={field.name} className="flex items-start gap-3">
                <Checkbox
                  id={fieldId}
                  disabled={field.disabled}
                  {...register(field.name)}
                />
                <div className="space-y-1">
                  <Label htmlFor={fieldId} required={field.required}>
                    {label}
                  </Label>
                  <FieldDescription text={field.description} />
                  <FieldError message={error} />
                </div>
              </div>
            );
          }

          if (field.type === 'radio') {
            return (
              <fieldset key={field.name} className="space-y-2">
                <legend className="text-sm font-medium text-neutral-900 dark:text-neutral-100">
                  {label}
                  {field.required && (
                    <span className="ml-0.5 text-red-500">*</span>
                  )}
                </legend>
                <FieldDescription text={field.description} />
                <div className="flex flex-wrap gap-4">
                  {field.options?.map((option) => (
                    <label
                      key={option.value}
                      className="flex items-center gap-2 text-sm text-neutral-700 dark:text-neutral-300"
                    >
                      <input
                        type="radio"
                        value={option.value}
                        disabled={field.disabled}
                        className="size-4 border-neutral-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-400 dark:border-neutral-600"
                        {...register(field.name)}
                      />
                      {option.label}
                    </label>
                  ))}
                </div>
                <FieldError message={error} />
              </fieldset>
            );
          }

          if (field.type === 'textarea') {
            return (
              <div key={field.name} className="space-y-2">
                <Label htmlFor={fieldId} required={field.required}>
                  {label}
                </Label>
                <FieldDescription text={field.description} />
                <Textarea
                  id={fieldId}
                  placeholder={field.placeholder}
                  disabled={field.disabled}
                  {...register(field.name)}
                />
                <FieldError message={error} />
              </div>
            );
          }

          if (field.type === 'select') {
            return (
              <div key={field.name} className="space-y-2">
                <Label htmlFor={fieldId} required={field.required}>
                  {label}
                </Label>
                <FieldDescription text={field.description} />
                <Select
                  id={fieldId}
                  disabled={field.disabled}
                  {...register(field.name)}
                >
                  {!field.required && <option value="">Select...</option>}
                  {field.options?.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </Select>
                <FieldError message={error} />
              </div>
            );
          }

          const inputType = field.type === 'string' ? 'text' : field.type;

          return (
            <div key={field.name} className="space-y-2">
              <Label htmlFor={fieldId} required={field.required}>
                {label}
              </Label>
              <FieldDescription text={field.description} />
              <Input
                id={fieldId}
                type={inputType}
                placeholder={field.placeholder}
                disabled={field.disabled}
                {...register(field.name)}
              />
              <FieldError message={error} />
            </div>
          );
        })}
      </div>

      <div className="mt-auto flex gap-2 pt-2">
        <Button type="submit">Submit</Button>
        <Button type="button" variant="secondary" onClick={() => reset()}>
          Reset
        </Button>
      </div>
    </form>
  );
}

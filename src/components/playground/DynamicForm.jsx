import { useEffect, useMemo } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  buildFormValidationSchema,
  getDefaultValues,
} from '../../lib/schema';
import Button from '../ui/Button';
import Checkbox from '../ui/Checkbox';
import Input from '../ui/Input';
import Label from '../ui/Label';
import Select from '../ui/Select';
import Textarea from '../ui/Textarea';

function FieldError({ message }) {
  if (!message) return null;
  return <p className="text-xs text-red-500">{message}</p>;
}

export default function DynamicForm({ definition, onSubmit }) {
  const validationSchema = useMemo(
    () => buildFormValidationSchema(definition.fields),
    [definition.fields]
  );

  const defaultValues = useMemo(
    () => getDefaultValues(definition.fields),
    [definition.fields]
  );

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(validationSchema),
    defaultValues,
  });

  useEffect(() => {
    reset(defaultValues);
  }, [defaultValues, reset]);

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex h-full flex-col gap-4"
      noValidate
    >
      <div className="space-y-4">
        {definition.fields.map((field) => {
          const fieldId = `field-${field.name}`;
          const error = errors[field.name]?.message;

          if (field.type === 'boolean') {
            return (
              <div key={field.name} className="flex items-start gap-3">
                <Checkbox id={fieldId} {...register(field.name)} />
                <div className="space-y-1">
                  <Label htmlFor={fieldId}>
                    {field.label ?? field.name}
                  </Label>
                  <FieldError message={error} />
                </div>
              </div>
            );
          }

          if (field.type === 'textarea') {
            return (
              <div key={field.name} className="space-y-2">
                <Label htmlFor={fieldId} required={field.required}>
                  {field.label ?? field.name}
                </Label>
                <Textarea
                  id={fieldId}
                  placeholder={field.placeholder}
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
                  {field.label ?? field.name}
                </Label>
                <Select id={fieldId} {...register(field.name)}>
                  {!field.required && <option value="">Select...</option>}
                  {field.options?.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </Select>
                <FieldError message={error} />
              </div>
            );
          }

          return (
            <div key={field.name} className="space-y-2">
              <Label htmlFor={fieldId} required={field.required}>
                {field.label ?? field.name}
              </Label>
              <Input
                id={fieldId}
                type={field.type === 'number' ? 'number' : field.type}
                placeholder={field.placeholder}
                min={field.min}
                max={field.max}
                minLength={field.minLength}
                maxLength={field.maxLength}
                {...register(field.name)}
              />
              <FieldError message={error} />
            </div>
          );
        })}
      </div>

      <div className="mt-auto flex gap-2 pt-2">
        <Button type="submit">Submit</Button>
        <Button type="button" variant="secondary" onClick={() => reset(defaultValues)}>
          Reset
        </Button>
      </div>
    </form>
  );
}

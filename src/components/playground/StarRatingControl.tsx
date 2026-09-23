import { Controller } from "react-hook-form";
import type { FieldControlProps } from "@aidanbell/schema-form-ui";
import { cn } from "../../lib/cn";

const DEFAULT_MAX = 5;
const DEFAULT_MIN = 1;

/**
 * Custom control for a number field — replaces only the input chrome.
 * Used via `config.fields.rating.component`.
 */
export function StarRatingControl({
  field,
  form,
  id,
  disabled,
  className,
  "aria-invalid": ariaInvalid,
  "aria-describedby": ariaDescribedBy,
}: FieldControlProps) {
  const max = typeof field.max === "number" ? field.max : DEFAULT_MAX;
  const min = typeof field.min === "number" ? field.min : DEFAULT_MIN;
  const count = Math.max(0, max - min + 1);

  return (
    <Controller
      name={field.name}
      control={form.control}
      render={({ field: rhf }) => {
        const value = typeof rhf.value === "number" ? rhf.value : 0;

        return (
          <div
            id={id}
            role="radiogroup"
            aria-label={field.label ?? field.name}
            aria-invalid={ariaInvalid}
            aria-describedby={ariaDescribedBy}
            className={cn("flex flex-wrap items-center gap-1", className)}
          >
            {Array.from({ length: count }, (_, index) => {
              const starValue = min + index;
              const selected = value >= starValue;

              return (
                <button
                  key={starValue}
                  type="button"
                  role="radio"
                  aria-checked={value === starValue}
                  aria-label={`${starValue} of ${max}`}
                  disabled={disabled}
                  onClick={() => rhf.onChange(starValue)}
                  className="rounded p-0.5 text-xl leading-none text-neutral-300 transition-colors hover:text-amber-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-400 disabled:pointer-events-none disabled:opacity-50 dark:text-neutral-600 dark:hover:text-amber-400 dark:focus-visible:ring-neutral-500"
                >
                  <span aria-hidden="true" className={cn(selected && "text-amber-400", "text-4xl")}>
                    {selected ? "★" : "☆"}
                  </span>
                </button>
              );
            })}
          </div>
        );
      }}
    />
  );
}

/**
 * Full-row custom field for `renderField` — owns label, description, and error.
 */
export function StarRatingRow(props: FieldControlProps) {
  const { field, error } = props;
  const label = field.label ?? field.name;
  const descriptionId = `${field.name}-description`;
  const errorId = `${field.name}-error`;

  return (
    <div className="space-y-2">
      <div className="text-sm font-medium text-neutral-900 dark:text-neutral-100">
        {label}
        {field.required && <span className="ml-0.5 text-red-500">*</span>}
      </div>
      {field.description && (
        <p id={descriptionId} className="text-xs text-neutral-500 dark:text-neutral-400">
          {field.description}
        </p>
      )}
      <StarRatingControl {...props} />
      {error && (
        <p id={errorId} role="alert" className="text-sm text-red-500">
          {String(error.message ?? "Invalid value")}
        </p>
      )}
    </div>
  );
}

import type { LabelHTMLAttributes } from 'react';
import { cn } from '../../lib/cn';

type LabelProps = LabelHTMLAttributes<HTMLLabelElement> & {
  required?: boolean;
};

export default function Label({
  className,
  required,
  children,
  ...props
}: LabelProps) {
  return (
    <label
      className={cn(
        'text-sm font-medium text-neutral-900 dark:text-neutral-100',
        className,
      )}
      {...props}
    >
      {children}
      {required && <span className="ml-0.5 text-red-500">*</span>}
    </label>
  );
}

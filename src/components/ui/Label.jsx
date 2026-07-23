import { cn } from '../../lib/cn';

export default function Label({ className, required, children, ...props }) {
  return (
    <label
      className={cn('text-sm font-medium text-neutral-900 dark:text-neutral-100', className)}
      {...props}
    >
      {children}
      {required && <span className="ml-0.5 text-red-500">*</span>}
    </label>
  );
}

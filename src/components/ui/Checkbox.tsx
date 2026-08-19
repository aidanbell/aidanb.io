import type { InputHTMLAttributes } from 'react';
import { cn } from '../../lib/cn';

export default function Checkbox({
  className,
  ...props
}: InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      type="checkbox"
      className={cn(
        'size-4 rounded border border-neutral-300 text-neutral-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-400 dark:border-neutral-600 dark:bg-neutral-900',
        className,
      )}
      {...props}
    />
  );
}

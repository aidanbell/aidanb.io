import type { SchemaFormClassNames } from '@aidanbell/schema-form-ui';

export type ThemePreset = {
  id: string;
  label: string;
  classNames: SchemaFormClassNames | null;
};

export const themePresets: ThemePreset[] = [
  {
    id: 'default',
    label: 'Default',
    classNames: null,
  },
  {
    id: 'emerald',
    label: 'Emerald',
    classNames: {
      label: 'text-emerald-950 dark:text-emerald-100',
      control:
        'border-emerald-300 focus-visible:ring-emerald-500 dark:border-emerald-800',
      submitButton:
        'bg-emerald-600 text-white hover:bg-emerald-700 dark:bg-emerald-500 dark:text-emerald-950 dark:hover:bg-emerald-400',
    },
  },
  {
    id: 'compact',
    label: 'Compact',
    classNames: {
      form: 'gap-3',
      field: 'gap-1',
      label: 'text-xs',
      description: 'text-[11px]',
      control: 'h-8 px-2 text-xs',
      error: 'text-[11px]',
      submitButton: 'h-8 px-3 text-xs',
      resetButton: 'h-8 px-3 text-xs',
    },
  },
];

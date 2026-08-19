import { useState } from 'react';
import { Check, Copy } from 'lucide-react';
import type { FormDefinition } from '@aidanbell/schema-form';
import type { SchemaFormClassNames } from '@aidanbell/schema-form-ui';
import Button from '../ui/Button';

const STYLED_PACKAGES =
  'pnpm add @aidanbell/schema-form-ui @aidanbell/schema-form valibot react-hook-form @hookform/resolvers';
const HEADLESS_PACKAGES =
  'pnpm add @aidanbell/schema-form valibot react-hook-form @hookform/resolvers';

function indentBlock(text: string, spaces: number) {
  const pad = ' '.repeat(spaces);
  return text
    .split('\n')
    .map((line, index) => (index === 0 ? line : pad + line))
    .join('\n');
}

function buildStyledSnippet(
  schema: FormDefinition,
  themeClassNames: SchemaFormClassNames | null,
) {
  const schemaJson = indentBlock(JSON.stringify(schema, null, 2), 0);
  const config = themeClassNames
    ? `{\n        schema,\n        classNames: ${indentBlock(
        JSON.stringify(themeClassNames, null, 2),
        8,
      )},\n      }`
    : '{ schema }';

  return `import { SchemaForm } from '@aidanbell/schema-form-ui';

const schema = ${schemaJson};

export function MyForm() {
  return (
    <SchemaForm
      config={${config}}
      onSubmit={(values) => console.log(values)}
    />
  );
}
`;
}

function buildHeadlessSnippet(schema: FormDefinition) {
  const schemaJson = indentBlock(JSON.stringify(schema, null, 2), 0);

  return `import { parseFormDefinition, useSchemaForm } from '@aidanbell/schema-form';

const parsed = parseFormDefinition(${schemaJson});

if (!parsed.success) {
  throw new Error(parsed.error);
}

export function MyForm() {
  const { fields, form, handleSubmit } = useSchemaForm({
    definition: parsed.data,
    onSubmit: (values) => console.log(values),
  });

  return (
    <form onSubmit={handleSubmit}>
      {fields.map((field) => (
        <label key={field.name}>
          {field.label ?? field.name}
          <input {...form.register(field.name)} />
        </label>
      ))}
      <button type="submit">Submit</button>
    </form>
  );
}
`;
}

function CopyButton({ text, label }: { text: string; label: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      // Clipboard unavailable (e.g. insecure context); nothing to do.
    }
  };

  return (
    <Button
      variant="secondary"
      size="sm"
      onClick={handleCopy}
      className="gap-1.5"
    >
      {copied ? (
        <Check
          className="size-3.5 text-green-600 dark:text-green-400"
          strokeWidth={1.75}
          aria-hidden="true"
        />
      ) : (
        <Copy className="size-3.5" strokeWidth={1.75} aria-hidden="true" />
      )}
      {copied ? 'Copied' : label}
    </Button>
  );
}

type CodeSnippetProps = {
  schema: FormDefinition;
  mode: 'styled' | 'headless';
  themeClassNames: SchemaFormClassNames | null;
};

export default function CodeSnippet({
  schema,
  mode,
  themeClassNames,
}: CodeSnippetProps) {
  const install = mode === 'styled' ? STYLED_PACKAGES : HEADLESS_PACKAGES;
  const snippet =
    mode === 'styled'
      ? buildStyledSnippet(schema, themeClassNames)
      : buildHeadlessSnippet(schema);

  return (
    <section className="mt-6 rounded-lg border border-neutral-200 bg-white p-4 dark:border-neutral-800 dark:bg-neutral-900">
      <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
        <div>
          <h2 className="text-sm font-medium">Use it in your app</h2>
          <p className="mt-1 text-xs text-neutral-500 dark:text-neutral-400">
            {mode === 'styled'
              ? 'The styled component, with your current schema and theme.'
              : 'The headless hook with your current schema — bring your own inputs.'}
          </p>
        </div>
        <CopyButton text={snippet} label="Copy code" />
      </div>

      <div className="mb-3 flex items-center gap-2">
        <pre className="min-w-0 flex-1 overflow-x-auto rounded-md bg-neutral-50 px-3 py-2 text-xs text-neutral-800 dark:bg-neutral-950 dark:text-neutral-200">
          {install}
        </pre>
        <CopyButton text={install} label="Copy" />
      </div>

      <pre className="overflow-x-auto rounded-md bg-neutral-50 p-4 text-xs leading-relaxed text-neutral-800 dark:bg-neutral-950 dark:text-neutral-200">
        {snippet}
      </pre>

      {mode === 'styled' && (
        <p className="mt-3 text-xs text-neutral-500 dark:text-neutral-400">
          schema-form-ui ships no CSS file — add{' '}
          <code className="rounded bg-neutral-100 px-1 py-0.5 dark:bg-neutral-800">
            @source "../node_modules/@aidanbell/schema-form-ui/dist/**/*.{'{'}
            js,mjs{'}'}"
          </code>{' '}
          to your Tailwind CSS entry so its classes are generated.
        </p>
      )}
    </section>
  );
}

import { useState } from "react";
import type { FormDefinition } from "@aidanbell/schema-form";
import type { SchemaFormClassNames } from "@aidanbell/schema-form-ui";
import Button from "../ui/Button";

export type CustomControlMode = "none" | "component" | "renderField";

const STYLED_PACKAGES =
  "pnpm add @aidanbell/schema-form-ui @aidanbell/schema-form valibot react-hook-form @hookform/resolvers";
const HEADLESS_PACKAGES = "pnpm add @aidanbell/schema-form valibot react-hook-form @hookform/resolvers";

function indentBlock(text: string, spaces: number) {
  const pad = " ".repeat(spaces);
  return text
    .split("\n")
    .map((line, index) => (index === 0 ? line : pad + line))
    .join("\n");
}

function buildStyledSnippet(
  schema: FormDefinition,
  themeClassNames: SchemaFormClassNames | null,
  customControl: CustomControlMode,
) {
  const schemaJson = indentBlock(JSON.stringify(schema, null, 2), 0);

  if (customControl === "component") {
    return `import { SchemaForm, type FieldControlProps } from '@aidanbell/schema-form-ui';
import { Controller } from 'react-hook-form';

const schema = ${schemaJson};

function StarRatingControl(props: FieldControlProps) {
  // Wire value with Controller — see playground StarRatingControl.tsx
  return <Controller name={props.field.name} control={props.form.control} render={() => /* stars */ null} />;
}

export function MyForm() {
  return (
    <SchemaForm
      config={{
        schema,
        fields: { rating: { component: StarRatingControl } },
      }}
      onSubmit={(values) => console.log(values)}
    />
  );
}
`;
  }

  if (customControl === "renderField") {
    return `import { SchemaForm, type FieldControlProps } from '@aidanbell/schema-form-ui';

const schema = ${schemaJson};

function StarRatingRow(props: FieldControlProps) {
  // Own the full row (label, control, error) — see playground StarRatingControl.tsx
  return <div>{/* custom rating row */}</div>;
}

export function MyForm() {
  return (
    <SchemaForm
      config={{ schema }}
      renderField={(props, defaultRender) =>
        props.field.name === 'rating' ? <StarRatingRow {...props} /> : defaultRender(props)
      }
      onSubmit={(values) => console.log(values)}
    />
  );
}
`;
  }

  const config = themeClassNames
    ? `{\n        schema,\n        classNames: ${indentBlock(JSON.stringify(themeClassNames, null, 2), 8)},\n      }`
    : "{ schema }";

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
    <Button variant="secondary" size="sm" onClick={handleCopy}>
      [{copied ? "Copied" : label}]
    </Button>
  );
}

type CodeSnippetProps = {
  schema: FormDefinition;
  mode: "styled" | "headless";
  themeClassNames: SchemaFormClassNames | null;
  customControl: CustomControlMode;
};

export default function CodeSnippet({ schema, mode, themeClassNames, customControl }: CodeSnippetProps) {
  const install = mode === "styled" ? STYLED_PACKAGES : HEADLESS_PACKAGES;
  const snippet =
    mode === "styled" ? buildStyledSnippet(schema, themeClassNames, customControl) : buildHeadlessSnippet(schema);

  const blurb =
    mode === "headless"
      ? "The headless hook with your current schema — bring your own inputs."
      : customControl === "component"
        ? "Per-field control swap via config.fields.rating.component (label/error chrome stays)."
        : customControl === "renderField"
          ? "Full-row escape hatch via renderField — defaultRender for every other field."
          : "The styled component, with your current schema and theme.";

  return (
    <section className="mt-6 border border-neutral-900/25 p-4 dark:border-neutral-100/25">
      <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
        <div>
          <h2 className="text-[11px] font-bold tracking-[0.2em]">USE IT IN YOUR APP</h2>
          <p className="mt-1 text-xs text-neutral-500 dark:text-neutral-400">{blurb}</p>
        </div>
        <CopyButton text={snippet} label="Copy code" />
      </div>

      <div className="mb-3 flex items-center gap-2">
        <pre className="min-w-0 flex-1 overflow-x-auto border border-dotted border-neutral-900/15 bg-neutral-900/[0.03] px-3 py-2 text-xs text-neutral-800 dark:border-neutral-100/15 dark:bg-neutral-950 dark:text-neutral-200">
          {install}
        </pre>
        <CopyButton text={install} label="Copy" />
      </div>

      <pre className="overflow-x-auto border border-dotted border-neutral-900/15 bg-neutral-900/[0.03] p-4 text-xs leading-relaxed text-neutral-800 dark:border-neutral-100/15 dark:bg-neutral-950 dark:text-neutral-200">
        {snippet}
      </pre>

      {mode === "styled" && (
        <p className="mt-3 text-xs text-neutral-500 dark:text-neutral-400">
          schema-form-ui ships no CSS file — add{" "}
          <code className="text-[11px] tracking-[0.04em]">
            @source "../node_modules/@aidanbell/schema-form-ui/dist/**/*.{"{"}
            js,mjs{"}"}"
          </code>{" "}
          to your Tailwind CSS entry so its classes are generated.
        </p>
      )}
    </section>
  );
}

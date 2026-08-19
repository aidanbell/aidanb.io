import { useMemo, useState, type ChangeEvent } from "react";
import { AlignLeft, CircleAlert, CircleCheck, ExternalLink, TriangleAlert } from "lucide-react";
import { parseFormDefinition, type ParseIssue } from "@aidanbell/schema-form";
import { SchemaForm } from "@aidanbell/schema-form-ui";
import { defaultSchemaText, sampleSchemas } from "../../lib/sampleSchemas";
import Button from "../ui/Button";
import CodeSnippet from "./CodeSnippet";
import HeadlessForm from "./HeadlessForm";
import SchemaEditor from "./SchemaEditor";
import { themePresets } from "./themePresets";

type PlaygroundMode = "styled" | "headless";

function requireFirst<T>(items: T[], label: string): T {
  const first = items[0];
  if (!first) {
    throw new Error(`${label} must include at least one item`);
  }
  return first;
}

const defaultTheme = requireFirst(themePresets, "themePresets");
const defaultSample = requireFirst(sampleSchemas, "sampleSchemas");

const packageLinks = [
  {
    label: "@aidanbell/schema-form",
    href: "https://www.npmjs.com/package/@aidanbell/schema-form",
  },
  {
    label: "@aidanbell/schema-form-ui",
    href: "https://www.npmjs.com/package/@aidanbell/schema-form-ui",
  },
];

function formatSchemaText(text: string) {
  return JSON.stringify(JSON.parse(text), null, 2);
}

function IssueList({
  issues,
  fallback,
  tone,
}: {
  issues?: ParseIssue[];
  fallback?: string;
  tone?: "warning" | "error";
}) {
  const toneClasses =
    tone === "warning"
      ? "bg-amber-50 text-amber-700 dark:bg-amber-950/40 dark:text-amber-400"
      : "bg-red-50 text-red-600 dark:bg-red-950/40 dark:text-red-400";

  return (
    <div className={`mt-3 rounded-md px-3 py-2 text-sm ${toneClasses}`}>
      {issues?.length ? (
        <ul className="space-y-1">
          {issues.map((issue, index) => (
            <li key={`${issue.path}-${index}`}>
              {issue.path && (
                <code className="mr-1.5 rounded bg-black/5 px-1 py-0.5 text-xs dark:bg-white/10">{issue.path}</code>
              )}
              {issue.message}
            </li>
          ))}
        </ul>
      ) : (
        <p>{fallback}</p>
      )}
    </div>
  );
}

export default function Playground() {
  const [schemaText, setSchemaText] = useState(defaultSchemaText);
  const [submittedValues, setSubmittedValues] = useState<Record<string, unknown> | null>(null);
  const [mode, setMode] = useState<PlaygroundMode>("styled");
  const [themeId, setThemeId] = useState(defaultTheme.id);

  const parseResult = useMemo(() => parseFormDefinition(schemaText), [schemaText]);
  const theme = themePresets.find((preset) => preset.id === themeId) ?? defaultTheme;

  const handleSampleChange = (event: ChangeEvent<HTMLSelectElement>) => {
    const sample = sampleSchemas.find((item) => item.id === event.target.value);
    if (!sample) return;
    setSchemaText(JSON.stringify(sample.schema, null, 2));
    setSubmittedValues(null);
  };

  const handleFormat = () => {
    try {
      setSchemaText(formatSchemaText(schemaText));
    } catch {
      // Keep invalid text as-is; parse error panel will surface the issue.
    }
  };

  const handleModeChange = (nextMode: PlaygroundMode) => {
    setMode(nextMode);
    setSubmittedValues(null);
  };

  return (
    <div className="mx-auto max-w-6xl px-6 py-10">
      <div className="mb-8 max-w-2xl">
        <h1 className="text-3xl font-semibold tracking-tight">Playground</h1>
        <p className="mt-3 text-neutral-500 dark:text-neutral-400">
          Schema in, accessible form out. Edit the JSON schema on the left and preview a live form on the right —
          rendered by{" "}
          <code className="rounded bg-neutral-100 px-1 py-0.5 text-sm dark:bg-neutral-800">@aidanbell/schema-form</code>
          .
        </p>
        <div className="mt-3 flex flex-wrap gap-4">
          {packageLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1 text-sm text-neutral-600 underline-offset-4 hover:underline dark:text-neutral-400"
            >
              {link.label}
              <ExternalLink className="size-3.5" strokeWidth={1.75} aria-hidden="true" />
            </a>
          ))}
        </div>
      </div>

      <div className="mb-4 flex flex-wrap items-center gap-3">
        <label className="flex items-center gap-2 text-sm text-neutral-600 dark:text-neutral-400">
          Sample
          <select
            className="h-9 rounded-md border border-neutral-200 bg-white px-3 text-sm dark:border-neutral-700 dark:bg-neutral-900"
            defaultValue={defaultSample.id}
            onChange={handleSampleChange}
          >
            {sampleSchemas.map((sample) => (
              <option key={sample.id} value={sample.id}>
                {sample.label}
              </option>
            ))}
          </select>
        </label>

        <Button variant="secondary" size="md" onClick={handleFormat} className="gap-1.5">
          <AlignLeft className="size-3.5" strokeWidth={1.75} aria-hidden="true" />
          Format JSON
        </Button>

        <div
          className="inline-flex rounded-md border border-neutral-200 p-0.5 dark:border-neutral-700"
          role="group"
          aria-label="Renderer"
        >
          <button
            type="button"
            onClick={() => handleModeChange("styled")}
            className={`h-8 rounded px-3 text-xs font-medium transition-colors ${
              mode === "styled"
                ? "bg-neutral-900 text-white dark:bg-neutral-100 dark:text-neutral-900"
                : "text-neutral-600 hover:bg-neutral-100 dark:text-neutral-400 dark:hover:bg-neutral-800"
            }`}
          >
            Styled
          </button>
          <button
            type="button"
            onClick={() => handleModeChange("headless")}
            className={`h-8 rounded px-3 text-xs font-medium transition-colors ${
              mode === "headless"
                ? "bg-neutral-900 text-white dark:bg-neutral-100 dark:text-neutral-900"
                : "text-neutral-600 hover:bg-neutral-100 dark:text-neutral-400 dark:hover:bg-neutral-800"
            }`}
          >
            Headless
          </button>
        </div>

        {mode === "styled" && (
          <label className="flex items-center gap-2 text-sm text-neutral-600 dark:text-neutral-400">
            Theme
            <select
              className="h-9 rounded-md border border-neutral-200 bg-white px-3 text-sm dark:border-neutral-700 dark:bg-neutral-900"
              value={themeId}
              onChange={(event) => setThemeId(event.target.value)}
            >
              {themePresets.map((preset) => (
                <option key={preset.id} value={preset.id}>
                  {preset.label}
                </option>
              ))}
            </select>
          </label>
        )}
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <section className="flex min-h-[520px] min-w-0 flex-col overflow-hidden rounded-lg border border-neutral-200 bg-white p-4 dark:border-neutral-800 dark:bg-neutral-900">
          <div className="mb-3 flex items-center justify-between">
            <h2 className="text-sm font-medium">Schema</h2>
            {parseResult.success ? (
              <span className="inline-flex items-center gap-1.5 text-xs text-green-600 dark:text-green-400">
                <CircleCheck className="size-3.5" strokeWidth={1.75} aria-hidden="true" />
                Valid
              </span>
            ) : (
              <span className="inline-flex items-center gap-1.5 text-xs text-red-500">
                <CircleAlert className="size-3.5" strokeWidth={1.75} aria-hidden="true" />
                Invalid
              </span>
            )}
          </div>
          <div className="min-h-0 min-w-0 flex-1">
            <SchemaEditor value={schemaText} onChange={setSchemaText} />
          </div>
          {!parseResult.success && <IssueList issues={parseResult.issues} fallback={parseResult.error} />}
          {parseResult.success && (parseResult.warnings?.length ?? 0) > 0 && (
            <div className="mt-3">
              <p className="mb-1 inline-flex items-center gap-1.5 text-xs text-amber-600 dark:text-amber-400">
                <TriangleAlert className="size-3.5" strokeWidth={1.75} aria-hidden="true" />
                Warnings
              </p>
              <IssueList issues={parseResult.warnings} tone="warning" />
            </div>
          )}
        </section>
        <div className="flex flex-col gap-2">
          <section className="flex min-h-[260px] h-fit min-w-0 flex-col overflow-hidden rounded-lg border border-neutral-200 bg-white p-4 dark:border-neutral-800 dark:bg-neutral-900">
            <div className="mb-3 flex items-center justify-between">
              <h2 className="text-sm font-medium">Preview</h2>
              <span className="text-xs text-neutral-400 dark:text-neutral-500">
                {mode === "styled" ? "<SchemaForm /> from schema-form-ui" : "useSchemaForm + custom inputs"}
              </span>
            </div>
            <div className="min-h-0 min-w-0 flex-1 overflow-y-auto">
              {parseResult.success ? (
                mode === "styled" ? (
                  <SchemaForm
                    key={`styled-${themeId}-${schemaText}`}
                    config={{
                      schema: parseResult.data,
                      ...(theme.classNames ? { classNames: theme.classNames } : {}),
                    }}
                    onSubmit={(values) => setSubmittedValues(values)}
                  />
                ) : (
                  <HeadlessForm
                    key={`headless-${schemaText}`}
                    definition={parseResult.data}
                    onSubmit={(values) => setSubmittedValues(values)}
                  />
                )
              ) : (
                <div className="flex h-full items-center justify-center rounded-md border border-dashed border-neutral-200 p-6 text-sm text-neutral-500 dark:border-neutral-700 dark:text-neutral-400">
                  Fix schema errors to render the form.
                </div>
              )}
            </div>
          </section>
          {submittedValues && (
            <section className="mt-6 rounded-lg border border-neutral-200 bg-white p-4 dark:border-neutral-800 dark:bg-neutral-900">
              <h2 className="mb-3 text-sm font-medium">Submitted values</h2>
              <pre className="overflow-x-auto rounded-md bg-neutral-50 p-4 text-sm text-neutral-800 dark:bg-neutral-950 dark:text-neutral-200">
                {JSON.stringify(submittedValues, null, 2)}
              </pre>
            </section>
          )}
        </div>
      </div>

      {parseResult.success && <CodeSnippet schema={parseResult.data} mode={mode} themeClassNames={theme.classNames} />}
    </div>
  );
}

import { useMemo, useState, type ChangeEvent, type ReactNode } from "react";
import { parseFormDefinition, type FormDefinition, type ParseIssue } from "@aidanbell/schema-form";
import { SchemaForm, type FieldControlProps } from "@aidanbell/schema-form-ui";
import { defaultSchemaText, sampleSchemas } from "../../lib/sampleSchemas";
import Button from "../ui/Button";
import CodeSnippet, { type CustomControlMode } from "./CodeSnippet";
import HeadlessForm from "./HeadlessForm";
import SchemaEditor from "./SchemaEditor";
import { StarRatingControl, StarRatingRow } from "./StarRatingControl";
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
const feedbackSample = sampleSchemas.find((sample) => sample.id === "feedback") ?? defaultSample;

const packageLinks = [
  {
    label: "GitHub",
    href: "https://github.com/aidanbell/schema-form",
  },
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

/** SchemaForm re-parses at runtime; pass editor JSON (or raw text) so invalid input hits its error UI. */
function schemaInputFromText(text: string): FormDefinition {
  try {
    return JSON.parse(text) as FormDefinition;
  } catch {
    return text as unknown as FormDefinition;
  }
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
    tone === "warning" ? "text-neutral-700 dark:text-neutral-300" : "text-neutral-900 dark:text-neutral-100";

  return (
    <div className={`mt-3 border border-neutral-900/25 px-3 py-2 text-xs dark:border-neutral-100/25 ${toneClasses}`}>
      {issues?.length ? (
        <ul className="space-y-1">
          {issues.map((issue, index) => (
            <li key={`${issue.path}-${index}`}>
              {issue.path && <code className="mr-1.5 text-[11px] tracking-[0.05em]">[{issue.path}]</code>}
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
  const [sampleId, setSampleId] = useState(defaultSample.id);
  const [submittedValues, setSubmittedValues] = useState<Record<string, unknown> | null>(null);
  const [mode, setMode] = useState<PlaygroundMode>("styled");
  const [themeId, setThemeId] = useState(defaultTheme.id);
  const [customControl, setCustomControl] = useState<CustomControlMode>("none");

  const parseResult = useMemo(() => parseFormDefinition(schemaText), [schemaText]);
  const theme = themePresets.find((preset) => preset.id === themeId) ?? defaultTheme;
  const schemaInput = useMemo(() => schemaInputFromText(schemaText), [schemaText]);

  const loadSample = (id: string) => {
    const sample = sampleSchemas.find((item) => item.id === id);
    if (!sample) return;
    setSampleId(sample.id);
    setSchemaText(JSON.stringify(sample.schema, null, 2));
    setSubmittedValues(null);
  };

  const handleSampleChange = (event: ChangeEvent<HTMLSelectElement>) => {
    loadSample(event.target.value);
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
    if (nextMode === "headless") {
      setCustomControl("none");
    }
  };

  const handleCustomControlChange = (next: CustomControlMode) => {
    setCustomControl(next);
    setSubmittedValues(null);
    if (next !== "none") {
      // Star demos target a `rating` number field — load Product feedback if needed.
      const hasRating = parseResult.success && parseResult.data.fields.some((field) => field.name === "rating");
      if (!hasRating) {
        loadSample(feedbackSample.id);
      }
    }
  };

  const fieldOverrides =
    customControl === "component"
      ? {
          rating: { component: StarRatingControl },
        }
      : undefined;

  const renderField =
    customControl === "renderField"
      ? (props: FieldControlProps, defaultRender: (props: FieldControlProps) => ReactNode) =>
          props.field.name === "rating" ? <StarRatingRow {...props} /> : defaultRender(props)
      : undefined;

  const previewLabel =
    mode === "headless"
      ? "useSchemaForm + custom inputs"
      : customControl === "component"
        ? "fields.rating.component"
        : customControl === "renderField"
          ? "renderField → StarRatingRow"
          : "<SchemaForm /> from schema-form-ui";

  return (
    <div className="technical-page font-mono">
      <div className="mx-auto max-w-7xl px-6 pt-10 pb-16">
        <header className="border-b border-neutral-900/25 pb-6 dark:border-neutral-100/25">
          <p className="text-[11px] tracking-[0.2em] text-neutral-500 dark:text-neutral-400">
            SCHEMA-FORM ( PLAYGROUND )
          </p>
          <h1 className="mt-3 text-2xl font-bold tracking-[0.2em]">PLAYGROUND</h1>
          <p className="mt-3 max-w-2xl text-xs leading-relaxed text-neutral-500 dark:text-neutral-400">
            Schema in, accessible form out. Edit the JSON schema on the left and preview a live form on the right —
            rendered by @aidanbell/schema-form.
          </p>
          <div className="mt-3 flex flex-wrap gap-4">
            {packageLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                target="_blank"
                rel="noreferrer"
                className="text-[11px] tracking-[0.1em] underline decoration-dotted underline-offset-4 hover:decoration-solid"
              >
                [{link.label}]
              </a>
            ))}
          </div>
        </header>

        <div className="mt-6 mb-4 flex flex-wrap items-center gap-3">
          <label className="flex items-center gap-2 text-[11px] tracking-[0.12em] text-neutral-500 dark:text-neutral-400">
            SAMPLE
            <select
              className="h-8 border border-neutral-900/25 bg-transparent px-2 text-[11px] tracking-[0.05em] dark:border-neutral-100/25 dark:bg-neutral-950"
              value={sampleId}
              onChange={handleSampleChange}
            >
              {sampleSchemas.map((sample) => (
                <option key={sample.id} value={sample.id}>
                  {sample.label}
                </option>
              ))}
            </select>
          </label>

          <Button variant="secondary" size="md" onClick={handleFormat}>
            [Format JSON]
          </Button>

          <div
            className="inline-flex border border-neutral-900/25 dark:border-neutral-100/25"
            role="group"
            aria-label="Renderer"
          >
            <button
              type="button"
              onClick={() => handleModeChange("styled")}
              className={`h-8 px-3 text-[11px] tracking-[0.12em] transition-colors ${
                mode === "styled"
                  ? "bg-neutral-900 text-[#f3eee3] dark:bg-neutral-100 dark:text-neutral-900"
                  : "text-neutral-500 hover:bg-neutral-900/5 dark:text-neutral-400 dark:hover:bg-neutral-100/5"
              }`}
            >
              STYLED
            </button>
            <button
              type="button"
              onClick={() => handleModeChange("headless")}
              className={`h-8 border-l border-neutral-900/25 px-3 text-[11px] tracking-[0.12em] transition-colors dark:border-neutral-100/25 ${
                mode === "headless"
                  ? "bg-neutral-900 text-[#f3eee3] dark:bg-neutral-100 dark:text-neutral-900"
                  : "text-neutral-500 hover:bg-neutral-900/5 dark:text-neutral-400 dark:hover:bg-neutral-100/5"
              }`}
            >
              HEADLESS
            </button>
          </div>

          {mode === "styled" && (
            <>
              <label className="flex items-center gap-2 text-[11px] tracking-[0.12em] text-neutral-500 dark:text-neutral-400">
                THEME
                <select
                  className="h-8 border border-neutral-900/25 bg-transparent px-2 text-[11px] tracking-[0.05em] dark:border-neutral-100/25 dark:bg-neutral-950"
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

              <label className="flex items-center gap-2 text-[11px] tracking-[0.12em] text-neutral-500 dark:text-neutral-400">
                CONTROL
                <select
                  className="h-8 border border-neutral-900/25 bg-transparent px-2 text-[11px] tracking-[0.05em] dark:border-neutral-100/25 dark:bg-neutral-950"
                  value={customControl}
                  onChange={(event) => handleCustomControlChange(event.target.value as CustomControlMode)}
                >
                  <option value="none">None (default)</option>
                  <option value="component">Star rating (component)</option>
                  <option value="renderField">Star rating (renderField)</option>
                </select>
              </label>
            </>
          )}
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          <section className="flex min-h-[520px] min-w-0 flex-col overflow-hidden border border-neutral-900/25 p-4 dark:border-neutral-100/25">
            <div className="mb-3 flex items-center justify-between">
              <h2 className="text-[11px] font-bold tracking-[0.2em]">SCHEMA</h2>
              {parseResult.success ? (
                <span className="text-[11px] tracking-[0.15em] text-neutral-500 dark:text-neutral-400">[VALID]</span>
              ) : (
                <span className="text-[11px] tracking-[0.15em]">[INVALID]</span>
              )}
            </div>
            <div className="min-h-0 min-w-0 flex-1">
              <SchemaEditor value={schemaText} onChange={setSchemaText} />
            </div>
            {!parseResult.success && <IssueList issues={parseResult.issues} fallback={parseResult.error} />}
            {parseResult.success && (parseResult.warnings?.length ?? 0) > 0 && (
              <div className="mt-3">
                <p className="mb-1 text-[11px] tracking-[0.15em] text-neutral-500 dark:text-neutral-400">[WARN]</p>
                <IssueList issues={parseResult.warnings} tone="warning" />
              </div>
            )}
          </section>
          <div className="flex flex-col gap-2">
            <section className="flex h-fit min-h-[260px] min-w-0 flex-col overflow-hidden border border-neutral-900/25 p-4 dark:border-neutral-100/25">
              <div className="mb-3 flex items-center justify-between gap-2">
                <h2 className="text-[11px] font-bold tracking-[0.2em]">PREVIEW</h2>
                <span className="text-right text-[10px] tracking-[0.12em] text-neutral-500 dark:text-neutral-400">
                  {previewLabel}
                </span>
              </div>
              <div className="min-h-0 min-w-0 flex-1 overflow-y-auto">
                {mode === "styled" ? (
                  <SchemaForm
                    key={`styled-${themeId}-${customControl}-${schemaText}`}
                    config={{
                      schema: schemaInput,
                      ...(theme.classNames ? { classNames: theme.classNames } : {}),
                      ...(fieldOverrides ? { fields: fieldOverrides } : {}),
                    }}
                    {...(renderField ? { renderField } : {})}
                    onSubmit={(values) => setSubmittedValues(values)}
                  />
                ) : parseResult.success ? (
                  <HeadlessForm
                    key={`headless-${schemaText}`}
                    definition={parseResult.data}
                    onSubmit={(values) => setSubmittedValues(values)}
                  />
                ) : (
                  <div className="flex h-full items-center justify-center border border-dotted border-neutral-900/25 p-6 text-xs tracking-[0.08em] text-neutral-500 dark:border-neutral-100/25 dark:text-neutral-400">
                    Fix schema errors to render the form.
                  </div>
                )}
              </div>
            </section>
            {submittedValues && (
              <section className="mt-6 border border-neutral-900/25 p-4 dark:border-neutral-100/25">
                <h2 className="mb-3 text-[11px] font-bold tracking-[0.2em]">SUBMITTED VALUES</h2>
                <pre className="overflow-x-auto border border-dotted border-neutral-900/15 bg-neutral-900/[0.03] p-4 text-xs text-neutral-800 dark:border-neutral-100/15 dark:bg-neutral-950 dark:text-neutral-200">
                  {JSON.stringify(submittedValues, null, 2)}
                </pre>
              </section>
            )}
          </div>
        </div>

        {parseResult.success && (
          <CodeSnippet
            schema={parseResult.data}
            mode={mode}
            themeClassNames={theme.classNames}
            customControl={customControl}
          />
        )}
      </div>
    </div>
  );
}

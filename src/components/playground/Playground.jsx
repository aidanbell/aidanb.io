import { useMemo, useState } from 'react';
import { AlignLeft, CircleAlert, CircleCheck } from 'lucide-react';
import { parseFormDefinition } from '../../lib/schema';
import {
  defaultSchemaText,
  sampleSchemas,
} from '../../lib/sampleSchemas';
import Button from '../ui/Button';
import DynamicForm from './DynamicForm';
import SchemaEditor from './SchemaEditor';

function formatSchemaText(text) {
  return JSON.stringify(JSON.parse(text), null, 2);
}

export default function Playground() {
  const [schemaText, setSchemaText] = useState(defaultSchemaText);
  const [submittedValues, setSubmittedValues] = useState(null);

  const parseResult = useMemo(() => parseFormDefinition(schemaText), [schemaText]);

  const handleSampleChange = (event) => {
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

  return (
    <div className="mx-auto max-w-6xl px-6 py-10">
      <div className="mb-8 max-w-2xl">
        <h1 className="text-3xl font-semibold tracking-tight">Playground</h1>
        <p className="mt-3 text-neutral-500 dark:text-neutral-400">
          Schema in, accessible form out. Edit the JSON schema on the left and
          preview a live form on the right.
        </p>
      </div>

      <div className="mb-4 flex flex-wrap items-center gap-3">
        <label className="flex items-center gap-2 text-sm text-neutral-600 dark:text-neutral-400">
          Sample
          <select
            className="h-9 rounded-md border border-neutral-200 bg-white px-3 text-sm dark:border-neutral-700 dark:bg-neutral-900"
            defaultValue={sampleSchemas[0].id}
            onChange={handleSampleChange}
          >
            {sampleSchemas.map((sample) => (
              <option key={sample.id} value={sample.id}>
                {sample.label}
              </option>
            ))}
          </select>
        </label>
        <Button variant="secondary" size="sm" onClick={handleFormat} className="gap-1.5">
          <AlignLeft className="size-3.5" strokeWidth={1.75} aria-hidden="true" />
          Format JSON
        </Button>
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
          {!parseResult.success && (
            <p className="mt-3 rounded-md bg-red-50 px-3 py-2 text-sm text-red-600 dark:bg-red-950/40 dark:text-red-400">
              {parseResult.error}
            </p>
          )}
        </section>

        <section className="flex min-h-[520px] min-w-0 flex-col overflow-hidden rounded-lg border border-neutral-200 bg-white p-4 dark:border-neutral-800 dark:bg-neutral-900">
          <h2 className="mb-3 text-sm font-medium">Preview</h2>
          <div className="min-h-0 min-w-0 flex-1">
            {parseResult.success ? (
              <DynamicForm
                definition={parseResult.data}
                onSubmit={(values) => setSubmittedValues(values)}
              />
            ) : (
              <div className="flex h-full items-center justify-center rounded-md border border-dashed border-neutral-200 p-6 text-sm text-neutral-500 dark:border-neutral-700 dark:text-neutral-400">
                Fix schema errors to render the form.
              </div>
            )}
          </div>
        </section>
      </div>

      {submittedValues && (
        <section className="mt-6 rounded-lg border border-neutral-200 bg-white p-4 dark:border-neutral-800 dark:bg-neutral-900">
          <h2 className="mb-3 text-sm font-medium">Submitted values</h2>
          <pre className="overflow-x-auto rounded-md bg-neutral-50 p-4 text-sm text-neutral-800 dark:bg-neutral-950 dark:text-neutral-200">
            {JSON.stringify(submittedValues, null, 2)}
          </pre>
        </section>
      )}
    </div>
  );
}

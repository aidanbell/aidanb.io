import { useMemo } from 'react';
import CodeMirror from '@uiw/react-codemirror';
import { json } from '@codemirror/lang-json';
import { oneDark } from '@codemirror/theme-one-dark';
import { useTheme } from '../../hooks/useTheme';

export default function SchemaEditor({ value, onChange }) {
  const { theme } = useTheme();

  const extensions = useMemo(() => [json()], []);

  return (
    <CodeMirror
      value={value}
      height="100%"
      extensions={extensions}
      theme={theme === 'dark' ? oneDark : 'light'}
      onChange={onChange}
      basicSetup={{
        lineNumbers: true,
        foldGutter: true,
        highlightActiveLine: true,
      }}
      className="h-full overflow-hidden rounded-md border border-neutral-200 text-sm dark:border-neutral-700 [&_.cm-editor]:h-full [&_.cm-scroller]:min-h-[420px]"
    />
  );
}

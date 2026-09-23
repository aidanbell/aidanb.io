import { useEffect, useRef } from "react";
import { defaultKeymap, history, historyKeymap } from "@codemirror/commands";
import { json } from "@codemirror/lang-json";
import { defaultHighlightStyle, syntaxHighlighting } from "@codemirror/language";
import { oneDark } from "@codemirror/theme-one-dark";
import { EditorView, highlightActiveLine, KeyBinding, keymap, lineNumbers } from "@codemirror/view";
import { useTheme } from "../../hooks/useTheme";

type SchemaEditorProps = {
  value: string;
  onChange: (value: string) => void;
};

const editorTheme = EditorView.theme({
  "&": {
    height: "100%",
    backgroundColor: "transparent",
    fontSize: "0.875rem",
  },
  ".cm-scroller": {
    minHeight: "420px",
    overflow: "auto",
    fontFamily: "inherit",
  },
  ".cm-content": {
    fontFamily: "inherit",
  },
});

function createExtensions(theme: "light" | "dark", onChange: (value: string) => void) {
  return [
    json(),
    history(),
    lineNumbers(),
    highlightActiveLine(),
    keymap.of([...defaultKeymap, ...historyKeymap] as readonly KeyBinding[]),
    syntaxHighlighting(defaultHighlightStyle, { fallback: true }),
    editorTheme,
    ...(theme === "dark" ? [oneDark] : []),
    EditorView.updateListener.of((update) => {
      if (update.docChanged) {
        onChange(update.state.doc.toString());
      }
    }),
  ];
}

export default function SchemaEditor({ value, onChange }: SchemaEditorProps) {
  const { theme } = useTheme();
  const parentRef = useRef<HTMLDivElement>(null);
  const viewRef = useRef<EditorView | null>(null);
  const onChangeRef = useRef(onChange);
  const docRef = useRef(value);

  useEffect(() => {
    onChangeRef.current = onChange;
  }, [onChange]);

  useEffect(() => {
    if (!parentRef.current) return;

    const view = new EditorView({
      parent: parentRef.current,
      doc: docRef.current,
      extensions: createExtensions(theme, (next) => {
        docRef.current = next;
        onChangeRef.current(next);
      }),
    });
    viewRef.current = view;

    return () => {
      view.destroy();
      viewRef.current = null;
    };
  }, [theme]);

  useEffect(() => {
    const view = viewRef.current;
    if (!view || view.state.doc.toString() === value) return;
    docRef.current = value;
    view.dispatch({
      changes: { from: 0, to: view.state.doc.length, insert: value },
    });
  }, [value]);

  return (
    <div
      ref={parentRef}
      className="h-full w-full max-w-full overflow-hidden border border-neutral-900/25 font-mono text-sm dark:border-neutral-100/25 [&_.cm-editor]:h-full [&_.cm-editor]:max-w-full"
    />
  );
}

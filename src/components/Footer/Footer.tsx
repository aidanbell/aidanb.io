export default function Footer() {
  return (
    <footer className="border-t border-neutral-900/25 px-6 py-8 text-center font-mono dark:border-neutral-100/25">
      <p className="text-[11px] tracking-[0.15em] text-neutral-500 dark:text-neutral-400">
        <span className="font-display text-lg font-medium tracking-tight text-neutral-900 dark:text-neutral-100">
          /ab/
        </span>
        <span className="mx-2">·</span>© {new Date().getFullYear()} AIDAN BELL
      </p>
    </footer>
  );
}

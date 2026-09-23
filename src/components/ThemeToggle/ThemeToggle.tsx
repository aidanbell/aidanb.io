import { useTheme } from "../../hooks/useTheme";

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === "dark";
  const nextLabel = isDark ? "light" : "dark";

  return (
    <button
      type="button"
      role="switch"
      aria-checked={isDark}
      onClick={toggleTheme}
      aria-label={`Switch to ${nextLabel} mode`}
      title={`Switch to ${nextLabel} mode`}
      className="inline-flex items-center gap-1.5 text-neutral-900 transition-opacity hover:opacity-70 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-current dark:text-neutral-100"
    >
      <span aria-hidden="true" className={`text-lg leading-none ${isDark ? "opacity-60" : ""}`}>
        ☼
      </span>
      <span
        aria-hidden="true"
        className="inline-flex h-4 items-center border border-neutral-900/50 dark:border-neutral-100/50 px-1 text-[6px] leading-none"
      >
        {isDark ? "░░░░░██" : "██░░░░░"}
      </span>
      <span aria-hidden="true" className={`text-lg leading-none ${isDark ? "" : "opacity-50"}`}>
        ☾
      </span>
    </button>
  );
}

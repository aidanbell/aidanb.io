import ThemeToggle from '../ThemeToggle/ThemeToggle';

const linkClass =
  'text-sm text-neutral-500 transition-colors hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-neutral-100';

export default function Nav() {
  return (
    <header className="fixed inset-x-0 top-0 z-10 flex h-14 items-center justify-between border-b border-neutral-200 bg-white px-6 dark:border-neutral-800 dark:bg-neutral-950">
      <a href="/" className="text-lg font-semibold">
        /ab/
      </a>
      <div className="flex items-center gap-6">
        <nav className="flex gap-6" aria-label="Main">
          <a href="#home" className={linkClass}>
            Home
          </a>
          <a href="#about" className={linkClass}>
            About
          </a>
          <a href="#projects" className={linkClass}>
            Work
          </a>
        </nav>
        <ThemeToggle />
      </div>
    </header>
  );
}

import type { ReactNode } from "react";
import { Link, useLocation } from "react-router-dom";
import ThemeToggle from "../ThemeToggle/ThemeToggle";

const linkClass =
  "text-[11px] tracking-[0.15em] text-neutral-500 underline decoration-dotted underline-offset-4 transition-colors hover:text-neutral-900 hover:decoration-solid dark:text-neutral-400 dark:hover:text-neutral-100";

const activeLinkClass = "text-neutral-900 decoration-solid dark:text-neutral-100";

function NavLink({ to, hash, children }: { to: string; hash?: string; children: ReactNode }) {
  const location = useLocation();
  const isActive = hash
    ? location.pathname === "/" && (location.hash === hash || (hash === "#home" && !location.hash))
    : location.pathname === to;

  const destination = hash ? { pathname: "/", hash } : to;

  return (
    <Link to={destination} className={`${linkClass}${isActive ? ` ${activeLinkClass}` : ""}`}>
      [{children}]
    </Link>
  );
}

export default function Nav({ className }: { className?: string }) {
  return (
    <header
      className={`fixed inset-x-0 top-0 z-10 flex h-14 items-center justify-between border-b border-neutral-900/25 bg-[#f3eee3]/85 px-6 font-mono backdrop-blur-md dark:border-neutral-100/25 dark:bg-neutral-950/80 ${className ?? ""}`}
    >
      <Link to="/" className="font-display text-lg font-medium tracking-tight transition-opacity hover:opacity-70">
        /ab/
      </Link>
      <div className="flex items-center gap-6">
        <nav className="hidden gap-6 text-nowrap sm:flex" aria-label="Main">
          <NavLink to="/schema-form">SCHEMA-FORM</NavLink>
        </nav>
        <ThemeToggle />
      </div>
    </header>
  );
}

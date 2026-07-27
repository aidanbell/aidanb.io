import { Link, useLocation } from 'react-router-dom';
import ThemeToggle from '../ThemeToggle/ThemeToggle';

const linkClass =
  'relative text-sm text-neutral-500 transition-colors hover:text-neutral-900 after:absolute after:-bottom-1 after:left-0 after:h-px after:w-full after:origin-left after:scale-x-0 after:bg-current after:transition-transform after:duration-200 hover:after:scale-x-100 dark:text-neutral-400 dark:hover:text-neutral-100';

const activeLinkClass =
  'text-neutral-900 after:scale-x-100 dark:text-neutral-100';

function NavLink({ to, hash, children }) {
  const location = useLocation();
  const isActive = hash
    ? location.pathname === '/' &&
      (location.hash === hash || (hash === '#home' && !location.hash))
    : location.pathname === to;

  const destination = hash ? { pathname: '/', hash } : to;

  return (
    <Link
      to={destination}
      className={`${linkClass}${isActive ? ` ${activeLinkClass}` : ''}`}
    >
      {children}
    </Link>
  );
}

export default function Nav() {
  return (
    <header className="fixed inset-x-0 top-0 z-10 flex h-14 items-center justify-between border-b border-neutral-200/80 bg-white/80 px-6 backdrop-blur-md dark:border-neutral-800/80 dark:bg-neutral-950/80">
      <Link
        to="/"
        className="font-display text-lg font-medium tracking-tight transition-opacity hover:opacity-70"
      >
        /ab/
      </Link>
      <div className="flex items-center gap-6">
        <nav
          className="hidden gap-6 text-nowrap sm:flex"
          aria-label="Main"
        >
          <NavLink to="/" hash="#home">
            Home
          </NavLink>
          <NavLink to="/" hash="#about">
            About
          </NavLink>
          <NavLink to="/" hash="#approach">
            Approach
          </NavLink>
          <NavLink to="/" hash="#work">
            Work
          </NavLink>
          <NavLink to="/playground">Playground</NavLink>
        </nav>
        <ThemeToggle />
      </div>
    </header>
  );
}

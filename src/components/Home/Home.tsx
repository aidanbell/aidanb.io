import { Link } from 'react-router-dom';
import { headingClass, mutedTextClass, sectionClass } from '../../lib/styles';

export default function Home() {
  return (
    <section
      id="home"
      className="relative overflow-hidden border-b border-neutral-200 dark:border-neutral-800"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(15,118,110,0.12),_transparent_55%)] dark:bg-[radial-gradient(ellipse_at_top,_rgba(45,212,191,0.1),_transparent_55%)]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.35] dark:opacity-[0.2] [background-image:radial-gradient(rgba(23,23,23,0.12)_0.6px,transparent_0.6px)] [background-size:12px_12px] dark:[background-image:radial-gradient(rgba(250,250,250,0.12)_0.6px,transparent_0.6px)]"
      />

      <div
        className={`${sectionClass} relative flex min-h-[calc(100vh-3.5rem)] flex-col justify-center`}
      >
        <p className={`animate-fade-up text-sm ${mutedTextClass}`}>aidanb.io</p>
        <h1
          className={`animate-fade-up ${headingClass} mt-3 text-5xl font-medium sm:text-6xl`}
          style={{ animationDelay: '80ms' }}
        >
          Aidan Bell
        </h1>
        <p
          className={`animate-fade-up mt-5 max-w-lg text-lg leading-relaxed ${mutedTextClass} text-balance`}
          style={{ animationDelay: '160ms' }}
        >
          Full-stack engineer with a focus on complex dashboards and form-heavy
          UIs.
        </p>
        <div
          className="animate-fade-up mt-9 flex flex-wrap gap-4"
          style={{ animationDelay: '240ms' }}
        >
          <a
            href="#work"
            className="rounded-md bg-neutral-900 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-neutral-800 dark:bg-neutral-100 dark:text-neutral-900 dark:hover:bg-neutral-200"
          >
            See my work
          </a>
          <Link
            to="/playground"
            className={`rounded-md border border-neutral-300 px-4 py-2 text-sm transition-colors hover:border-neutral-400 hover:bg-white/60 dark:border-neutral-700 dark:hover:border-neutral-500 dark:hover:bg-neutral-900/60 ${mutedTextClass}`}
          >
            Try the playground
          </Link>
        </div>
      </div>
    </section>
  );
}

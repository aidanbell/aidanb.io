import { headingClass, mutedTextClass } from '../../lib/styles';

export default function Footer() {
  return (
    <footer className="border-t border-neutral-200 px-6 py-8 text-center dark:border-neutral-800">
      <p className={`text-sm ${mutedTextClass}`}>
        <span
          className={`${headingClass} text-neutral-900 dark:text-neutral-100`}
        >
          /ab/
        </span>
        <span className="mx-2">·</span>© {new Date().getFullYear()} Aidan Bell
      </p>
    </footer>
  );
}

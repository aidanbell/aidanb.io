const sectionClass = 'mx-auto max-w-2xl px-6 py-20';
const linkClass =
  'text-sm text-neutral-900 underline-offset-4 hover:underline dark:text-neutral-100';

export default function About() {
  return (
    <section id="about" className={sectionClass}>
      <h2 className="text-2xl font-semibold tracking-tight">About</h2>
      <p className="mt-4 text-neutral-500 dark:text-neutral-400">
        Front-end engineer focused on complex dashboards and form-heavy UIs.
        Previously taught web development at General Assembly.
      </p>
      <div className="mt-6 flex gap-6">
        <a
          href="https://www.linkedin.com/in/aidanbell0/"
          target="_blank"
          rel="noreferrer"
          className={linkClass}
        >
          LinkedIn
        </a>
        <a
          href="https://github.com/aidanbell"
          target="_blank"
          rel="noreferrer"
          className={linkClass}
        >
          GitHub
        </a>
      </div>
    </section>
  );
}

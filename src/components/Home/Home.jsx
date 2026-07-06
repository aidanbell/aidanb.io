const sectionClass = 'mx-auto max-w-2xl px-6 py-20';

export default function Home() {
  return (
    <section
      id="home"
      className={`${sectionClass} flex min-h-[calc(100vh-3.5rem)] flex-col justify-center`}
    >
      <h1 className="text-5xl font-semibold tracking-tight sm:text-6xl">
        Aidan Bell
      </h1>
      <p className="mt-4 text-lg text-neutral-500 dark:text-neutral-400">
        Front-end engineer
      </p>
      <a
        href="#about"
        className="mt-8 text-sm text-neutral-900 underline-offset-4 hover:underline dark:text-neutral-100"
      >
        About me →
      </a>
    </section>
  );
}

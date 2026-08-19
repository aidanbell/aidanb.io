import {
  headingClass,
  mutedTextClass,
  sectionBorderClass,
} from '../../lib/styles';

const principles = [
  {
    title: 'Accessible by default',
    body: 'Labels, error messaging, focus management, and keyboard support are part of the design, not polish at the end.',
  },
  {
    title: 'Schema-driven when it scales',
    body: 'For form-heavy products, I prefer shared schemas that can drive UI, validation, and stay aligned with the API.',
  },
  {
    title: 'State you can trust',
    body: 'Loading, empty, error, and dirty states get explicit treatment. Dense dashboards fail quietly if those are ignored on the client and at the API boundary.',
  },
  {
    title: 'Ship the whole surface',
    body: 'I design reusable UI primitives, but I also wire them to real backends; auth, data models, and the contracts that keep the interface honest.',
  },
];

export default function Approach() {
  return (
    <section id="approach" className={sectionBorderClass}>
      <h2 className={`${headingClass} text-3xl font-medium`}>How I build UI</h2>
      <p className={`mt-4 ${mutedTextClass}`}>
        Where I spend a lot of my time lately: the interface layer of full-stack
        products. Dashboards, form-heavy tools, and WYSIWYG editors; all of these
        follow the same principles:
      </p>
      <ul className="mt-10 grid gap-6 sm:grid-cols-2">
        {principles.map((item) => (
          <li
            key={item.title}
            className="rounded-xl border border-neutral-200 bg-white/70 p-5 dark:border-neutral-800 dark:bg-neutral-900/50"
          >
            <h3 className="text-base font-medium tracking-tight">{item.title}</h3>
            <p className={`mt-2 text-sm leading-relaxed ${mutedTextClass}`}>
              {item.body}
            </p>
          </li>
        ))}
      </ul>
    </section>
  );
}

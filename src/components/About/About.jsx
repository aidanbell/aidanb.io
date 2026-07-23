import { FileText } from 'lucide-react';
import mePic from '../../assets/me.jpeg';
import resume from '../../assets/aidan_bell26.pdf';
import { GitHubIcon, LinkedInIcon } from '../icons/BrandIcons';
import {
  headingClass,
  mutedTextClass,
  sectionClass,
} from '../../lib/styles';

const links = [
  {
    label: 'LinkedIn',
    href: 'https://www.linkedin.com/in/aidanbell0/',
    icon: LinkedInIcon,
    external: true,
  },
  {
    label: 'GitHub',
    href: 'https://github.com/aidanbell',
    icon: GitHubIcon,
    external: true,
  },
  {
    label: 'Resume',
    href: resume,
    icon: FileText,
    download: true,
  },
];

export default function About() {
  return (
    <section id="about" className={sectionClass}>
      <div className="flex flex-col gap-8 sm:flex-row sm:items-start">
        <img
          src={mePic}
          alt="Aidan Bell"
          className="size-28 shrink-0 rounded-2xl object-cover ring-1 ring-neutral-200 dark:ring-neutral-700"
        />
        <div className="min-w-0 flex-1">
          <h2 className={`${headingClass} text-3xl font-medium`}>About</h2>
          <div className={`mt-4 space-y-4 ${mutedTextClass}`}>
            <p>
              Full-stack engineer — APIs, data, and shipping products end to end
              — with recent depth in complex dashboards and form-heavy
              workflows: multi-step flows, validation, data tables, and
              accessible component systems.
            </p>
            <p>
              I care about the unglamorous parts of product UI: empty states,
              error recovery, keyboard paths, and making dense interfaces feel
              calm and usable. That front-end focus sits on top of full-stack
              instincts — knowing how auth, APIs, and data shape what the
              interface can do. Previously taught web development at General
              Assembly, where I helped people turn messy requirements into clear
              interfaces.
            </p>
            <p>
              Right now I&apos;m building and refining a schema-driven form
              playground — a live demo of how I approach configurable
              internal-tool UIs.
            </p>
          </div>
          <div className="mt-6 flex flex-wrap gap-5">
            {links.map(({ label, href, icon: Icon, external, download }) => (
              <a
                key={label}
                href={href}
                {...(external
                  ? { target: '_blank', rel: 'noreferrer' }
                  : {})}
                {...(download ? { download: true } : {})}
                className="inline-flex items-center gap-2 text-sm text-neutral-900 transition-colors hover:text-teal-800 dark:text-neutral-100 dark:hover:text-teal-300"
              >
                <Icon className="size-4 shrink-0" aria-hidden="true" />
                {label}
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

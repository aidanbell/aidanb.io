import type { ComponentType, SVGProps } from "react";
import { Link } from "react-router-dom";
import { ArrowUpRight, ExternalLink, FilePenLine, Film, LayoutDashboard, Package, type LucideIcon } from "lucide-react";
import { GitHubIcon } from "../icons/BrandIcons";
import { chipClass, headingClass, mutedTextClass, sectionBorderClass } from "../../lib/styles";

const linkIconClass = "size-3.5 shrink-0";

type IconComponent = LucideIcon | ComponentType<SVGProps<SVGSVGElement>>;

type ProjectLink = {
  label: string;
  icon: IconComponent;
  to?: string;
  href?: string;
};

type Project = {
  name: string;
  role: string;
  featured?: boolean;
  icon: LucideIcon;
  description: string;
  stack: string[];
  highlights: string[];
  links: ProjectLink[];
};

const projects: Project[] = [
  {
    name: "Campaign dashboard modernization",
    role: "Full-stack · ongoing",
    featured: true,
    icon: LayoutDashboard,
    description:
      "Rebuilding a decade-old internal dashboard end to end — UI, state, and API layer — for data-heavy campaign workflows. Focused on denser list views, predictable action hierarchy, and replacing a monolithic client store with sectioned routes and state.",
    stack: [
      "React 19",
      "TypeScript",
      "TanStack Start / Router / Query",
      "Tailwind CSS v4",
      "shadcn / Radix",
      "Valibot",
      "Zustand",
      "Vite",
    ],
    highlights: [
      "Modernized legacy stack; cut third-party dependencies roughly in half and patched long-standing security debt",
      "Split campaign details into shareable section routes with clearer state boundaries (away from a 1000+ line store)",
      "Redesigned list and detail UX for scannability — less vertical waste, consistent button hierarchy, fewer dead clicks",
      "Hardened bulk CSV upload flows with explicit valid / update / remove feedback",
      "Improved client caching and API reliability; deploy time down from 30+ minutes to about 5",
    ],
    links: [],
  },
  {
    name: "schema-form",
    role: "Open source · npm",
    icon: Package,
    description:
      "A pair of React packages for schema-driven forms: a headless engine that parses a JSON schema into validation and field state, and a styled Tailwind/BaseUI layer that renders an accessible form from that same config. Built so internal tools can ship form-heavy UIs without hardcoding every field.",
    stack: ["React", "TypeScript", "Valibot", "React Hook Form", "Tailwind CSS", "Base UI"],
    highlights: [
      "Headless @aidanbell/schema-form: parse, validate, and useSchemaForm without owning the pixels",
      "Styled @aidanbell/schema-form-ui: drop-in <SchemaForm /> with classNames theming and accessible defaults",
      "Live playground on this site dogfoods both packages — schema in, form out",
    ],
    links: [
      {
        label: "Open playground",
        to: "/playground",
        icon: ArrowUpRight,
      },
      {
        label: "schema-form",
        href: "https://www.npmjs.com/package/@aidanbell/schema-form",
        icon: Package,
      },
      {
        label: "schema-form-ui",
        href: "https://www.npmjs.com/package/@aidanbell/schema-form-ui",
        icon: Package,
      },
      {
        label: "GitHub",
        href: "https://github.com/aidanbell/schema-form",
        icon: GitHubIcon,
      },
    ],
  },
  {
    name: "Cage Page",
    role: "Full-stack",
    icon: Film,
    description:
      "A niche content app with OAuth, a Node/Express API, MongoDB, and third-party movie data. Searchable catalogs and form-heavy rule entry on top of a full auth and data stack.",
    stack: ["React", "Node.js", "Express", "MongoDB"],
    highlights: [
      "OAuth-backed user flows and protected routes",
      "REST API + TMDB integration",
      "Form-heavy rule creation for each title",
    ],
    links: [
      {
        label: "GitHub",
        href: "https://github.com/aidanbell/cage-page",
        icon: GitHubIcon,
      },
    ],
  },
  {
    name: "Markdowner98",
    role: "Front-end",
    icon: FilePenLine,
    description:
      "Mintbean Hackathon winner. A Markdown editor with live preview, synced scrolling, and PDF export — focused on editor UX and keeping preview state in lockstep with input.",
    stack: ["React", "Markdown", "Node.js"],
    highlights: [
      "Live preview with simultaneous scroll",
      "Export-to-PDF flow",
      "Hackathon delivery under time pressure",
    ],
    links: [
      {
        label: "Live site",
        href: "https://aidanbell.github.io/Markdowner98/",
        icon: ExternalLink,
      },
      {
        label: "GitHub",
        href: "https://github.com/aidanbell/Markdowner98",
        icon: GitHubIcon,
      },
    ],
  },
];

const projectLinkClass =
  "inline-flex items-center gap-1.5 text-sm text-neutral-900 transition-colors hover:text-teal-800 dark:text-neutral-100 dark:hover:text-teal-300";

export default function Projects() {
  return (
    <section id="work" className={sectionBorderClass}>
      <h2 className={`${headingClass} text-3xl font-medium`}>Work</h2>
      <p className={`mt-4 ${mutedTextClass}`}>
        Selected projects across the stack — with a through-line of forms, editors, and data-heavy interfaces.
      </p>

      <div className="mt-10 space-y-6">
        {projects.map((project) => {
          const ProjectIcon = project.icon;

          return (
            <article
              key={project.name}
              className={`rounded-xl border p-5 transition-colors ${
                project.featured
                  ? "border-teal-700/25 bg-teal-50/50 dark:border-teal-400/20 dark:bg-teal-950/20"
                  : "border-neutral-200 bg-white/70 dark:border-neutral-800 dark:bg-neutral-900/50"
              }`}
            >
              <div className="flex flex-wrap items-start justify-between gap-2">
                <div className="flex min-w-0 flex-wrap items-center gap-2.5">
                  <span
                    className={`inline-flex size-8 shrink-0 items-center justify-center rounded-md border ${
                      project.featured
                        ? "border-teal-700/20 bg-teal-800/5 text-teal-800 dark:border-teal-400/20 dark:bg-teal-300/5 dark:text-teal-300"
                        : "border-neutral-200 bg-neutral-50 text-neutral-600 dark:border-neutral-700 dark:bg-neutral-900 dark:text-neutral-400"
                    }`}
                  >
                    <ProjectIcon className="size-4" strokeWidth={1.75} aria-hidden="true" />
                  </span>
                  <h3 className="text-lg font-medium tracking-tight">{project.name}</h3>
                  {project.featured && (
                    <span className="rounded-full bg-teal-800/10 px-2 py-0.5 text-[11px] font-medium text-teal-800 dark:bg-teal-300/10 dark:text-teal-300">
                      Featured
                    </span>
                  )}
                </div>
                <span className={`pt-1.5 text-xs ${mutedTextClass}`}>{project.role}</span>
              </div>
              <p className={`mt-3 text-sm leading-relaxed ${mutedTextClass}`}>{project.description}</p>
              <ul className={`mt-4 list-disc space-y-1 pl-5 text-sm ${mutedTextClass}`}>
                {project.highlights.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
              <div className="mt-4 flex flex-wrap gap-2">
                {project.stack.map((tech) => (
                  <span key={tech} className={chipClass}>
                    {tech}
                  </span>
                ))}
              </div>
              {project.links.length > 0 && (
                <div className="mt-4 flex flex-wrap gap-4">
                  {project.links.map((link) => {
                    const LinkIcon = link.icon;
                    const content = (
                      <>
                        <LinkIcon className={linkIconClass} strokeWidth={1.75} aria-hidden="true" />
                        {link.label}
                      </>
                    );

                    return link.to ? (
                      <Link key={link.label} to={link.to} className={projectLinkClass}>
                        {content}
                      </Link>
                    ) : (
                      <a
                        key={link.label}
                        href={link.href}
                        target="_blank"
                        rel="noreferrer"
                        className={projectLinkClass}
                      >
                        {content}
                      </a>
                    );
                  })}
                </div>
              )}
            </article>
          );
        })}
      </div>
    </section>
  );
}

import type { ReactNode } from "react";
import { Link } from "react-router-dom";
import { ASCIILogo } from "../components/TechnicalHome/ASCIILogo";
import resume from "../assets/aidan_bell26.pdf";

/* Monochrome palette only — ink, faint ink, and hairline rules. */
const INK = "text-neutral-900 dark:text-neutral-100";
const FAINT = "text-neutral-500 dark:text-neutral-400";
const RULE = "border-neutral-900/25 dark:border-neutral-100/25";
const RULE_SOFT = "border-neutral-900/15 dark:border-neutral-100/15";

const DATE = "23.09.2026";

type TechLink = { label: string; href?: string; to?: string; download?: boolean };

type TechProject = {
  fig: string;
  name: string;
  status: string;
  role: string;
  summary: string;
  notes: string[];
  stack: string[];
  links: TechLink[];
};

const featuredProjects: TechProject[] = [
  {
    fig: "01",
    name: "CAMPAIGN DASHBOARD MODERNIZATION",
    status: "ACTIVE",
    role: "FULL-STACK",
    summary:
      "End-to-end rebuild of a decade-old internal dashboard — UI, state, and API layer — for data-heavy campaign workflows. Denser list views, predictable action hierarchy, sectioned routes instead of a monolithic client store.",
    notes: [
      "THIRD-PARTY DEPENDENCIES CUT ~50%; LONG-STANDING SECURITY DEBT PATCHED",
      "1000+ LINE CLIENT STORE SPLIT INTO SHAREABLE SECTION ROUTES",
      "BULK CSV UPLOADS HARDENED W/ EXPLICIT VALID / UPDATE / REMOVE FEEDBACK",
      "DEPLOY TIME: 30+ MIN -> ~5 MIN",
    ],
    stack: ["REACT 19", "TYPESCRIPT", "TANSTACK", "TAILWIND 4", "RADIX", "VALIBOT", "ZUSTAND", "VITE"],
    links: [],
  },
  {
    fig: "02",
    name: "SCHEMA-FORM / SCHEMA-FORM-UI",
    status: "V0.2 - NPM",
    role: "OPEN SOURCE",
    summary:
      "A pair of React packages for schema-driven forms: a headless engine that parses a JSON schema into validation and field state, plus a styled Tailwind/Base UI layer that renders an accessible form from the same config.",
    notes: [
      "HEADLESS: PARSE / VALIDATE / useSchemaForm — NO PIXELS OWNED",
      "STYLED: DROP-IN <SchemaForm /> W/ CLASSNAMES + CUSTOM CONTROLS",
      "LIVE PLAYGROUND DOGFOODS 0.2 ON THIS SITE",
    ],
    stack: ["REACT", "TYPESCRIPT", "VALIBOT", "REACT HOOK FORM", "TAILWIND"],
    links: [
      { label: "PLAYGROUND", to: "/schema-form" },
      { label: "NPM:SCHEMA-FORM", href: "https://www.npmjs.com/package/@aidanbell/schema-form" },
      { label: "NPM:SCHEMA-FORM-UI", href: "https://www.npmjs.com/package/@aidanbell/schema-form-ui" },
      { label: "GITHUB", href: "https://github.com/aidanbell/schema-form" },
    ],
  },
];

const projects: TechProject[] = [
  {
    fig: "03",
    name: "NUTS",
    status: "ACTIVE DEV",
    role: "GAME",
    summary: "Incremental game about squirrels and nuts in the apocalypse.",
    notes: ["FUN, SIMPLE, ADDICTIVE"],
    stack: ["SOLID JS", "VITE", "TAILWIND"],
    links: [{ label: "GITHUB", href: "https://github.com/aidanbell/Nuts" }],
  },
  {
    fig: "04",
    name: "CAGE PAGE",
    status: "SHIPPED",
    role: "FULL-STACK",
    summary: "Searchable catalogs and form-heavy rule entry on top of a full auth and data stack.",
    notes: ["OAUTH-BACKED FLOWS + PROTECTED ROUTES", "REST API + TMDB INTEGRATION"],
    stack: ["REACT", "NODE", "EXPRESS", "MONGODB"],
    links: [{ label: "GITHUB", href: "https://github.com/aidanbell/cage-page" }],
  },
  {
    fig: "05",
    name: "MARKDOWNER98",
    status: "SHIPPED - HACKATHON WINNER",
    role: "FRONT-END",
    summary: "Mintbean Hackathon winner. Live markdown editor with a 90s flavor.",
    notes: ["LIVE PREVIEW W/ SIMULTANEOUS SCROLL", "EXPORT-TO-PDF FLOW"],
    stack: ["REACT", "MARKDOWN", "NODE"],
    links: [
      { label: "LIVE", href: "https://aidanbell.github.io/Markdowner98/" },
      { label: "GITHUB", href: "https://github.com/aidanbell/Markdowner98" },
    ],
  },
];

const principles = [
  {
    title: "ACCESSIBLE BY DEFAULT",
    body: "Labels, error messaging, focus management, and keyboard support are part of the design — not polish at the end.",
    ref: "REF: FIG. 02",
  },
  {
    title: "SCHEMA-DRIVEN WHEN IT SCALES",
    body: "For form-heavy products, shared schemas drive UI and validation, and stay aligned with the API.",
    ref: "REF: FIG. 02",
  },
  {
    title: "STATE YOU CAN TRUST",
    body: "Loading, empty, error, and dirty states get explicit treatment — on the client and at the API boundary.",
    ref: "REF: FIG. 01",
  },
  {
    title: "SHIP THE WHOLE SURFACE",
    body: "Reusable UI primitives, wired to real backends: auth, data models, and the contracts that keep the interface honest.",
    ref: "REF: FIG. 01",
  },
];

const indexEntries = [
  { key: "01", label: "SELECTED WORK", href: "#work" },
  { key: "02", label: "METHOD", href: "#method" },
  { key: "03", label: "PROJECTS", href: "#projects" },
  { key: "04", label: "NON-NEGOTIABLES", href: "#non-negotiables" },
  { key: "05", label: "COLOPHON", href: "#colophon" },
];

function SectionSpine({ index, title, count }: { index: string; title: string; count?: number }) {
  return (
    <div className="flex flex-col items-center gap-3">
      <span className={`${FAINT} text-xs tracking-[0.2em]`}>/{index}</span>
      <h2 className={`${INK} text-xs font-bold tracking-[0.3em] whitespace-nowrap [writing-mode:vertical-rl]`}>
        {title}
        {count !== undefined && <span className={`${FAINT} font-normal`}> ({count})</span>}
      </h2>
      <span aria-hidden="true" className={`min-h-4 flex-1 border-l ${RULE_SOFT}`} />
    </div>
  );
}

/* Two-column section shell: vertical spine header on the left, content on the right. */
function SpineSection({
  id,
  index,
  title,
  count,
  children,
  className,
}: {
  id: string;
  index: string;
  title: string;
  count?: number;
  children: ReactNode;
  className?: string;
}) {
  return (
    <section id={id} className={`grid scroll-mt-20 grid-cols-[1.25rem_1fr] gap-x-4 pt-8 ${className ?? ""}`}>
      <SectionSpine index={index} title={title} count={count} />
      <div className="min-w-0">{children}</div>
    </section>
  );
}

/* Key stays fixed; the dotted leader and value reflow with the column width. */
function SpecLine({ k, children }: { k: string; children: ReactNode }) {
  return (
    <div className="grid grid-cols-[8.5rem_minmax(0,1fr)] gap-x-3 text-[11px] leading-relaxed tracking-[0.05em]">
      <span className="flex items-baseline gap-2">
        <span className="shrink-0">{k}</span>
        <span aria-hidden="true" className={`min-w-2 flex-1 text-clip overflow-hidden whitespace-nowrap`}>
          ...............................................
        </span>
      </span>
      <span className="min-w-0">{children}</span>
    </div>
  );
}

function KV({ k, children }: { k: string; children: ReactNode }) {
  return (
    <div className={`grid grid-cols-[7rem_1fr] gap-3 border-b border-dotted ${RULE_SOFT} py-2 sm:grid-cols-[6rem_1fr]`}>
      <dt className={`${FAINT} text-[11px] tracking-[0.15em]`}>{k}</dt>
      <dd className={`${INK} text-xs leading-relaxed text-right`}>{children}</dd>
    </div>
  );
}

function BracketLink({ label, href, to, download }: TechLink) {
  const className = `inline-flex text-[11px] tracking-[0.1em] ${INK} underline decoration-dotted underline-offset-4 hover:decoration-solid`;
  const text = `[${label}]`;
  if (to) {
    return (
      <Link to={to} className={className}>
        {text}
      </Link>
    );
  }
  return (
    <a href={href} className={className} {...(download ? { download: true } : { target: "_blank", rel: "noreferrer" })}>
      {text}
    </a>
  );
}

/* Reticle corner brackets — parent must be `relative`. */
function Reticle() {
  const corner = "pointer-events-none absolute size-2.5 border-neutral-900/60 dark:border-neutral-100/60";
  return (
    <span aria-hidden="true">
      <span className={`${corner} -top-px -left-px border-t-2 border-l-2`} />
      <span className={`${corner} -top-px -right-px border-t-2 border-r-2`} />
      <span className={`${corner} -bottom-px -left-px border-b-2 border-l-2`} />
      <span className={`${corner} -bottom-px -right-px border-b-2 border-r-2`} />
    </span>
  );
}

/* Ruler tick strip — minor ticks every 10px, major every 50px. */
function Ruler() {
  return (
    <div aria-hidden="true" className="relative mt-3 h-2.5 overflow-hidden opacity-50">
      <div className="absolute inset-x-0 bottom-0 h-1.5 bg-[repeating-linear-gradient(90deg,currentColor_0,currentColor_1px,transparent_1px,transparent_10px)]" />
      <div className="absolute inset-x-0 bottom-0 h-2.5 bg-[repeating-linear-gradient(90deg,currentColor_0,currentColor_1px,transparent_1px,transparent_50px)]" />
      <div className="absolute inset-x-0 bottom-0 border-b border-current" />
    </div>
  );
}

export default function TechnicalHome() {
  return (
    <div className={`technical-page relative overflow-hidden bg-[#f3eee3] font-mono dark:bg-transparent ${INK}`}>
      {/* Dot-grid paper texture */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.3] dark:opacity-[0.18] [background-image:radial-gradient(rgba(23,23,23,0.2)_0.6px,transparent_0.6px)] [background-size:14px_14px] dark:[background-image:radial-gradient(rgba(250,250,250,0.2)_0.6px,transparent_0.6px)]"
      />
      {/* CRT scanlines, dark mode only */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 hidden opacity-[0.05] dark:block [background-image:repeating-linear-gradient(0deg,transparent,transparent_2px,rgba(250,250,250,0.7)_2px,rgba(250,250,250,0.7)_3px)]"
      />

      <div className="relative mx-auto max-w-6xl px-6 pt-12 pb-20">
        {/* ── Masthead ─────────────────────────────── */}
        <header id="profile" className={`scroll-mt-20 border-b ${RULE} pb-6`}>
          <div className={`flex flex-wrap items-baseline justify-between gap-2 text-[11px] tracking-[0.2em] ${FAINT}`}>
            <span>AIDANB.IO ( TECHNICAL )</span>
            <span>REV. {DATE}</span>
          </div>
          <Ruler />
          <div className="flex flex-col gap-4 md:flex-row">
            <div className="mt-6 w-full md:w-[60%]">
              <ASCIILogo />
              {/* Stats strip */}
              <div className={`border ${RULE} p-4 mt-6`}>
                <p className={`text-[11px] tracking-[0.1em] ${FAINT}`}>$ cat /etc/profile</p>
                <div className="mt-2 space-y-1">
                  <SpecLine k="FOCUS">COMPLEX DASHBOARDS / FORM-HEAVY UI / SCHEMA-DRIVEN TOOLING</SpecLine>
                  <SpecLine k="BELIEF">GOOD CODE AND GOOD UI SHOULD BOTH EXPLAIN THEMSELVES.</SpecLine>
                  <SpecLine k="CURRENT">
                    SCHEMA-FORM — A HEADLESS, SCHEMA-DRIVEN FORM LIBRARY + STYLED COMPANION.{" "}
                    <BracketLink label="TRY IT" to="/schema-form" />
                  </SpecLine>
                </div>
              </div>
            </div>
            <div className="flex w-full flex-col justify-between md:w-[40%]">
              <h1 className="mt-2 text-2xl font-bold tracking-[0.25em] sm:text-3xl md:mt-6">
                AIDAN BELL
                <span
                  aria-hidden="true"
                  className="animate-blink ml-2 inline-block h-[0.9em] w-[0.5em] translate-y-[0.1em] bg-current"
                />
              </h1>
              <p className={`mt-2 text-xs tracking-[0.2em] ${FAINT}`}>
                FULL-STACK ENGINEER / DASHBOARDS + FORM-HEAVY UI
              </p>
              <div className={` w-full p-2 border-b border-dotted ${RULE}`} />
              {/* Barcode strip */}
              <div
                aria-hidden="true"
                className="mt-4 h-4 bg-[repeating-linear-gradient(90deg,currentColor_0,currentColor_2px,transparent_2px,transparent_4px,currentColor_4px,currentColor_9px,transparent_9px,transparent_11px,currentColor_11px,currentColor_12px,transparent_12px,transparent_17px)]"
              />
              {/* Calibration strip */}
              <div
                aria-hidden="true"
                className={`mt-3 overflow-hidden text-[10px] tracking-[0.3em] whitespace-nowrap select-none ${FAINT} text-center flex items-center justify-center`}
              >
                ░░▒▒▓▓██▓▓▒▒░░ CAL. STRIP 100% ░░▒▒▓▓██▓▓▒▒░░
              </div>
              <dl className="mt-auto">
                <KV k="LOCATION">CAN/USA</KV>
                <KV k="EXPERIENCE">&gt;7 YEARS</KV>
                <KV k="CONTACT">
                  <span className="flex justify-end flex-wrap gap-x-4 gap-y-1">
                    <BracketLink label="GITHUB" href="https://github.com/aidanbell" />
                    <BracketLink label="LINKEDIN" href="https://www.linkedin.com/in/aidanbell0/" />
                    <BracketLink label="RESUME.PDF" href={resume} download />
                  </span>
                </KV>
              </dl>
            </div>
          </div>
        </header>

        {/* ── Index ────────────────────────────────── */}
        <nav aria-label="Page index" className={`border-b ${RULE} py-5`}>
          <ul className="grid grid-cols-2 gap-x-8 gap-y-2 sm:grid-cols-3 md:grid-cols-5">
            {indexEntries.map((entry) => (
              <li key={entry.key}>
                <a
                  href={entry.href}
                  className={`group inline-flex items-baseline gap-2 text-[11px] tracking-[0.15em] ${INK}`}
                >
                  <span className={FAINT}>[{entry.key}]</span>
                  <span className="underline decoration-dotted underline-offset-4 group-hover:decoration-solid">
                    {entry.label}
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </nav>
        <main className="grid grid-cols-1 gap-x-4 md:grid-cols-[minmax(0,7fr)_minmax(0,3fr)]">
          <div className="flex flex-col w-full justify-between">
            {/* ── 01 / Selected work ───────────────────── */}
            <SpineSection id="work" index="01" title="SELECTED WORK" count={featuredProjects.length}>
              <div className="space-y-6">
                {featuredProjects.map((project) => (
                  <article key={project.fig} className={`relative border ${RULE}`}>
                    <Reticle />
                    <div
                      className={`flex flex-wrap items-baseline justify-between gap-2 border-b ${RULE_SOFT} px-4 py-2`}
                    >
                      <span className="text-[11px] tracking-[0.2em]">
                        <span className={FAINT}>[ FIG. {project.fig} ]</span>{" "}
                        <span className="font-bold">{project.name}</span>
                      </span>
                      <span className={`text-[10px] tracking-[0.15em] ${FAINT}`}>
                        {project.role} — {project.status}
                      </span>
                    </div>
                    <p className={`px-4 py-3 text-xs leading-relaxed ${FAINT}`}>{project.summary}</p>
                    <div className="flex flex-col gap-4 lg:flex-row lg:items-start">
                      <div className="min-w-0 px-4 pb-4">
                        <ul className="space-y-1">
                          {project.notes.map((note) => (
                            <li key={note} className="flex gap-2 text-[11px] leading-relaxed tracking-[0.05em]">
                              <span className={FAINT} aria-hidden="true">
                                {">"}
                              </span>
                              <span>{note}</span>
                            </li>
                          ))}
                        </ul>
                        <div className={`mt-3 flex flex-wrap gap-x-3 gap-y-1 text-[10px] tracking-[0.1em] ${FAINT}`}>
                          {project.stack.map((tech) => (
                            <span key={tech}>[{tech}]</span>
                          ))}
                        </div>
                      </div>

                      {project.links.length > 0 && (
                        <div
                          className={`mx-4 mb-4 flex flex-col gap-y-1 border-t border-dotted pt-3 lg:mx-0 lg:mt-0 lg:mr-4 lg:mb-4 lg:border-t-0 lg:border-l lg:pt-0 lg:pl-3 ${RULE_SOFT}`}
                        >
                          {project.links.map((link) => (
                            <BracketLink key={link.label} {...link} />
                          ))}
                        </div>
                      )}
                    </div>
                  </article>
                ))}
              </div>
            </SpineSection>
            {/* ── 04 / Projects ledger ─────────────────── */}
            <SpineSection id="projects" index="03" title="PROJECTS" count={projects.length} className="pt-0 mt-0">
              <div className={`border ${RULE} p-4`}>
                <p className={`text-[11px] tracking-[0.1em] ${FAINT}`}>$ ls -la ~/projects</p>
                <ul className="mt-3 space-y-2">
                  {projects.map((project) => (
                    <li
                      key={project.fig}
                      className="flex flex-wrap items-baseline gap-x-3 gap-y-1 text-[11px] tracking-[0.05em]"
                    >
                      <span className={FAINT}>[{project.fig}]</span>
                      <span className="font-bold tracking-[0.1em]">{project.name}</span>
                      <span
                        aria-hidden="true"
                        className={`min-w-8 flex-1 -translate-y-[0.25em] border-b border-dotted ${RULE_SOFT}`}
                      />
                      <span className={`text-[10px] tracking-[0.15em] ${FAINT}`}>
                        {project.role} — {project.status}
                      </span>
                      <span className="flex gap-x-3">
                        {project.links.map((link) => (
                          <BracketLink key={link.label} {...link} />
                        ))}
                      </span>
                      <span className={`ml-10 basis-full text-[10px] tracking-[0.15em] ${FAINT}`}>
                        {project.summary}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </SpineSection>
          </div>
          {/* ── 03 / Method ──────────────────────────── */}
          <SpineSection id="method" index="02" title="METHOD" count={principles.length}>
            <ol className="flex flex-col gap-4">
              {principles.map((principle, i) => (
                <li key={principle.title} className={`border ${RULE} p-4`}>
                  <h3 className="text-[11px] font-bold tracking-[0.2em]">
                    <span className={`${FAINT} font-normal`}>{String(i + 1).padStart(2, "0")}.</span> {principle.title}
                  </h3>
                  <p className={`mt-2 text-xs leading-relaxed ${FAINT}`}>{principle.body}</p>
                  <p className={`mt-2 text-right text-[10px] tracking-[0.2em] ${FAINT}`}>{principle.ref}</p>
                </li>
              ))}
            </ol>
          </SpineSection>
        </main>

        {/* ── 05 / Non-negotiables ─────────────────── */}
        <SpineSection id="non-negotiables" index="04" title="NON-NEGOTIABLES">
          <div className={`relative border ${RULE} p-4`}>
            <Reticle />
            <div className="grid gap-x-8 gap-y-6 md:grid-cols-[minmax(0,3fr)_minmax(0,2fr)]">
              <div className="min-w-0">
                <p className={`text-[11px] tracking-[0.1em] ${FAINT}`}>$ tree ~/non-negotiables</p>
                <pre className="mt-2 overflow-x-auto text-[11px] leading-relaxed tracking-[0.05em]">
                  {`.
└── configs/
    ├── agents/
    │   ├── AGENTS.md
    │   └── CLAUDE.md
    ├── editor/
    │   └── .editorconfig
    ├── eslint/
    │   └── eslint.config.mjs
    ├── prettier/
    │   ├── .prettierignore
    │   └── .prettierrc.json
    └── typescript/
        └──  tsconfig.base.json`}
                </pre>
              </div>
              <div
                className={`min-w-0 border-t border-dotted pt-4 md:border-t-0 md:border-l md:pt-0 md:pl-6 ${RULE_SOFT}`}
              >
                <p className={`text-[11px] tracking-[0.1em] ${FAINT}`}>$ which non-negotiables</p>
                <a
                  href="https://github.com/aidanbell/non-negotiables"
                  target="_blank"
                  rel="noreferrer"
                  className="mt-2 block pb-2 text-[11px] leading-relaxed tracking-[0.05em] break-all underline decoration-dotted underline-offset-4 hover:decoration-solid"
                >
                  github.com/aidanbell/non-negotiables
                </a>
                <p className={`text-[11px] tracking-[0.1em] ${FAINT}`}>$ cat README.md</p>
                <p className="mt-2 pb-2 text-[11px] leading-relaxed tracking-[0.05em] break-words">
                  A repository of configs that are difficult to work without for the tools we use daily
                </p>
                <p className={`text-[11px] tracking-[0.1em] ${FAINT}`}>$ head -n 4 AGENTS.md</p>
                <ol className="mt-2 space-y-1 pb-2 text-[11px] leading-relaxed tracking-[0.05em]">
                  {[
                    "READ THE FILE BEFORE EDITING IT.",
                    "TYPECHECK + LINT + FORMAT, EVERY TURN.",
                    "PREFER THE EXISTING PATTERN OVER A NEW ONE.",
                    "SMALL DIFFS. REAL NAMES. NO DEAD CODE.",
                  ].map((rule, i) => (
                    <li key={rule}>
                      <span className={FAINT}>{String(i + 1).padStart(2, "0")}.</span> {rule}
                    </li>
                  ))}
                </ol>
              </div>
            </div>
          </div>
        </SpineSection>

        {/* ── 06 / Colophon ────────────────────────── */}
        <SpineSection id="colophon" index="05" title="COLOPHON">
          <div className={`border ${RULE} p-4`}>
            <p className={`text-[11px] tracking-[0.1em] ${FAINT}`}>$ cat /etc/build-info</p>
            <div className="mt-2 space-y-1">
              <SpecLine k="SITE">REACT 18 / REACT ROUTER / TAILWIND CSS 4</SpecLine>
              <SpecLine k="TYPE">TYPESCRIPT 5.9</SpecLine>
              <SpecLine k="REQUESTS">NO ANALYTICS, NO API</SpecLine>
              <SpecLine k="ROUTES">/ + /SCHEMA-FORM (LAZY)</SpecLine>
              <SpecLine k="HOME JS">67 KB GZIP</SpecLine>
              <SpecLine k="SCHEMA_FORM JS">144 KB GZIP</SpecLine>
              <SpecLine k="CONFIG">NON-NEGOTIABLES BASELINE ( SEE /04 )</SpecLine>
              <SpecLine k="HOST">GITHUB PAGES</SpecLine>
              <SpecLine k="REVISION">{DATE}</SpecLine>
            </div>
            {/* Barcode strip */}
            <div
              aria-hidden="true"
              className="mt-4 h-8 bg-[repeating-linear-gradient(90deg,currentColor_0,currentColor_2px,transparent_2px,transparent_4px,currentColor_4px,currentColor_9px,transparent_9px,transparent_11px,currentColor_11px,currentColor_12px,transparent_12px,transparent_17px)]"
            />
            <div
              className={`mt-2 flex flex-wrap items-baseline justify-between gap-2 text-[10px] tracking-[0.2em] ${FAINT}`}
            >
              <span>AIDANB.IO — ALL SYSTEMS NOMINAL</span>
            </div>
          </div>
        </SpineSection>
      </div>
    </div>
  );
}

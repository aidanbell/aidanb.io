import type { ReactNode } from "react";
import { Link } from "react-router-dom";
import ASCIILogo from "../components/TechnicalHome/ASCIILogo";
import resume from "../assets/aidan_bell26.pdf";

/* Monochrome palette only — ink, faint ink, and hairline rules. */
const INK = "text-neutral-900 dark:text-neutral-100";
const FAINT = "text-neutral-500 dark:text-neutral-400";
const RULE = "border-neutral-900/25 dark:border-neutral-100/25";
const RULE_SOFT = "border-neutral-900/15 dark:border-neutral-100/15";

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

const projects: TechProject[] = [
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
    stack: ["REACT", "TYPESCRIPT", "VALIBOT", "REACT HOOK FORM", "TAILWIND", "BASE UI"],
    links: [
      { label: "PLAYGROUND", to: "/schema-form" },
      { label: "NPM:SCHEMA-FORM", href: "https://www.npmjs.com/package/@aidanbell/schema-form" },
      { label: "NPM:SCHEMA-FORM-UI", href: "https://www.npmjs.com/package/@aidanbell/schema-form-ui" },
      { label: "GITHUB", href: "https://github.com/aidanbell/schema-form" },
    ],
  },
  {
    fig: "03",
    name: "CAGE PAGE",
    status: "SHIPPED",
    role: "FULL-STACK",
    summary:
      "Niche content app: OAuth, Node/Express API, MongoDB, third-party movie data. Searchable catalogs and form-heavy rule entry on top of a full auth and data stack.",
    notes: ["OAUTH-BACKED FLOWS + PROTECTED ROUTES", "REST API + TMDB INTEGRATION"],
    stack: ["REACT", "NODE", "EXPRESS", "MONGODB"],
    links: [{ label: "GITHUB", href: "https://github.com/aidanbell/cage-page" }],
  },
  {
    fig: "04",
    name: "MARKDOWNER98",
    status: "SHIPPED - HACKATHON WINNER",
    role: "FRONT-END",
    summary:
      "Mintbean Hackathon winner. Markdown editor with live preview, synced scrolling, and PDF export — editor UX with preview state in lockstep with input.",
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
  },
  {
    title: "SCHEMA-DRIVEN WHEN IT SCALES",
    body: "For form-heavy products, shared schemas drive UI and validation, and stay aligned with the API.",
  },
  {
    title: "STATE YOU CAN TRUST",
    body: "Loading, empty, error, and dirty states get explicit treatment — on the client and at the API boundary.",
  },
  {
    title: "SHIP THE WHOLE SURFACE",
    body: "Reusable UI primitives, wired to real backends: auth, data models, and the contracts that keep the interface honest.",
  },
];

const indexEntries = [
  { key: "01", label: "PROFILE", href: "#profile" },
  { key: "02", label: "SELECTED WORK", href: "#work" },
  { key: "03", label: "METHOD", href: "#method" },
  { key: "04", label: "COLOPHON", href: "#colophon" },
];

const stats = [
  { value: "2", label: "NPM PACKAGES PUBLISHED" },
  { value: "~50%", label: "DEPENDENCIES REMOVED, LEGACY REBUILD" },
  { value: "30->5", label: "DEPLOY MINUTES, BEFORE/AFTER" },
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
}: {
  id: string;
  index: string;
  title: string;
  count?: number;
  children: ReactNode;
}) {
  return (
    <section id={id} className="grid scroll-mt-20 grid-cols-[1.25rem_1fr] gap-x-4 pt-12 sm:gap-x-7">
      <SectionSpine index={index} title={title} count={count} />
      <div className="min-w-0">{children}</div>
    </section>
  );
}

function KV({ k, children }: { k: string; children: ReactNode }) {
  return (
    <div
      className={`grid grid-cols-[7rem_1fr] gap-3 border-b border-dotted ${RULE_SOFT} py-2 sm:grid-cols-[10rem_1fr]`}
    >
      <dt className={`${FAINT} text-[11px] tracking-[0.15em]`}>{k}</dt>
      <dd className={`${INK} text-xs leading-relaxed`}>{children}</dd>
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

export default function TechnicalHome() {
  return (
    <div className={`relative overflow-hidden font-mono ${INK}`}>
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

      <div className="relative mx-auto max-w-3xl px-6 pt-12 pb-20">
        {/* ── Masthead ─────────────────────────────── */}
        <header className={`border-b ${RULE} pb-6`}>
          <div className={`flex flex-wrap items-baseline justify-between gap-2 text-[11px] tracking-[0.2em] ${FAINT}`}>
            <span>AIDANB.IO ( TECHNICAL )</span>
            <span>REV. 2026.09.21</span>
          </div>
          <div className="flex flex-row">
            <div className="mt-6">
              <ASCIILogo />
            </div>
            <div className="flex flex-col">
              <h1 className="mt-6 text-2xl font-bold tracking-[0.25em] sm:text-3xl">
                AIDAN BELL
                <span
                  aria-hidden="true"
                  className="animate-blink ml-2 inline-block h-[0.9em] w-[0.5em] translate-y-[0.1em] bg-current"
                />
              </h1>
              <p className={`mt-2 text-xs tracking-[0.2em] ${FAINT}`}>
                FULL-STACK ENGINEER / DASHBOARDS + FORM-HEAVY UI
              </p>
            </div>
          </div>
        </header>

        {/* ── Index ────────────────────────────────── */}
        <nav aria-label="Page index" className={`border-b ${RULE} py-5`}>
          <ul className="grid grid-cols-2 gap-x-8 gap-y-2 sm:grid-cols-4">
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

        {/* ── 01 / Profile ─────────────────────────── */}
        <SpineSection id="profile" index="01" title="PROFILE">
          <dl>
            <KV k="NAME">AIDAN BELL</KV>
            <KV k="ROLE">FULL-STACK ENGINEER</KV>
            <KV k="FOCUS">COMPLEX DASHBOARDS / FORM-HEAVY UI / SCHEMA-DRIVEN TOOLING</KV>
            <KV k="BELIEF">GOOD CODE AND GOOD UI SHOULD BOTH EXPLAIN THEMSELVES.</KV>
            <KV k="CURRENT">
              SCHEMA-FORM — A HEADLESS, SCHEMA-DRIVEN FORM LIBRARY + STYLED COMPANION.{" "}
              <BracketLink label="TRY IT" to="/schema-form" />
            </KV>
            <KV k="CONTACT">
              <span className="flex flex-wrap gap-x-4 gap-y-1">
                <BracketLink label="GITHUB" href="https://github.com/aidanbell" />
                <BracketLink label="LINKEDIN" href="https://www.linkedin.com/in/aidanbell0/" />
                <BracketLink label="RESUME.PDF" href={resume} download />
              </span>
            </KV>
          </dl>

          {/* Stats strip */}
          <div className={`mt-8 grid border ${RULE} sm:grid-cols-3`}>
            {stats.map((stat, i) => (
              <div key={stat.label} className={`p-4 ${i > 0 ? `border-t sm:border-t-0 sm:border-l ${RULE}` : ""}`}>
                <div className="text-2xl font-bold tracking-tight">{stat.value}</div>
                <div className={`mt-1 text-[10px] tracking-[0.15em] ${FAINT}`}>{stat.label}</div>
              </div>
            ))}
          </div>
        </SpineSection>

        {/* ── 02 / Selected work ───────────────────── */}
        <SpineSection id="work" index="02" title="SELECTED WORK" count={projects.length}>
          <div className="space-y-6">
            {projects.map((project) => (
              <article key={project.fig} className={`border ${RULE}`}>
                <div className={`flex flex-wrap items-baseline justify-between gap-2 border-b ${RULE_SOFT} px-4 py-2`}>
                  <span className="text-[11px] tracking-[0.2em]">
                    <span className={FAINT}>[ FIG. {project.fig} ]</span>{" "}
                    <span className="font-bold">{project.name}</span>
                  </span>
                  <span className={`text-[10px] tracking-[0.15em] ${FAINT}`}>
                    {project.role} — {project.status}
                  </span>
                </div>
                <div className="px-4 py-3">
                  <p className={`text-xs leading-relaxed ${FAINT}`}>{project.summary}</p>
                  <ul className="mt-3 space-y-1">
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
                  {project.links.length > 0 && (
                    <div className={`mt-3 flex flex-wrap gap-x-4 gap-y-1 border-t border-dotted ${RULE_SOFT} pt-3`}>
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

        {/* ── 03 / Method ──────────────────────────── */}
        <SpineSection id="method" index="03" title="METHOD" count={principles.length}>
          <ol className={`grid border ${RULE} sm:grid-cols-2`}>
            {principles.map((principle, i) => (
              <li
                key={principle.title}
                className={`p-4 ${i > 0 ? `border-t ${RULE}` : ""} ${i % 2 === 1 ? `sm:border-l` : ""} ${
                  i === 1 ? "sm:border-t-0" : ""
                } ${RULE}`}
              >
                <h3 className="text-[11px] font-bold tracking-[0.2em]">
                  <span className={FAINT}>{String(i + 1).padStart(2, "0")}.</span> {principle.title}
                </h3>
                <p className={`mt-2 text-xs leading-relaxed ${FAINT}`}>{principle.body}</p>
              </li>
            ))}
          </ol>
        </SpineSection>

        {/* ── 04 / Colophon ────────────────────────── */}
        <SpineSection id="colophon" index="04" title="COLOPHON">
          <div className={`border ${RULE} p-4`}>
            <p className={`text-[11px] tracking-[0.1em] ${FAINT}`}>$ cat /etc/build-info</p>
            <pre className="mt-2 overflow-x-auto text-[11px] leading-relaxed tracking-[0.05em]">
              {`RUNTIME ........ REACT 18 + VITE 5
STYLES ......... TAILWIND CSS 4 (MONOCHROME ONLY)
LANG ........... TYPESCRIPT 5.9
FORMS .......... @AIDANBELL/SCHEMA-FORM 0.2
HOST ........... GITHUB PAGES
REVISION ....... 2026.09.21`}
            </pre>
            {/* Barcode strip */}
            <div
              aria-hidden="true"
              className="mt-4 h-8 bg-[repeating-linear-gradient(90deg,currentColor_0,currentColor_2px,transparent_2px,transparent_4px,currentColor_4px,currentColor_9px,transparent_9px,transparent_11px,currentColor_11px,currentColor_12px,transparent_12px,transparent_17px)]"
            />
            <div
              className={`mt-2 flex flex-wrap items-baseline justify-between gap-2 text-[10px] tracking-[0.2em] ${FAINT}`}
            >
              <span>AIDANB.IO — ALL SYSTEMS NOMINAL</span>
              <Link to="/" className="underline decoration-dotted underline-offset-4 hover:decoration-solid">
                [EXIT TO STANDARD SITE]
              </Link>
            </div>
          </div>
        </SpineSection>
      </div>
    </div>
  );
}

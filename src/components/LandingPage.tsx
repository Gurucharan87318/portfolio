import React, { useEffect, useRef, useState } from "react"
import {
  ArrowUpRight,
  Award,
  BarChart3,
  BookOpen,
  CheckCircle2,
  ChevronRight,
  Download,
  Github,
  Mail,
  Menu,
  X,
  Eye,
} from "lucide-react"

/**
 * LandingPage.tsx
 *
 * Fixes in this version:
 * 1) About image not visible: removed the max-height clamp that was hiding it and rebuilt the image block so
 *    your tall portrait (hero-4.jpg) always renders and can be manually positioned.
 *    - Uses a fixed “stage” height with overflow-hidden so you can slide the image inside without breaking layout.
 * 2) View count double: in React 18 dev (StrictMode) effects run twice. Added a guard so increment happens once per page load.
 * 3) View count design: replaced old button with a clean “glassy stat pill” matching your site typography.
 * 4) Removed footer copyright line completely.
 *
 * All link edit points are marked with TODO.
 */

// -----------------------------------------------------------------------------
// Reveal animation
// -----------------------------------------------------------------------------
function Reveal({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  const [isVisible, setIsVisible] = useState(false)
  const ref = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          observer.unobserve(entry.target)
        }
      },
      { threshold: 0.1 }
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return (
    <div
      ref={ref}
      style={{ transitionDelay: `${delay}ms` }}
      className={[
        "transition-all duration-1000 ease-[cubic-bezier(0.25,1,0.5,1)]",
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12",
      ].join(" ")}
    >
      {children}
    </div>
  )
}

function Badge({
  children,
  variant = "default",
}: {
  children: React.ReactNode
  variant?: "default" | "success" | "outline"
}) {
  const variants: Record<string, string> = {
    default: "bg-slate-100 text-slate-600 border-transparent",
    success: "bg-emerald-50 text-emerald-700 border-emerald-100 border",
    outline: "bg-white text-slate-500 border-slate-200 border",
  }
  return (
    <span
      className={[
        "inline-flex items-center rounded-full px-3 py-1 text-[11px] font-bold uppercase tracking-wider",
        variants[variant],
      ].join(" ")}
    >
      {children}
    </span>
  )
}


// -----------------------------------------------------------------------------
// Cards
// -----------------------------------------------------------------------------
function ProjectCard({
  title,
  desc,
  status = "Selected",
  href,
}: {
  title: string
  desc: string
  status?: string
  href: string
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      className="group relative flex flex-col justify-between overflow-hidden rounded-[2rem] bg-white p-8 shadow-sm transition-all duration-500 hover:-translate-y-2 hover:shadow-xl border border-slate-100"
    >
      <div className="flex items-center justify-between mb-6">
        <div className="h-10 w-10 rounded-full bg-slate-50 flex items-center justify-center text-slate-900 group-hover:bg-slate-900 group-hover:text-white transition-colors duration-500">
          <ArrowUpRight size={20} />
        </div>
        <Badge variant={status === "Flagship" ? "success" : "default"}>{status}</Badge>
      </div>

      <div>
        <h3 className="text-2xl font-bold tracking-tight text-slate-900 mb-3">{title}</h3>
        <p className="text-slate-500 leading-relaxed">{desc}</p>
      </div>

      <div className="mt-8 flex items-center gap-2 text-sm font-bold text-slate-400">
        Open artifact{" "}
        <ChevronRight size={16} className="transition-transform group-hover:translate-x-1" />
      </div>
    </a>
  )
}

function WritingCard({
  title,
  desc,
  href,
  type,
}: {
  title: string
  desc: string
  href: string
  type: "Medium" | "Case Study" | "Market Analysis"
}) {
  const icon =
    type === "Medium" ? <BookOpen size={18} /> : type === "Case Study" ? <CheckCircle2 size={18} /> : <BarChart3 size={18} />

  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      className="group relative flex items-start gap-4 rounded-3xl border border-slate-100 bg-white p-6 shadow-sm transition-all duration-500 hover:-translate-y-1 hover:shadow-md hover:border-slate-200"
    >
      <div className="mt-1 flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-slate-50 text-slate-900 group-hover:bg-slate-900 group-hover:text-white transition-colors duration-500">
        {icon}
      </div>

      <div className="min-w-0">
        <div className="flex items-center gap-2">
          <span className="text-xs font-bold uppercase tracking-widest text-slate-400">{type}</span>
          <span className="h-1 w-1 rounded-full bg-slate-300" />
          <span className="text-xs font-bold uppercase tracking-widest text-slate-400">External</span>
        </div>
        <h4 className="mt-2 font-bold text-slate-900 truncate">{title}</h4>
        <p className="mt-2 text-sm leading-relaxed text-slate-500">{desc}</p>
      </div>

      <ArrowUpRight size={18} className="ml-auto text-slate-300 group-hover:text-slate-900 transition-colors" />
    </a>
  )
}

function CertificateCard({
  title,
  issuer,
  date,
  image,
  onOpen,
}: {
  title: string
  issuer: string
  date: string
  image?: string
  onOpen?: () => void
}) {
  return (
    <div
      onClick={onOpen}
      className={[
        "flex items-start gap-4 rounded-2xl border border-slate-100 bg-white p-5",
        "transition-all hover:border-slate-200 hover:shadow-sm",
        image ? "cursor-pointer hover:-translate-y-0.5" : "",
      ].join(" ")}
    >
      <div className="mt-1 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-emerald-50 text-emerald-600">
        <Award size={16} />
      </div>
      <div className="min-w-0 flex-1">
        <h5 className="font-semibold text-slate-900">{title}</h5>
        <div className="mt-1 flex items-center gap-2 text-sm text-slate-500">
          <span>{issuer}</span>
          <span className="h-1 w-1 rounded-full bg-slate-300" />
          <span className="text-slate-400">{date}</span>
        </div>
      </div>

      {/* "View" hint if image exists */}
      {image && (
        <div className="ml-auto flex items-center gap-1 text-xs font-semibold text-slate-400 group-hover:text-slate-600">
          <ArrowUpRight size={14} />
        </div>
      )}
    </div>
  )
}



// -----------------------------------------------------------------------------
// Modal
// -----------------------------------------------------------------------------
function Modal({
  open,
  title,
  onClose,
  children,
}: {
  open: boolean
  title: string
  onClose: () => void
  children: React.ReactNode
}) {
  useEffect(() => {
    if (!open) return
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose()
    }
    window.addEventListener("keydown", onKeyDown)
    return () => window.removeEventListener("keydown", onKeyDown)
  }, [open, onClose])

  if (!open) return null

  return (
    <div className="fixed inset-0 z-100">
      <button
        aria-label="Close overlay"
        onClick={onClose}
        className="absolute inset-0 bg-white/35 backdrop-blur-2xl"
      />
      <div className="relative mx-auto mt-24 w-[92%] max-w-2xl">
        <div className="rounded-[2rem] border border-slate-200 bg-white shadow-2xl overflow-hidden">
          <div className="flex items-start justify-between gap-4 px-8 pt-8 pb-4">
            <div>
              <div className="text-xs font-bold uppercase tracking-widest text-slate-400">Library</div>
              <h3 className="mt-1 text-2xl font-bold tracking-tight text-slate-900">{title}</h3>
            </div>
            <button
              onClick={onClose}
              className="h-11 w-11 rounded-full border border-slate-200 bg-white text-slate-500 hover:text-slate-900 transition-colors flex items-center justify-center"
              aria-label="Close"
            >
              <X size={18} />
            </button>
          </div>
          <div className="px-8 pb-8">{children}</div>
        </div>
      </div>
    </div>
  )
}



function LiveTicker() {
  // TODO: edit these items anytime — add/remove freely
  const items = [
    "Currently learning — Business strategy & Finance Management (coursera)",
    "Building — AutoAnalyst v2 — AI-assisted Business Intelligence",
    "Reading — RDPD by Robert T Kiyosaki",
    "Writing a Book — Systems Built by Systems - Understanding How Human Civilization Became a Machine ",
    "Working on — Strategic transition into Business Analytics & Product Strategy.",
    "Freetime Hobbie  — Fitness & atheletics",
  ]

  // duplicate for seamless loop
  const looped = [...items, ...items]

  return (
    <div className="fixed top-20 md:top-24 inset-x-0 z-40 overflow-hidden border-b border-slate-100 bg-white/80 backdrop-blur-md py-2">
      <div className="flex w-max animate-ticker gap-12 whitespace-nowrap">
        {looped.map((item, i) => (
          <span
            key={i}
            className="flex items-center gap-3 text-[11px] font-bold uppercase tracking-widest text-slate-400"
          >
            {item}
            <span className="h-1 w-1 rounded-full bg-slate-300" />
          </span>
        ))}
      </div>

      <style>{`
        @keyframes ticker {
          from { transform: translateX(0); }
          to   { transform: translateX(-50%); }
        }
        .animate-ticker {
          animation: ticker 35s linear infinite;
        }
        .animate-ticker:hover {
          animation-play-state: paused;
        }
      `}</style>
    </div>
  )
}



// -----------------------------------------------------------------------------
// Views pill (new design)
// -----------------------------------------------------------------------------
function ViewsPill({ count }: { count: number }) {
  return (
    <div className="inline-flex items-center gap-3 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-slate-200 backdrop-blur-md">
      <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-white/10">
        <Eye size={18} className="text-slate-200" />
      </span>
      <div className="leading-tight">
        <div className="text-xs font-bold uppercase tracking-widest text-slate-400">Views</div>
        <div className="font-semibold text-slate-100">{count}</div>
      </div>
    </div>
  )
}


function CertLightbox({
  image,
  title,
  onClose,
}: {
  image: string
  title: string
  onClose: () => void
}) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") onClose() }
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [onClose])

  return (
    <div
      className="fixed inset-0 z-200 flex items-center justify-center"
      onClick={onClose}
    >
      {/* Blurred backdrop */}
      <div className="absolute inset-0 bg-black/70 backdrop-blur-xl" />

      {/* Certificate image */}
      <div
        className="relative z-10 mx-4 w-full max-w-4xl animate-in zoom-in-95 duration-300"
        onClick={(e) => e.stopPropagation()}
      >
        <img
          src={image}
          alt={title}
          className="w-full h-auto max-h-[85vh] object-contain rounded-2xl shadow-2xl"
        />

        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute -top-4 -right-4 h-10 w-10 rounded-full bg-white text-slate-900 shadow-xl flex items-center justify-center hover:scale-110 transition-transform"
          aria-label="Close"
        >
          <X size={18} />
        </button>

        {/* Title below image */}
        <div className="mt-4 text-center text-sm font-semibold text-white/80">
          {title}
        </div>
      </div>
    </div>
  )
}


// -----------------------------------------------------------------------------
// Main
// -----------------------------------------------------------------------------
export default function LandingPage() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isCertOpen, setIsCertOpen] = useState(false)
  const [views, setViews] = useState<number>(0)
  const [activeCert, setActiveCert] = useState<{ image: string; title: string } | null>(null)


  // StrictMode double-run guard (dev only)
  const incrementedRef = useRef(false)

  const scrollToSection = (id: string) => {
    setIsMobileMenuOpen(false)
    const el = document.getElementById(id)
    if (!el) return
    const headerOffset = 92
    const y = el.getBoundingClientRect().top + window.pageYOffset - headerOffset
    window.scrollTo({ top: y, behavior: "smooth" })
  }

  // Views: increments once per actual page load (not twice in StrictMode dev)
  useEffect(() => {
    if (incrementedRef.current) return
    incrementedRef.current = true

    const KEY = "portfolio_views_total"
    const stored = Number(localStorage.getItem(KEY) || "0")
    const next = stored + 1
    localStorage.setItem(KEY, String(next))
    setViews(next)
  }, [])

  // ---------------------------------------------------------------------------
  // TODO: LINKS (edit here)
  // ---------------------------------------------------------------------------
  const PERSON_IMG = "/src/assets/hero2.jpeg" // TODO: ensure this file exists in your assets
  const RESUME_URL = "/src/assets/resume.pdf"
  const GOOGLE_FORM_URL = "https://forms.gle/XijEstbTTTCAtJd49" // TODO: paste your form link
  const LINKEDIN_URL = "https://www.linkedin.com/in/gurucharan-senthilkumar-31310324b/"
  const GITHUB_URL = "https://github.com/Gurucharan87318/"
  const EMAIL = "gurucharansenthilkumar04@gmail.com"

  const PROJECT_LINKS = {
    autoAnalyst: "https://autoanalyst-ai-powered-business-int.vercel.app/", // TODO
    startupWork: "https://growth-intelligence-engine-beige.vercel.app/", // TODO
    redesign: "https://github.com/Gurucharan87318/GoQuant_Latency-Topology-Visualizer.git", // TODO
    studyFlow: "https://github.com/Gurucharan87318/Ai-Code-Gen-V1.git", // TODO
  } as const

  const WRITING_LINKS = {
    medium1: "https://medium.com/@gurucharan87318/why-modern-bi-tools-still-fail-decision-makers-feea5c43ba08", // TODO
    medium2: "https://medium.com/@gurucharan87318/building-autoanalyst-turning-raw-data-into-board-ready-strategy-e51e8f5d392d", // TODO
    medium3: "https://medium.com/@gurucharan87318/simulating-an-e-commerce-dataset-to-learn-product-analytics-fe10299ef031",
    medium4: "https://medium.com/@gurucharan87318/building-a-product-analytics-system-instead-of-another-dashboard-28d6269073f9",
    market2:"", // TODO
  } as const
  // ---------------------------------------------------------------------------

  // ---------------------------------------------------------------------------
  // TODO: Manual image tuning (perfect placement)
  // ---------------------------------------------------------------------------
  const IMG_TUNE = {
    translateX: 10, // px
    translateY: 10, // px (try -40 to move up)
    scale: 0.90, // try 1.0–1.15
  } as const

  // “Stage” sizes so image is always visible and doesn't create layout gaps
  const IMG_STAGE = {
    heightMobile: 500, // px
    heightDesktop: 520, // px
  } as const
  // ---------------------------------------------------------------------------

  const projects = [
    { title: "AutoAnalyst", status: "Flagship", href: PROJECT_LINKS.autoAnalyst, desc: "AI-Assisted Business Intelligence (Offline-First MVP)--AutoAnalyst is an offline-first business intelligence platform built to reduce repetitive analytics work — exports, cleaning, chart building, and summary writing — so analysts can focus on decisions instead of dashboards." },
    { title: "Growth Intelligence Engine", status: "Selected", href: PROJECT_LINKS.startupWork, desc: "A full-stack analytical platform designed to bridge the gap between fragmented business metrics and executive action. This system automates the synthesis of market data, growth cohorts, and unit economics into structured, decision-ready strategy memos." },
    { title: "GoQuant Latency Visualizer", status: "Selected", href: PROJECT_LINKS.redesign, desc: "A premium, modular trading dashboard built with Next.js, TypeScript, and TailwindCSS, featuring real-time latency visualization, advanced telemetry, authentication, and AI-powered assistant modules. Integrated AI companion for design and development, GPT4All Models Used for data refinement and prompt chaining" },
    { title: "AI Code Generator - Version 1.0", status: "Selected", href: PROJECT_LINKS.studyFlow, desc: "An AI-powered code generation tool that transforms natural language prompts into clean and structured HTML, CSS, and JavaScript code. Built with FastAPI (backend) and React + Vite (frontend), this project integrates Together AI API for intelligent code generation." },
  ] as const

  const writings = [
    { type: "Medium" as const, title: "Why Modern BI Tools Still Fail Decision-Makers", href: WRITING_LINKS.medium1, desc: "We live in a world with more data than ever. Yet many organizations still struggle with slow decision cycles. Ironically, the tools designed to solve this problem — BI dashboards sometimes make it worse. This paradox inspired the creation of AutoAnalyst." },
    { type: "Medium" as const, title: "Building AutoAnalyst: Turning Raw Data into Board-Ready Strategy", href: WRITING_LINKS.medium2, desc: "Data is abundant in modern organizations. But decision-ready insight is still scarce. Many teams export CSV files from accounting tools, CRM systems, and analytics dashboards every week." },
    { type: "Medium" as const, title: "Simulating an E-commerce Dataset to Learn Product Analytics", href: WRITING_LINKS.medium3, desc: "One of the challenges when learning analytics is access to real data.Most companies don’t share their internal datasets, so you need to create your own realistic environment. For my analytics case study" },
    { type: "Medium" as const, title: "Building a Product Analytics System Instead of Another Dashboard", href: WRITING_LINKS.medium4, desc: "Most data projects stop at a dashboard.A few charts, maybe a SQL query or two, and that’s it.But in real companies, dashboards are not the goal. Decisions are." },
  ] as const

const certificates = [
    {
    title: "Business value Creation",
    issuer: "Coursera - Duke University",
    date: "Feb 2026",
    image: "/src/assets/certs/BusinessValue.jpg",
  },
    {
    title: "Cash Flow Management",
    issuer: "Coursera - Duke University",
    date: "Aug 2024",
    image: "/src/assets/certs/CashFlow.jpg",
  },
  {
    title: "GenAI Job Simulation",
    issuer: "BCG - Forage",
    date: "Feb 2026",
    image: "/src/assets/certs/BCG.jpg",
  },
  {
    title: "GenAI-Powered Data Analytics",
    issuer: "Tata Group - Forage",
    date: "June 2025",
    image: "/src/assets/certs/genai.jpg",          // TODO: your cert image paths
  },
  
] as const



  const navItems = [
    { label: "Home", id: "intro" },
    { label: "Work", id: "work" },
    { label: "Research", id: "research" },
    { label: "About", id: "about" },
    { label: "Contact", id: "contact" },
  ] as const

  return (
    <div className="min-h-screen bg-white font-sans text-slate-900 selection:bg-black selection:text-white overflow-x-hidden">
      {/* NAVBAR */}
      <nav className="fixed inset-x-0 top-0 z-50 bg-white/80 backdrop-blur-md border-b border-transparent transition-all duration-300">
        <div className="mx-auto flex h-20 md:h-24 max-w-350 items-center justify-between px-6 lg:px-12">
          <button onClick={() => scrollToSection("intro")} className="text-lg md:text-xl font-bold tracking-tight text-slate-900">
            Gurucharan Senthilkumar
          </button>

          <div className="hidden md:flex items-center gap-1 rounded-full border border-slate-200/60 bg-white/55 p-1 shadow-sm backdrop-blur-md">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className={[
                  "rounded-full px-5 py-2 text-sm font-medium transition-all",
                  "text-slate-600 hover:text-slate-900",
                  "hover:bg-white/70 hover:backdrop-blur-md hover:shadow-sm",
                  "active:scale-[0.98]",
                ].join(" ")}
              >
                {item.label}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => scrollToSection("contact")}
              className="hidden md:inline-flex rounded-full bg-black px-6 py-2.5 text-sm font-bold text-white shadow-lg shadow-black/20 transition-transform hover:-translate-y-0.5 active:scale-95"
            >
              Email Me
            </button>

            <button
              onClick={() => setIsMobileMenuOpen((s) => !s)}
              className="md:hidden inline-flex h-11 w-11 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-700 shadow-sm"
              aria-label="menu"
            >
              {isMobileMenuOpen ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
        </div>

        <div className={["md:hidden overflow-hidden transition-all duration-500", isMobileMenuOpen ? "max-h-96 border-t border-slate-100" : "max-h-0"].join(" ")}>
          <div className="px-6 py-5 grid gap-2 bg-white/90 backdrop-blur-md">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className="rounded-2xl border border-slate-100 bg-white px-4 py-3 text-left text-sm font-semibold text-slate-800 shadow-sm active:scale-[0.99] transition-transform"
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>
      </nav>
    <LiveTicker />
     <Modal open={isCertOpen} title="Certificates" onClose={() => setIsCertOpen(false)}>
  <div className="grid gap-4">
    {certificates.map((c) => (
      <CertificateCard
        key={c.title}
        title={c.title}
        issuer={c.issuer}
        date={c.date}
        image={c.image}
        onOpen={() => {
          // Close the certs list modal, open the full-screen lightbox
          setIsCertOpen(false)
          setActiveCert({ image: c.image, title: c.title })
        }}
      />
    ))}
  </div>
</Modal>

{/* Cert lightbox (full-screen) */}
{activeCert && (
  <CertLightbox
    image={activeCert.image}
    title={activeCert.title}
    onClose={() => {
      setActiveCert(null)
      setIsCertOpen(true)  // re-open the list when user closes image
    }}
  />
)}



      <main>
        {/* HERO */}
        <section
          id="intro"
          className="relative mx-auto flex min-h-[90vh] max-w-350 flex-col justify-end bg-white px-6 pb-8 pt-28 md:pt-32 lg:px-12 lg:pb-0"
        >
          <div className="grid h-full grid-cols-1 items-end gap-10 pb-8 lg:grid-cols-12">
            <div className="relative z-10 order-2 lg:order-1 lg:col-span-6 lg:pb-4 pointer-events-none">
              <Reveal>
                <div className="mb-6 flex items-center gap-2">
                  <span className="relative flex h-2.5 w-2.5">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                    <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-emerald-500" />
                  </span>
                  <span className="text-xs font-bold uppercase tracking-widest text-slate-400">Available for roles</span>
                </div>

                <h1 className="text-5xl font-bold leading-[1.05] tracking-tighter text-slate-900 lg:text-6xl drop-shadow-sm">
                  Solving problems through <span className="text-slate-400">strategic design</span> and compelling logic.
                </h1>
              </Reveal>
            </div>

            <div className="relative z-10 order-3 lg:col-span-6 lg:pb-4 pointer-events-auto">
              <Reveal delay={200}>
                <p className="mb-8 text-lg font-medium leading-relaxed text-slate-500 drop-shadow-sm">
                  Strategy, analysis, and systems thinking — grounded in computer science.
                 I bridge the gap between data and decisions, helping teams move from insight to action.
                 I collaborate closely to design simple systems that actually improve outcomes.
                </p>

                <button
                  onClick={() => scrollToSection("contact")}
                  className="inline-flex h-14 items-center justify-center rounded-full bg-black px-8 text-sm font-bold text-white shadow-xl transition-transform hover:-translate-y-1 active:scale-95"
                >
                  Email Me
                </button>
              </Reveal>
            </div>
          </div>
        </section>

        {/* WORK */}
        <section id="work" className="px-6 lg:px-12 py-18 md:py-22 bg-[#FAFAFA]">
          <div className="mx-auto max-w-350">
            <Reveal>
              <div className="mb-12">
                <h2 className="text-3xl font-bold text-slate-900 tracking-tight">Projects</h2>
                <p className="mt-3 text-slate-500 font-medium max-w-2xl">
                  I focus on decision-making, Strategy mapping, problem solving traits
                </p>
              </div>
            </Reveal>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {projects.map((p, i) => (
                <Reveal key={p.title} delay={100 * i}>
                  <ProjectCard {...p} />
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* RESEARCH */}
        <section id="research" className="px-6 lg:px-12 py-18 md:py-22 bg-white border-t border-slate-50">
          <div className="mx-auto max-w-350">
            <Reveal>
              <div className="mb-12">
                <h2 className="text-3xl font-bold text-slate-900 tracking-tight">Research / Writing</h2>
                <p className="mt-3 text-slate-500 font-medium max-w-2xl">
                  Writing is how I clarify thinking.
                </p>
              </div>
            </Reveal>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {writings.map((w, i) => (
                <Reveal key={w.title} delay={100 * i}>
                  <WritingCard {...w} />
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* ABOUT (image always visible with a stage) */}
        <section id="about" className="px-6 lg:px-12 py-12 md:py-14 bg-[#FAFAFA]">
          <div className="mx-auto max-w-350">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-10 items-center">
              {/* Left: image stage */}
              <div className="lg:col-span-5">
                <Reveal>
                  <div
                    className="relative mx-auto w-full max-w-130 overflow-hidden"
                    style={{
                      height: IMG_STAGE.heightMobile,
                    }}
                  >
                    <div
                      className="absolute left-1/2 top-1/2 w-full"
                      style={{
                        transform: `translate(-50%, -50%) translate(${IMG_TUNE.translateX}px, ${IMG_TUNE.translateY}px) scale(${IMG_TUNE.scale})`,
                        transformOrigin: "center center",
                      }}
                    >
                      <img
                        src={PERSON_IMG}
                        alt="Gurucharan S"
                        className="w-full h-auto object-cover object-top select-none"
                        draggable={false}
                      />
                    </div>

                    <style>{`
                      @media (min-width: 1024px) {
                        #about .img-stage { height: ${IMG_STAGE.heightDesktop}px; }
                      }
                    `}</style>
                  </div>

                  {/* apply desktop height via class */}
                  <div className="hidden" />
                </Reveal>
              </div>

              {/* Right: about card + actions */}
              <div className="lg:col-span-7">
                <Reveal delay={120}>
                  <div className="rounded-[2rem] border border-slate-100 bg-white p-8 shadow-sm">
                    <div className="text-xs font-bold uppercase tracking-widest text-slate-400">About</div>
                    <h2 className="mt-3 text-3xl md:text-4xl font-bold tracking-tight text-slate-900 leading-tight">
                      CS → Strategy.
                      <br />
                      Business is the interface.
                    </h2>

                    <p className="mt-6 text-slate-600 leading-relaxed font-medium">
                     I started in computer science because I loved building systems. Over time, I realized the hardest part isn’t code — it’s deciding what to build, what to ignore, and how to make decisions under constraints.</p>

                    <p className="mt-5 text-slate-600 leading-relaxed font-medium">
                      I’m drawn to business problems where clarity is missing: messy data, unclear priorities, slow execution. I focus on reducing noise, making trade-offs explicit, and shipping work that improves real outcomes.</p>

                    <p className="mt-5 text-slate-600 leading-relaxed font-medium">
                      What I optimize for: decision velocity, trust in outputs, and simple workflows that people actually use. </p>
                  </div>

                  <div className="mt-4 flex flex-col sm:flex-row gap-3">
                    <a
                      href={RESUME_URL}
                      download
                      className="inline-flex items-center justify-center gap-2 rounded-full bg-black px-7 py-3.5 text-sm font-bold text-white shadow-lg shadow-black/20 transition-transform hover:-translate-y-1 active:scale-95"
                    >
                      <Download size={16} />
                      Download Resume
                    </a>

                    <button
                      onClick={() => setIsCertOpen(true)}
                      className="inline-flex items-center justify-center gap-2 rounded-full border border-slate-200 bg-white px-7 py-3.5 text-sm font-bold text-slate-700 shadow-sm transition-transform hover:-translate-y-1 hover:shadow-md active:scale-95"
                    >
                      <Award size={16} />
                      Credentials
                    </button>
                  </div>
                </Reveal>
              </div>
            </div>
          </div>
        </section>

        {/* FOOTER (black, no copyright, no policy links) */}
        <footer id="contact" className="bg-[#0B1120] text-slate-400 px-6 lg:px-12 pt-16 pb-12 border-t border-white/5">
          <div className="mx-auto max-w-350">
            <Reveal>
              <div className="text-center">
                <h3 className="text-3xl md:text-4xl font-semibold tracking-tight text-white">
                  Have a great idea in mind?
                  <br />
                  lets make it real
                </h3>

                <div className="mt-6 flex justify-center">
                  {/* TODO: paste your Google Form link in GOOGLE_FORM_URL */}
                  <a
                    href={GOOGLE_FORM_URL}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex h-12 items-center justify-center rounded-full bg-white px-6 text-sm font-bold text-black shadow-lg transition-transform hover:-translate-y-0.5 active:scale-95"
                  >
                    Lets Work Together <ArrowUpRight size={16} className="ml-2" />
                  </a>
                </div>
              </div>
            </Reveal>

            <div className="mt-14 grid grid-cols-1 gap-10 md:grid-cols-12 md:items-start">
              <div className="md:col-span-6">
                <Reveal delay={100}>
                  <div className="text-lg font-semibold text-white">Gurucharan Senthilkumar</div>
                  <p className="mt-3 max-w-md text-sm leading-relaxed text-slate-400">
                    Serious collaborations start with clear context. Share constraints and timeline—I’ll reply with a plan.
                  </p>

                  <div className="mt-5 flex items-center gap-3">
                    <a
                      href={LINKEDIN_URL}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 text-slate-200 hover:bg-white/10 transition-colors"
                      aria-label="LinkedIn"
                      title="LinkedIn"
                    >
                      in
                    </a>

                    <a
                      href={GITHUB_URL}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 text-slate-200 hover:bg-white/10 transition-colors"
                      aria-label="GitHub"
                      title="GitHub"
                    >
                      <Github size={18} />
                    </a>

                    <a
                      href={`mailto:${EMAIL}`}
                      className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 text-slate-200 hover:bg-white/10 transition-colors"
                      aria-label="Email"
                      title="Email"
                    >
                      <Mail size={18} />
                    </a>
                  </div>

                  <div className="mt-6">
                    <ViewsPill count={views} />
                  </div>
                </Reveal>
              </div>

              <div className="md:col-span-6 md:flex md:justify-end">
                <Reveal delay={150}>
                  <div className="flex flex-col items-start md:items-end gap-3 text-sm text-slate-400">
                    <div className="flex flex-wrap gap-x-6 gap-y-2">
                      {navItems.map((i) => (
                        <button
                          key={i.id}
                          onClick={() => scrollToSection(i.id)}
                          className="hover:text-white transition-colors"
                        >
                          {i.label}
                        </button>
                      ))}
                    </div>

                    <button
                      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
                      className="mt-2 inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 text-slate-200 hover:bg-white/10 transition-colors"
                      aria-label="Back to top"
                      title="Back to top"
                    >
                      ↑
                    </button>
                  </div>
                </Reveal>
              </div>
            </div>
          </div>
        </footer>
      </main>
    </div>
  )
}

import Image from "next/image"
import { ArrowRight, Download } from "lucide-react"
import { profile } from "@/lib/portfolio"
import CountUp from "@/components/reactbits/count-up"
import GlareHover from "@/components/reactbits/glare-hover"
import SplitText from "@/components/reactbits/split-text"

function statNumber(value: string): number {
  return parseInt(value.replace(/[^0-9]/g, ""), 10) || 0
}

function statSuffix(value: string): string {
  return value.replace(/[0-9]/g, "").trim()
}

export function Hero() {
  return (
    <section id="top" className="relative overflow-hidden px-5 pt-16">
      {/* Subtle ambient glow — depth without noise */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute top-1/3 right-[6%] h-104 w-104 -translate-y-1/2 rounded-full bg-emerald-500/12 blur-[130px]" />
        <div className="absolute top-1/2 -left-32 h-80 w-80 -translate-y-1/2 rounded-full bg-purple-500/10 blur-[120px]" />
      </div>

      <div className="mx-auto grid max-w-6xl grid-cols-1 items-center gap-12 py-28 lg:grid-cols-12 lg:gap-16 lg:py-32">
        {/* Text — 60%, primary focal point */}
        <div className="lg:col-span-7">
          {profile.available ? (
            <p
              data-animate
              className="inline-flex items-center gap-2 rounded-full border border-border/60 bg-card/50 px-3.5 py-1.5 text-xs text-muted-foreground"
            >
              <span className="relative flex size-2">
                <span className="absolute inline-flex size-full animate-ping rounded-full bg-brand opacity-75" />
                <span className="relative inline-flex size-2 rounded-full bg-brand" />
              </span>
              Available for new projects
            </p>
          ) : null}

          <h1
            data-animate
            className="mt-8 text-5xl leading-[1.05] font-semibold tracking-tight sm:text-6xl lg:text-7xl"
          >
            <span className="text-foreground">Hi, I&apos;m</span>{" "}
            <SplitText
              text={`${profile.shortName}.`}
              className="hero-name-gradient inline-block bg-linear-to-r from-emerald-400 via-blue-500 to-purple-500 bg-clip-text text-transparent"
              delay={30}
              duration={0.6}
              tag="span"
            />
          </h1>

          <p
            data-animate
            className="mt-7 max-w-[46ch] text-base leading-[1.8] text-muted-foreground sm:text-lg"
          >
            A{" "}
            <span className="font-medium text-foreground">{profile.role}</span>{" "}
            based in Indonesia. I craft scalable backends, modern web
            applications, and AI-enabled platforms used by 40,000+ people.
          </p>

          <div data-animate className="mt-10 flex flex-wrap items-center gap-6">
            <a
              href="#contact"
              className="inline-flex items-center gap-2 rounded-full bg-foreground px-6 py-3 text-sm font-semibold text-background transition-all duration-200 hover:shadow-[0_0_28px_-6px_var(--brand)]"
            >
              Contact Me <ArrowRight className="size-4" />
            </a>
            {/* ponytail: drop cv.pdf into /public to activate */}
            <a
              href="/cv.pdf"
              className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground transition-colors duration-200 hover:text-foreground"
            >
              Download CV <Download className="size-4" />
            </a>
          </div>
          <div
            className="mt-8 flex flex-wrap items-stretch gap-x-6 gap-y-4"
            data-animate
          >
            {profile.stats.slice(0, 3).map((s, i) => (
              <div
                key={s.label}
                className={`flex flex-1 flex-col ${
                  i > 0 ? "border-l border-border/40 pl-6" : ""
                }`}
              >
                <span className="font-mono text-2xl font-semibold tracking-tight text-brand sm:text-3xl">
                  <CountUp
                    from={0}
                    to={statNumber(s.value)}
                    duration={2}
                  />
                  {statSuffix(s.value)}
                </span>
                <p className="mt-1 text-xs text-muted-foreground">{s.label}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Portrait — 40%, deliberately secondary */}
        <div className="relative lg:col-span-5" data-animate>
          {/* gradient glow border — green bottom-left, purple top-right */}
          <div className="pointer-events-none absolute -inset-px -z-10 rounded-[2.25rem] bg-linear-to-br from-emerald-400 via-transparent to-purple-500 opacity-60 blur-[2px]" />
          <div className="pointer-events-none absolute -inset-8 -z-20 rounded-[3rem] bg-linear-to-br from-emerald-500/20 via-transparent to-purple-500/20 blur-3xl" />
          <GlareHover
            background="transparent"
            borderRadius="2rem"
            borderColor="var(--border)"
            glareColor="#34d399"
            glareOpacity={0.35}
            glareAngle={-30}
            glareSize={300}
            transitionDuration={800}
            className="relative aspect-4/5 w-full overflow-hidden bg-linear-to-br from-card via-muted/40 to-card shadow-[0_24px_60px_-24px_rgba(0,0,0,0.6)]"
          >
            <Image
              src="/me.png"
              alt={profile.name}
              fill
              sizes="(max-width: 1024px) 100vw, 40vw"
              className="object-cover object-top"
              priority
            />
            <div className="absolute top-4 right-4 z-10 grid size-9 place-items-center rounded-xl border border-border/60 bg-card/80 text-emerald-400 backdrop-blur">
              <ArrowRight className="size-4" />
            </div>
          </GlareHover>
        </div>
      </div>
    </section>
  )
}

"use client"

import Image from "next/image"
import { ArrowRight, Download } from "lucide-react"
import { profile } from "@/lib/portfolio"
import CountUp from "@/components/reactbits/count-up"

function statNumber(value: string): number {
  return parseInt(value.replace(/[^0-9]/g, ""), 10) || 0
}

function statSuffix(value: string): string {
  return value.replace(/[0-9]/g, "").trim()
}

export function Hero() {
  return (
    <section id="top" className="relative overflow-hidden px-5 pt-16">
      <div className="mx-auto grid max-w-6xl grid-cols-1 items-center gap-12 py-14 lg:grid-cols-12 lg:gap-16 lg:py-14">
        {/* Text — 60%, primary focal point */}
        <div className="lg:col-span-7">
          {profile.available ? (
            <p
              data-animate
              className="inline-flex items-center gap-2 border-2 border-foreground bg-chartreuse px-3.5 py-1.5 text-xs font-bold text-foreground shadow-[4px_4px_0_var(--ink)]"
            >
              <span className="relative flex size-2">
                <span className="absolute inline-flex size-full animate-ping rounded-full bg-cobalt opacity-75" />
                <span className="relative inline-flex size-2 rounded-full bg-cobalt" />
              </span>
              Available for new projects
            </p>
          ) : null}

          <h1
            data-animate
            className="mt-8 text-5xl leading-[1.05] font-black tracking-tight sm:text-6xl lg:text-8xl"
          >
            <span className="text-foreground">Hi, I&apos;m</span>{" "}
            <span className="inline-block bg-cobalt px-2 text-primary-foreground shadow-[6px_6px_0_var(--ink)]">
              {profile.shortName}.
            </span>
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
              className="inline-flex items-center gap-2 border-2 border-foreground bg-cobalt px-6 py-3 text-sm font-bold text-primary-foreground shadow-[6px_6px_0_var(--ink)] transition-transform duration-200 hover:translate-x-1.5 hover:translate-y-1.5 hover:shadow-none"
            >
              Contact Me <ArrowRight className="size-4" />
            </a>
            <a
              href="/Muhamad_Habibi_Azmi_Fullstack_Engineer_CV.pdf"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 border-b-2 border-foreground pb-1 text-sm font-bold text-foreground transition-colors duration-200 hover:bg-chartreuse"
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
                  i > 0 ? "border-l-2 border-foreground pl-6" : ""
                }`}
              >
                <span className="font-mono text-2xl font-black tracking-tight text-cobalt sm:text-3xl">
                  <CountUp from={0} to={statNumber(s.value)} duration={2} />
                  {statSuffix(s.value)}
                </span>
                <p className="mt-1 text-xs text-muted-foreground">{s.label}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Portrait — 40%, floating with glow */}
        <div className="relative hidden lg:col-span-5 lg:block" data-animate>
          <Image
            src="/me.png"
            alt={profile.name}
            width={400}
            height={500}
            sizes="(max-width: 1024px) 50vw, 25vw"
            className="absolute top-[-50] mx-auto h-auto w-3/4 border-2 border-foreground bg-coral p-3 shadow-[10px_10px_0_var(--ink)]"
            priority
          />
        </div>
      </div>
    </section>
  )
}

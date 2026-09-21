"use client"

import Image from "next/image"
import { ArrowRight, Download } from "lucide-react"
import { profile } from "@/lib/portfolio"

export function Hero() {
  return (
    <section id="top" className="relative overflow-hidden px-5 pt-20">
      <div className="mx-auto grid max-w-6xl grid-cols-1 items-center gap-12 py-12 lg:grid-cols-12 lg:gap-16 lg:py-20">
        <div className="lg:col-span-7">
          <p
            data-animate
            className="font-mono text-xs font-bold tracking-[0.16em] text-coral uppercase"
          >
            {profile.name} · {profile.location}
          </p>

          {profile.available ? (
            <p
              data-animate
              className="mt-5 inline-flex items-center gap-2 rounded-lg border-2 border-foreground bg-chartreuse px-3.5 py-1.5 text-xs font-bold text-foreground shadow-[3px_3px_0_var(--ink)]"
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
            className="mt-8 max-w-3xl text-5xl leading-[0.96] font-black tracking-[-0.06em] sm:text-6xl lg:text-8xl"
          >
            I build useful <span className="text-cobalt">systems</span> for real
            people.
          </h1>

          <p
            data-animate
            className="mt-7 max-w-[52ch] text-base leading-[1.7] text-muted-foreground sm:text-lg"
          >
            <span className="font-medium text-foreground">{profile.role}</span>{" "}
            I design and ship identity, SaaS, and AI-enabled products that hold
            up in production.
          </p>

          <div data-animate className="mt-8 flex flex-wrap items-center gap-4">
            <a
              href="#projects"
              className="inline-flex items-center gap-2 rounded-lg border-2 border-foreground bg-cobalt px-6 py-3 text-sm font-bold text-primary-foreground shadow-[4px_4px_0_var(--ink)] transition-transform duration-200 hover:translate-x-1 hover:translate-y-1 hover:shadow-none"
            >
              Explore my work <ArrowRight className="size-4" />
            </a>
            <a
              href="/Muhamad_Habibi_Azmi_Fullstack_Engineer_CV.pdf"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-lg border-2 border-foreground bg-card px-6 py-3 text-sm font-bold text-foreground shadow-[3px_3px_0_var(--ink)] transition-transform hover:translate-x-1 hover:translate-y-1 hover:shadow-none"
            >
              Download CV <Download className="size-4" />
            </a>
          </div>
          <p
            data-animate
            className="mt-6 font-mono text-xs tracking-wide text-muted-foreground"
          >
            IAM · SaaS · AI · 7+ years shipping for telecom, EU, and healthcare
          </p>
        </div>

        <div className="relative lg:col-span-5" data-animate>
          <figure className="mx-auto max-w-sm overflow-hidden rounded-xl border-2 border-foreground bg-coral p-3 shadow-[6px_6px_0_var(--ink)]">
            <Image
              src="/me.webp"
              alt={profile.name}
              width={400}
              height={500}
              sizes="(max-width: 1024px) 80vw, 25vw"
              className="aspect-[4/5] h-auto w-full rounded-lg object-cover"
              priority
            />
            <figcaption className="flex items-center justify-between gap-3 pt-3 font-mono text-[0.65rem] font-bold tracking-wider text-foreground uppercase">
              <span>Based in Bandung</span>
              <span>Open to the right team</span>
            </figcaption>
          </figure>
        </div>
      </div>
    </section>
  )
}

"use client"

import Image from "next/image"
import { ArrowRight, Download } from "lucide-react"
import { profile } from "@/lib/portfolio"

export function Hero() {
  return (
    <section id="top" className="relative overflow-hidden px-5 pt-20">
      <div className="mx-auto grid max-w-6xl grid-cols-1 items-center gap-12 py-14 lg:grid-cols-12 lg:gap-16 lg:py-20">
        <div className="lg:col-span-7">
          {profile.available ? (
            <p
              data-animate
              className="inline-flex items-center gap-2 border-2 border-foreground bg-chartreuse px-3.5 py-1.5 text-xs font-bold text-foreground shadow-[3px_3px_0_var(--ink)]"
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
            className="mt-8 text-4xl leading-[1.05] font-black tracking-tight sm:text-5xl lg:text-6xl"
          >
            <span className="text-foreground">
              I build systems that scale to
            </span>{" "}
            <span className="inline-block bg-cobalt px-2 text-primary-foreground shadow-[4px_4px_0_var(--ink)]">
              40,000+ users.
            </span>
          </h1>

          <p
            data-animate
            className="mt-6 max-w-[48ch] text-base leading-[1.7] text-muted-foreground sm:text-lg"
          >
            <span className="font-medium text-foreground">
              {profile.role}
            </span>{" "}
            — IAM/SSO, SaaS, AI pipelines. 7+ years shipping for Telkom Group,
            EU SaaS, and healthcare. Based in {profile.location}.
          </p>

          <div data-animate className="mt-8 flex flex-wrap items-center gap-4">
            <a
              href={`mailto:${profile.email}`}
              className="inline-flex items-center gap-2 border-2 border-foreground bg-cobalt px-6 py-3 text-sm font-bold text-primary-foreground shadow-[4px_4px_0_var(--ink)] transition-transform duration-200 hover:translate-x-1 hover:translate-y-1 hover:shadow-none"
            >
              Email me <ArrowRight className="size-4" />
            </a>
            <a
              href="/Muhamad_Habibi_Azmi_Fullstack_Engineer_CV.pdf"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 border-2 border-foreground bg-card px-6 py-3 text-sm font-bold text-foreground shadow-[3px_3px_0_var(--ink)] transition-transform hover:translate-x-1 hover:translate-y-1 hover:shadow-none"
            >
              Download CV <Download className="size-4" />
            </a>
          </div>
          <p
            data-animate
            className="mt-6 font-mono text-xs tracking-wide text-muted-foreground"
          >
            Trusted by Telkom Group · EU clients · 40k+ users in production
          </p>
        </div>

        <div className="relative hidden lg:col-span-5 lg:block" data-animate>
          <Image
            src="/me.webp"
            alt={profile.name}
            width={400}
            height={500}
            sizes="(max-width: 1024px) 50vw, 25vw"
            className="mx-auto h-auto w-3/4 border-2 border-foreground bg-coral p-3 shadow-[6px_6px_0_var(--ink)]"
            priority
          />
        </div>
      </div>
    </section>
  )
}

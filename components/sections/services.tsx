import { Shield, Globe, Sparkles } from "lucide-react"
import { SectionHeader } from "@/components/section-header"
import { services } from "@/lib/portfolio"

const icons = { Shield, Globe, Sparkles } as const

export function Services() {
  return (
    <section id="services" className="mx-auto max-w-6xl px-5 py-16 sm:py-24">
      <SectionHeader
        eyebrow="01 / Services"
        title="How I can help."
        description="Outcome-focused engineering for teams that need to ship and scale — from IAM at 40k users to SaaS and AI automation."
      />
      <div className="mt-10 grid gap-4 md:grid-cols-3" data-animate>
        {services.map((s) => {
          const Icon = icons[s.icon]
          return (
            <article
              key={s.title}
              className="flex flex-col border-2 border-foreground bg-card p-6 shadow-[4px_4px_0_var(--ink)] transition-transform hover:-translate-y-1"
            >
              <span className="grid size-10 place-items-center border-2 border-foreground bg-chartreuse text-foreground">
                <Icon className="size-5" />
              </span>
              <h3 className="mt-4 text-base font-black tracking-tight">
                {s.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                {s.description}
              </p>
              <div className="mt-4 flex flex-wrap gap-1.5">
                {s.tags.map((t) => (
                  <span
                    key={t}
                    className="border border-foreground bg-muted px-2 py-1 font-mono text-[0.65rem] font-bold tracking-wide"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </article>
          )
        })}
      </div>
    </section>
  )
}

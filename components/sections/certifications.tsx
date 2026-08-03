import { SectionHeader } from "@/components/section-header"
import { Card } from "@/components/ui/card"
import { ArrowUpRight } from "lucide-react"
import { certifications } from "@/lib/portfolio"

export function Certifications() {
  return (
    <section
      id="certifications"
      className="mx-auto max-w-5xl px-5 py-16 sm:py-20"
    >
      <SectionHeader
        eyebrow="04 / Certifications"
        title="Continuously sharpening the tools."
        description="A few credentials and courses I've earned along the way."
      />

      <div className="mt-12 grid gap-3 sm:grid-cols-2">
        {certifications.map((c) => (
          <Card
            key={c.name}
            data-animate
            className="bg-card transition-transform hover:-translate-y-1"
          >
            <a
              href={c.href}
              target="_blank"
              rel="noreferrer"
              className="flex items-center justify-between gap-4 px-5 py-4"
            >
              <div>
                <p className="text-sm leading-snug font-bold">{c.name}</p>
                <p className="mt-0.5 font-mono text-xs text-muted-foreground">
                  {c.issuer}
                  {c.year ? ` · ${c.year}` : ""}
                </p>
              </div>
              <ArrowUpRight className="size-4 shrink-0 text-cobalt" />
            </a>
          </Card>
        ))}
      </div>
    </section>
  )
}

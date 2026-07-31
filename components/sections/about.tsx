import { SectionHeader } from "@/components/section-header"
import { Card, CardContent } from "@/components/ui/card"
import { profile } from "@/lib/portfolio"

export function About() {
  return (
    <section id="about" className="mx-auto max-w-5xl px-5 py-16 sm:py-20">
      <SectionHeader
        eyebrow="01 / About"
        title="Engineering software that holds up at scale."
        description={profile.bio}
      />

      <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4" data-animate>
        {profile.stats.map((s) => (
          <Card key={s.label} className="border-border/60 bg-card/40">
            <CardContent className="px-5">
              <p className="font-mono text-3xl font-semibold tracking-tight text-brand">
                {s.value}
              </p>
              <p className="mt-1 text-sm text-muted-foreground">{s.label}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div
        className="mt-12 max-w-3xl space-y-4 text-sm leading-relaxed text-muted-foreground sm:text-base"
        data-animate
      >
        <p>
          I&apos;m a Full Stack Software Engineer based in {profile.location},
          currently building identity, access management, and AI-powered document
          platforms at Telkom Indonesia. My work spans scalable backend
          services, modern web apps, and LLM-powered automation across
          telecommunications, healthcare, and HR technology.
        </p>
        <p>
          I care about software quality, security, system integration, and the
          kind of design decisions that show up as business impact — not just
          clean diffs.
        </p>
      </div>
    </section>
  )
}
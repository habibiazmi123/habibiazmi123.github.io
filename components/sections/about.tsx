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

      <div
        className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4"
        data-animate
      >
        {profile.stats.map((s) => (
          <Card
            key={s.label}
            className="bg-card odd:bg-cobalt odd:text-primary-foreground even:bg-chartreuse even:text-foreground"
          >
            <CardContent className="px-5">
              <p className="font-mono text-3xl font-black tracking-tight text-inherit">
                {s.value}
              </p>
              <p className="mt-1 text-sm font-bold text-inherit">{s.label}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div
        className="mt-12 max-w-3xl border-2 border-foreground bg-card p-6 text-sm leading-relaxed text-muted-foreground shadow-[6px_6px_0_var(--ink)] sm:p-8 sm:text-base"
        data-animate
      >
        <p>
          I&apos;m a Full Stack Software Engineer based in {profile.location},
          currently building identity, access management, and AI-powered
          document platforms at Telkom Indonesia. My work spans scalable backend
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

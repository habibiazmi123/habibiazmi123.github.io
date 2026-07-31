import { ArrowUpRight, Mail, MapPin } from "lucide-react"
import { profile } from "@/lib/portfolio"

export function Contact() {
  return (
    <section
      id="contact"
      className="relative mx-auto max-w-5xl px-5 py-24 sm:py-28"
    >
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute left-1/2 top-1/2 h-72 w-[40rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-brand/15 blur-[100px]" />
      </div>

      <div className="text-center" data-animate>
        <p className="font-mono text-xs uppercase tracking-[0.2em] text-brand">
          05 / Contact
        </p>
        <h2 className="mt-4 text-3xl font-semibold tracking-tight sm:text-5xl">
          Let&apos;s build something.
        </h2>
        <p className="mx-auto mt-5 max-w-xl text-base text-muted-foreground">
          I&apos;m open to roles, collaborations, and interesting problems.
          The fastest way to reach me is email.
        </p>
      </div>

      <div className="mt-10 flex flex-col items-center gap-4" data-animate>
        <a
          href={`mailto:${profile.email}`}
          className="inline-flex items-center gap-2 rounded-md bg-brand px-6 py-3 text-sm font-medium text-brand-foreground transition-opacity hover:opacity-90"
        >
          <Mail className="size-4" /> {profile.email}
        </a>
        <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm text-muted-foreground">
          <span className="inline-flex items-center gap-1.5">
            <MapPin className="size-3.5" /> {profile.location}
          </span>
          {profile.socials.map((s) => (
            <a
              key={s.label}
              href={s.href}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1 transition-colors hover:text-foreground"
            >
              {s.label} <ArrowUpRight className="size-3.5" />
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}
import { ArrowUpRight, Mail, MapPin, MessageCircle } from "lucide-react"
import { profile } from "@/lib/portfolio"

export function Contact() {
  return (
    <section
      id="contact"
      className="relative mx-auto max-w-5xl px-5 py-16 sm:py-20"
    >
      <div className="border-2 border-foreground bg-cobalt p-6 text-primary-foreground shadow-[8px_8px_0_var(--ink)] sm:p-10">
        <div className="text-center" data-animate>
          <p className="font-mono text-xs font-bold tracking-[0.2em] text-primary-foreground uppercase">
            06 / Contact
          </p>
          <h2 className="mt-4 text-3xl font-black tracking-tight sm:text-5xl">
            Let&apos;s build something.
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-base text-primary-foreground/85">
            I&apos;m open to roles, collaborations, and interesting problems.
            The fastest way to reach me is whatsapp.
          </p>
        </div>

        <div className="mt-10 flex flex-col items-center gap-4" data-animate>
          <div className="flex flex-wrap justify-center gap-3">
            <a
              href={`mailto:${profile.email}`}
              className="inline-flex items-center gap-2 border-2 border-foreground bg-chartreuse px-6 py-3 text-sm font-bold text-foreground shadow-[4px_4px_0_var(--ink)] transition-transform hover:translate-x-1 hover:translate-y-1 hover:shadow-none"
            >
              <Mail className="size-4" /> {profile.email}
            </a>
            <a
              href={`https://wa.me/${profile.whatsapp.replace(/\D/g, "")}`}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 border-2 border-foreground bg-chartreuse px-6 py-3 text-sm font-bold text-foreground shadow-[4px_4px_0_var(--ink)] transition-transform hover:translate-x-1 hover:translate-y-1 hover:shadow-none"
            >
              <MessageCircle className="size-4" /> {profile.whatsapp}
            </a>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm text-primary-foreground/85">
            <span className="inline-flex items-center gap-1.5">
              <MapPin className="size-3.5" /> {profile.location}
            </span>
            {profile.socials.map((s) => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1 border-b-2 border-primary-foreground transition-colors hover:bg-chartreuse hover:text-foreground"
              >
                {s.label} <ArrowUpRight className="size-3.5" />
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

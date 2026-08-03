import { ArrowUpRight } from "lucide-react"
import { InstagramEmbeds } from "@/components/instagram-embeds"
import { SectionHeader } from "@/components/section-header"
import { instagramPosts, profile } from "@/lib/portfolio"

export function Hobby() {
  const instagram = profile.socials.find(
    (social) => social.label === "Instagram"
  )

  return (
    <section id="hobby" className="mx-auto max-w-5xl px-5 py-16 sm:py-20">
      <SectionHeader
        eyebrow="05 / Hobby"
        title="Beyond the Code."
        description="Outside of coding, I enjoy creating content for Instagram, exploring new places, and sharing ideas through visual storytelling."
      />

      <div className="mt-12" data-animate>
        <InstagramEmbeds permalinks={instagramPosts} />
      </div>

      {instagram ? (
        <div className="mt-10" data-animate>
          <a
            href={instagram.href}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 border-2 border-foreground bg-chartreuse px-5 py-3 text-sm font-bold text-foreground shadow-[4px_4px_0_var(--ink)] transition-transform hover:translate-x-1 hover:translate-y-1 hover:shadow-none focus-visible:ring-3 focus-visible:ring-cobalt/50"
          >
            View @{instagram.href.split("/").filter(Boolean).pop()} on Instagram
            <ArrowUpRight className="size-4" aria-hidden="true" />
          </a>
        </div>
      ) : null}
    </section>
  )
}

import { GsapProvider } from "@/components/gsap-provider"
import { SiteNav } from "@/components/site-nav"
import { SiteFooter } from "@/components/site-footer"
import { Hero } from "@/components/sections/hero"
import { Technologies } from "@/components/sections/technologies"
import { About } from "@/components/sections/about"
import { Experience } from "@/components/sections/experience"
import { Projects } from "@/components/sections/projects"
import { Certifications } from "@/components/sections/certifications"
import { Contact } from "@/components/sections/contact"
import { profile } from "@/lib/portfolio"

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://habibiazmi.com"

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: profile.name,
  jobTitle: profile.role,
  url: baseUrl,
  sameAs: profile.socials.map((s) => s.href),
  address: {
    "@type": "PostalAddress",
    addressLocality: "Bandung",
    addressRegion: "West Java",
    addressCountry: "Indonesia",
  },
  email: `mailto:${profile.email}`,
  description: profile.bio,
}

export default function Page() {
  return (
    <GsapProvider>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <SiteNav />
      <main>
        <Hero />
        <Technologies />
        <About />
        <Experience />
        <Projects />
        <Certifications />
        <Contact />
      </main>
      <SiteFooter />
    </GsapProvider>
  )
}

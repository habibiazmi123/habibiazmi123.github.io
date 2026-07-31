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

export default function Page() {
  return (
    <GsapProvider>
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
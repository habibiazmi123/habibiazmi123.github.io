"use client"

import { useEffect } from "react"

declare global {
  interface Window {
    instgrm?: {
      Embeds?: {
        process: () => void
      }
    }
  }
}

const EMBED_SCRIPT = "https://www.instagram.com/embed.js"

export function InstagramEmbeds({
  permalinks,
}: {
  permalinks: readonly string[]
}) {
  useEffect(() => {
    const processEmbeds = () => window.instgrm?.Embeds?.process()
    const existingScript = document.querySelector<HTMLScriptElement>(
      `script[src="${EMBED_SCRIPT}"]`
    )

    if (existingScript) {
      if (window.instgrm) processEmbeds()
      else existingScript.addEventListener("load", processEmbeds)

      return () => existingScript.removeEventListener("load", processEmbeds)
    }

    const script = document.createElement("script")
    script.src = EMBED_SCRIPT
    script.async = true
    script.addEventListener("load", processEmbeds)
    document.body.appendChild(script)

    return () => script.removeEventListener("load", processEmbeds)
  }, [permalinks])

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {permalinks.map((permalink) => (
        <div
          key={permalink}
          className="min-w-0 overflow-hidden border-2 border-foreground bg-card shadow-[6px_6px_0_var(--ink)]"
        >
          <blockquote
            className="instagram-media !m-0 !w-full !max-w-none"
            data-instgrm-permalink={permalink}
            data-instgrm-version="14"
          >
            <a href={permalink} target="_blank" rel="noreferrer">
              View this post on Instagram
            </a>
          </blockquote>
        </div>
      ))}
    </div>
  )
}

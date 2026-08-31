"use client";

import { useEffect, useRef, useState } from "react";

declare global {
  interface Window {
    instgrm?: { Embeds?: { process: () => void } };
  }
}

const EMBED_SCRIPT = "https://www.instagram.com/embed.js";

export function InstagramEmbeds({
  permalinks,
}: {
  permalinks: readonly string[];
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  // ponytail: only load IG script when section scrolls into view
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          obs.disconnect();
        }
      },
      { rootMargin: "400px" },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    if (!visible) return;
    const processEmbeds = () => window.instgrm?.Embeds?.process();
    const existingScript = document.querySelector<HTMLScriptElement>(
      `script[src="${EMBED_SCRIPT}"]`,
    );
    if (existingScript) {
      if (window.instgrm) processEmbeds();
      else existingScript.addEventListener("load", processEmbeds);
      return () => existingScript.removeEventListener("load", processEmbeds);
    }
    const script = document.createElement("script");
    script.src = EMBED_SCRIPT;
    script.async = true;
    script.addEventListener("load", processEmbeds);
    document.body.appendChild(script);
    return () => script.removeEventListener("load", processEmbeds);
  }, [visible, permalinks]);

  return (
    <div ref={containerRef} className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {!visible
        ? permalinks.map((permalink) => (
            <div
              key={permalink}
              className="grid min-h-[320px] place-items-center border-2 border-foreground bg-card shadow-[6px_6px_0_var(--ink)]"
            >
              <a
                href={permalink}
                target="_blank"
                rel="noreferrer"
                className="text-sm font-bold text-cobalt underline"
              >
                View on Instagram
              </a>
            </div>
          ))
        : permalinks.map((permalink) => (
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
  );
}

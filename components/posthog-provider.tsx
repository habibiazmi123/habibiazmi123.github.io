"use client"

import posthog from "posthog-js"
import { PostHogProvider as PostHogProviderImpl } from "@posthog/react"
import { useEffect } from "react"

export function PostHogProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    const key = process.env.NEXT_PUBLIC_POSTHOG_KEY
    if (!key) return

    posthog.init(key, {
      api_host: process.env.NEXT_PUBLIC_POSTHOG_HOST || "https://us.i.posthog.com",
      person_profiles: "identified_only",
    })
  }, [])

  return <PostHogProviderImpl client={posthog}>{children}</PostHogProviderImpl>
}

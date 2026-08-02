"use client"

import posthog from "posthog-js"
import { PostHogProvider as PostHogProviderImpl } from "@posthog/react"

if (typeof window !== "undefined") {
  posthog.init(process.env.NEXT_PUBLIC_POSTHOG_KEY!, {
    api_host: process.env.NEXT_PUBLIC_POSTHOG_HOST || "https://us.i.posthog.com",
    person_profiles: "identified_only",
  })
}

export function PostHogProvider({ children }: { children: React.ReactNode }) {
  return <PostHogProviderImpl client={posthog}>{children}</PostHogProviderImpl>
}

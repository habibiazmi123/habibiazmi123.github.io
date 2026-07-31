import { ImageResponse } from "next/og"
import { profile } from "@/lib/portfolio"

export const runtime = "edge"
export const alt = `${profile.name} — ${profile.role}`
export const size = { width: 1200, height: 630 }
export const contentType = "image/png"

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(135deg, #0f172a 0%, #1e293b 100%)",
          color: "#f8fafc",
          padding: 64,
          textAlign: "center",
        }}
      >
        <div style={{ fontSize: 72, fontWeight: 700, letterSpacing: "-0.02em" }}>
          {profile.name}
        </div>
        <div style={{ fontSize: 36, color: "#94a3b8", marginTop: 16 }}>
          {profile.role}
        </div>
        <div
          style={{
            fontSize: 26,
            color: "#64748b",
            marginTop: 40,
            maxWidth: 900,
            lineHeight: 1.4,
          }}
        >
          {profile.tagline}
        </div>
      </div>
    ),
    {
      ...size,
    }
  )
}

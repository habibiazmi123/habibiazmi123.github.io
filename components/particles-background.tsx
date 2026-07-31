"use client"

import dynamic from "next/dynamic"

const Particles = dynamic(
  () => import("@/components/Particles").then((m) => m.default),
  { ssr: false }
)

export function ParticlesBackground() {
  return (
    <Particles
      particleCount={200}
      particleSpread={10}
      speed={0.1}
      alphaParticles
      particleColors={["#34d399", "#60a5fa", "#c084fc"]}
      className="opacity-60"
    />
  )
}

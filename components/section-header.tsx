import { cn } from "@/lib/utils"

export function SectionHeader({
  eyebrow,
  title,
  description,
  className,
}: {
  eyebrow: string
  title: string
  description?: string
  className?: string
}) {
  return (
    <div
      className={cn("max-w-2xl border-l-[3px] border-cobalt pl-5", className)}
      data-animate
    >
      <p className="font-mono text-xs font-bold tracking-[0.2em] text-cobalt uppercase">
        {eyebrow}
      </p>
      <h2 className="mt-3 text-2xl font-black tracking-tight sm:text-3xl">
        {title}
      </h2>
      {description ? (
        <p className="mt-4 text-sm leading-relaxed text-muted-foreground sm:text-base">
          {description}
        </p>
      ) : null}
    </div>
  )
}

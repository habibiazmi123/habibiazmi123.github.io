import { allTech } from "@/lib/portfolio"

function Badge({ item }: { item: string }) {
  return (
    <li className="inline-flex shrink-0 items-center border-2 border-foreground bg-card px-3 py-1.5 text-xs font-bold text-foreground shadow-[3px_3px_0_var(--ink)]">
      {item}
    </li>
  )
}

export function Technologies() {
  const mid = Math.ceil(allTech.length / 2)
  const row1 = allTech.slice(0, mid)
  const row2 = allTech.slice(mid)
  // duplicate for seamless loop
  const r1 = [...row1, ...row1]
  const r2 = [...row2, ...row2]

  return (
    <section
      id="technologies"
      className="mx-auto max-w-6xl px-5 py-16 sm:py-24"
    >
      <div className="mx-auto max-w-2xl text-center" data-animate>
        <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">
          Tech Stack
        </h2>
      </div>

      <div className="marquee-mask mt-6 flex flex-col gap-4 overflow-hidden">
        <div className="marquee-row">
          <ul className="animate-marquee-left flex w-max gap-3 pr-3">
            {r1.map((item, i) => (
              <Badge key={`${item}-${i}`} item={item} />
            ))}
          </ul>
        </div>
        <div className="marquee-row">
          <ul className="animate-marquee-right flex w-max gap-3 pr-3">
            {r2.map((item, i) => (
              <Badge key={`${item}-${i}`} item={item} />
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}

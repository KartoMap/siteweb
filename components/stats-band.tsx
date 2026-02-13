"use client"

import { useRef, useEffect, useState } from "react"

const stats = [
  { value: "500+", label: "Organisations" },
  { value: "2M+", label: "Points de donnees" },
  { value: "50+", label: "Connecteurs API" },
  { value: "99.9%", label: "Disponibilite" },
]

function AnimatedNumber({ value, visible }: { value: string; visible: boolean }) {
  const isNumeric = /^\d+/.test(value)
  const numericPart = parseInt(value.replace(/\D/g, ""), 10)
  const suffix = value.replace(/[\d]/g, "")
  const [current, setCurrent] = useState(0)

  useEffect(() => {
    if (!visible || !isNumeric) return
    let start = 0
    const duration = 1500
    const startTime = performance.now()
    const animate = (time: number) => {
      const elapsed = time - startTime
      const progress = Math.min(elapsed / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      setCurrent(Math.floor(eased * numericPart))
      if (progress < 1) requestAnimationFrame(animate)
    }
    requestAnimationFrame(animate)
  }, [visible, isNumeric, numericPart])

  if (!isNumeric) return <>{value}</>
  return (
    <>
      {visible ? current : 0}
      {suffix}
    </>
  )
}

export function StatsBand() {
  const ref = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setVisible(true)
      },
      { threshold: 0.3 }
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [])

  return (
    <section ref={ref} className="relative border-y border-border bg-card overflow-hidden">
      {/* Subtle top glow connecting from hero */}
      <div className="pointer-events-none absolute inset-x-0 -top-1 h-px bg-gradient-to-r from-transparent via-[#0d9488]/40 to-transparent" />
      <div className="mx-auto grid max-w-7xl grid-cols-2 gap-6 px-6 py-14 md:grid-cols-4">
        {stats.map((stat, i) => (
          <div
            key={stat.label}
            className={`text-center transition-all duration-700 ${
              visible ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
            }`}
            style={{ transitionDelay: `${i * 100}ms` }}
          >
            <div className="font-heading text-3xl font-bold text-primary lg:text-4xl">
              <AnimatedNumber value={stat.value} visible={visible} />
            </div>
            <div className="mt-1 text-sm text-muted-foreground">{stat.label}</div>
          </div>
        ))}
      </div>
    </section>
  )
}

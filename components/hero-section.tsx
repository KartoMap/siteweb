"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import dynamic from "next/dynamic"
import { Button } from "@/components/ui/button"
import { ArrowRight, Play, ChevronDown, Layers, Database, Users } from "lucide-react"

const Map3DScene = dynamic(
  () => import("@/components/map-3d-scene").then((mod) => mod.Map3DScene),
  { ssr: false }
)

function FeaturePill({ icon: Icon, text }: { icon: React.ElementType; text: string }) {
  return (
    <div className="flex items-center gap-1.5 rounded-full border border-[#0d9488]/20 bg-[#0d9488]/5 px-3 py-1.5 text-xs text-[#94a3b8] backdrop-blur-sm transition-colors hover:border-[#0d9488]/40 hover:text-[#2dd4bf]">
      <Icon className="h-3 w-3 text-[#0d9488]" />
      {text}
    </div>
  )
}

export function HeroSection() {
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    const t = setTimeout(() => setLoaded(true), 200)
    return () => clearTimeout(t)
  }, [])

  return (
    <section className="relative min-h-screen overflow-hidden bg-[#060e1b]">
      {/* 3D Canvas background - full screen interactive */}
      <Map3DScene />

      {/* Radial glow under content */}
      <div className="pointer-events-none absolute inset-0 z-[1]">
        <div className="absolute left-1/2 top-1/3 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#0d9488]/8 blur-[120px]" />
        <div className="absolute right-1/4 top-1/2 h-[300px] w-[300px] rounded-full bg-[#3b82f6]/5 blur-[100px]" />
        <div className="absolute left-1/4 bottom-1/3 h-[250px] w-[250px] rounded-full bg-[#e97624]/5 blur-[80px]" />
      </div>

      {/* Top gradient for navbar readability */}
      <div className="pointer-events-none absolute inset-x-0 top-0 z-[2] h-32 bg-gradient-to-b from-[#060e1b]/80 to-transparent" />
      {/* Bottom gradient for smooth section transition */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 z-[2] h-48 bg-gradient-to-t from-[#060e1b] to-transparent" />

      {/* Interactive hint */}
      <div
        className={`absolute right-6 top-24 z-10 hidden lg:flex items-center gap-2 rounded-full border border-[#0d9488]/20 bg-[#0d9488]/5 px-4 py-2 backdrop-blur-sm transition-all duration-1000 delay-[1500ms] ${
          loaded ? "opacity-100 translate-x-0" : "opacity-0 translate-x-4"
        }`}
      >
        <div className="relative flex h-5 w-5 items-center justify-center">
          <div className="absolute h-5 w-5 rounded-full border border-[#0d9488]/40 animate-ping" />
          <div className="h-2 w-2 rounded-full bg-[#0d9488]" />
        </div>
        <span className="text-xs text-[#94a3b8]">Cliquez sur la carte 3D</span>
      </div>

      {/* Content overlay */}
      <div className="relative z-10 mx-auto flex min-h-screen max-w-7xl flex-col items-center justify-center px-6 py-24 lg:flex-row lg:items-center lg:justify-between lg:gap-12">
        {/* Left side - Text content */}
        <div
          className={`flex max-w-xl flex-col items-center text-center lg:items-start lg:text-left transition-all duration-1000 ${
            loaded ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
          }`}
        >
          {/* Badge */}
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-[#0d9488]/30 bg-[#0d9488]/8 px-4 py-2 backdrop-blur-sm">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#0d9488] opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-[#2dd4bf]" />
            </span>
            <span className="text-xs font-medium tracking-wide text-[#2dd4bf]">
              Plateforme cartographique no-code
            </span>
          </div>

          {/* Logo */}
          <div className="mb-5">
            <Image
              src="/images/logo.png"
              alt="KartoMap"
              width={72}
              height={72}
              className="drop-shadow-[0_0_24px_rgba(13,148,136,0.5)]"
              priority
            />
          </div>

          {/* Title */}
          <h1 className="font-heading text-4xl font-bold leading-[1.1] tracking-tight text-white sm:text-5xl lg:text-6xl text-balance">
            Visualisez vos donnees{" "}
            <span className="bg-gradient-to-r from-[#0d9488] via-[#2dd4bf] to-[#0d9488] bg-clip-text text-transparent">
              sur une carte
            </span>{" "}
            interactive
          </h1>

          <p className="mt-5 max-w-md text-base leading-relaxed text-[#94a3b8] lg:text-lg">
            Connectez vos applications, collectez des donnees et visualisez-les
            instantanement. Sans competence technique ni cartographique.
          </p>

          {/* Feature pills */}
          <div
            className={`mt-6 flex flex-wrap gap-2 justify-center lg:justify-start transition-all duration-1000 delay-200 ${
              loaded ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
            }`}
          >
            <FeaturePill icon={Layers} text="Couches multiples" />
            <FeaturePill icon={Database} text="APIs ouvertes" />
            <FeaturePill icon={Users} text="Collaboratif" />
          </div>

          {/* CTA buttons */}
          <div
            className={`mt-8 flex flex-col gap-3 sm:flex-row transition-all duration-1000 delay-300 ${
              loaded ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
            }`}
          >
            <Button
              size="lg"
              className="bg-[#0d9488] text-white hover:bg-[#0d9488]/90 shadow-lg shadow-[#0d9488]/25 text-sm px-7 py-5 group"
            >
              Commencer gratuitement
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-[#1e293b] bg-white/5 text-white hover:bg-white/10 backdrop-blur-sm text-sm px-7 py-5"
            >
              <Play className="mr-2 h-4 w-4" />
              Voir la demo
            </Button>
          </div>

          {/* Trust bar */}
          <div
            className={`mt-10 flex items-center gap-4 transition-all duration-1000 delay-500 ${
              loaded ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
            }`}
          >
            <div className="flex -space-x-2.5">
              {["M", "S", "A", "L", "P"].map((letter, i) => (
                <div
                  key={i}
                  className="flex h-8 w-8 items-center justify-center rounded-full border-2 border-[#060e1b] text-[10px] font-medium"
                  style={{
                    backgroundColor: ["#0d9488", "#e97624", "#3b82f6", "#0d9488", "#e97624"][i],
                    color: "white",
                  }}
                >
                  {letter}
                </div>
              ))}
            </div>
            <div className="text-sm text-[#64748b]">
              <span className="font-semibold text-white">500+</span> organisations
            </div>
          </div>
        </div>

        {/* Right side - empty space for 3D scene to show through */}
        <div className="hidden lg:block lg:w-1/2" aria-hidden />
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-6 left-1/2 z-10 -translate-x-1/2 flex flex-col items-center gap-1.5">
        <span className="text-[10px] uppercase tracking-widest text-[#475569]">Explorer</span>
        <ChevronDown className="h-4 w-4 text-[#0d9488] animate-bounce" />
      </div>
    </section>
  )
}

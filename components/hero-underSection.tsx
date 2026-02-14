"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { ArrowRight, Play, Layers, Database, Users, Zap } from "lucide-react"
import { useI18n } from "@/lib/i18n"

function FeaturePill({ icon: Icon, text }: { icon: React.ElementType; text: string }) {
  return (
      <div className="flex items-center gap-2 rounded-full border border-[#0d9488]/20 bg-[#0d9488]/5 px-4 py-2 text-xs text-[#94a3b8] backdrop-blur-sm transition-all hover:border-[#0d9488]/40 hover:bg-[#0d9488]/10 hover:text-[#2dd4bf]">
        <Icon className="h-3.5 w-3.5 text-[#0d9488]" />
        <span className="font-medium">{text}</span>
      </div>
  )
}

export function HeroSection() {
  const [loaded, setLoaded] = useState(false)
  const { t } = useI18n()

  useEffect(() => {
    const timer = setTimeout(() => setLoaded(true), 200)
    return () => clearTimeout(timer)
  }, [])

  return (
      <section className="relative min-h-screen overflow-hidden bg-[#060e1b]">

        {/* Background gradients */}
        <div className="pointer-events-none absolute inset-0 z-[1]">
          <div className="absolute left-1/2 top-1/3 h-[700px] w-[700px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#0d9488]/10 blur-[140px]" />
          <div className="absolute right-1/4 top-1/2 h-[400px] w-[400px] rounded-full bg-[#3b82f6]/6 blur-[120px]" />
          <div className="absolute left-1/4 bottom-1/3 h-[300px] w-[300px] rounded-full bg-[#e97624]/6 blur-[100px]" />
        </div>

        {/* Top and bottom fade overlays */}
        <div className="pointer-events-none absolute inset-x-0 top-0 z-[2] h-40 bg-gradient-to-b from-[#060e1b]/90 to-transparent" />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 z-[2] h-56 bg-gradient-to-t from-[#060e1b] to-transparent" />

        {/* Interactive hint */}
        <div
            className={`absolute right-8 top-28 z-10 hidden lg:flex items-center gap-2.5 rounded-full border border-[#0d9488]/25 bg-[#0d9488]/8 px-5 py-2.5 backdrop-blur-md transition-all duration-1000 delay-[1500ms] ${
                loaded ? "opacity-100 translate-x-0" : "opacity-0 translate-x-6"
            }`}
        >
          <div className="relative flex h-6 w-6 items-center justify-center">
            <div className="absolute h-6 w-6 rounded-full border-2 border-[#0d9488]/50 animate-ping" />
            <div className="h-2.5 w-2.5 rounded-full bg-[#0d9488] shadow-lg shadow-[#0d9488]/50" />
          </div>
          <span className="text-xs font-medium text-[#94a3b8]">Cliquez sur les icônes pour découvrir les fonctionnalités</span>
        </div>

        {/* Main content */}
        <div className="relative z-10 mx-auto flex min-h-screen max-w-7xl flex-col items-center justify-center px-6 py-24 lg:flex-row lg:items-center lg:justify-between lg:gap-16">
          <div
              className={`flex max-w-xl flex-col items-center text-center lg:items-start lg:text-left transition-all duration-1000 ${
                  loaded ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
              }`}
          >
            {/* Status badge */}
            <div className="mb-6 inline-flex items-center gap-2.5 rounded-full border border-[#0d9488]/30 bg-gradient-to-r from-[#0d9488]/10 to-[#0d9488]/5 px-5 py-2.5 backdrop-blur-sm shadow-lg shadow-[#0d9488]/5">
            <span className="relative flex h-2.5 w-2.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#0d9488] opacity-75" />
              <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-[#2dd4bf] shadow-lg shadow-[#2dd4bf]/50" />
            </span>
              <span className="text-xs font-bold tracking-wide text-[#2dd4bf] uppercase">
              Plateforme cartographique nouvelle génération
            </span>
            </div>

            {/* Logo */}
            <div className="mb-6">
              <Image
                  src="/images/logo.png"
                  alt="KartoMap"
                  width={80}
                  height={80}
                  className="drop-shadow-[0_0_30px_rgba(13,148,136,0.6)]"
                  priority
              />
            </div>

            {/* Title */}
            <h1 className="font-heading text-4xl font-bold leading-[1.1] tracking-tight text-white sm:text-5xl lg:text-6xl text-balance">
              Cartographie{" "}
              <span className="bg-gradient-to-r from-[#0d9488] via-[#2dd4bf] to-[#0d9488] bg-clip-text text-transparent animate-gradient bg-[length:200%_auto]">
              intelligente
            </span>{" "}
              et interactive
            </h1>

            <p className="mt-6 max-w-lg text-base leading-relaxed text-[#94a3b8] lg:text-lg">
              Visualisez, analysez et partagez vos données géospatiales avec une plateforme open-source complète et modulaire.
            </p>

            {/* Feature pills */}
            <div
                className={`mt-8 flex flex-wrap gap-2.5 justify-center lg:justify-start transition-all duration-1000 delay-200 ${
                    loaded ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
                }`}
            >
              <FeaturePill icon={Layers} text="Multi-couches" />
              <FeaturePill icon={Database} text="API Ouvertes" />
              <FeaturePill icon={Users} text="Collaboratif" />
              <FeaturePill icon={Zap} text="Temps réel" />
            </div>

            {/* CTA Buttons */}
            <div
                className={`mt-10 flex flex-col gap-4 sm:flex-row transition-all duration-1000 delay-300 ${
                    loaded ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
                }`}
            >
              <Button
                  size="lg"
                  className="bg-gradient-to-r from-[#0d9488] to-[#0d9488]/90 text-white hover:from-[#0d9488]/90 hover:to-[#0d9488]/80 shadow-xl shadow-[#0d9488]/30 text-sm px-8 py-6 group font-semibold"
              >
                Démarrer gratuitement
                <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
              </Button>
              <Button
                  size="lg"
                  variant="outline"
                  className="border-[#1e293b]/80 bg-white/5 text-white hover:bg-white/10 backdrop-blur-sm text-sm px-8 py-6 font-semibold hover:border-[#0d9488]/30"
              >
                <Play className="mr-2 h-5 w-5" />
                Voir la démo
              </Button>
            </div>

            {/* Trust indicators */}
            <div
                className={`mt-12 flex items-center gap-5 transition-all duration-1000 delay-500 ${
                    loaded ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
                }`}
            >
              <div className="flex -space-x-3">
                {["K", "M", "G", "D", "S"].map((letter, i) => (
                    <div
                        key={i}
                        className="flex h-9 w-9 items-center justify-center rounded-full border-2 border-[#060e1b] text-xs font-bold shadow-lg"
                        style={{
                          backgroundColor: ["#0d9488", "#3b82f6", "#e97624", "#0d9488", "#3b82f6"][i],
                          color: "white",
                        }}
                    >
                      {letter}
                    </div>
                ))}
              </div>
              <div className="text-sm text-[#64748b]">
                <span className="font-bold text-white">500+</span> organisations nous font confiance
              </div>
            </div>

            {/* Stats */}
            <div
                className={`mt-10 grid grid-cols-3 gap-6 w-full max-w-md transition-all duration-1000 delay-700 ${
                    loaded ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
                }`}
            >
              <div className="text-center lg:text-left">
                <div className="text-2xl font-bold text-white">7+</div>
                <div className="text-xs text-[#64748b]">Fonctionnalités</div>
              </div>
              <div className="text-center lg:text-left">
                <div className="text-2xl font-bold text-white">100%</div>
                <div className="text-xs text-[#64748b]">Open-Source</div>
              </div>
              <div className="text-center lg:text-left">
                <div className="text-2xl font-bold text-white">∞</div>
                <div className="text-xs text-[#64748b]">Possibilités</div>
              </div>
            </div>
          </div>

          {/* Spacer for 3D scene on desktop */}
          <div className="hidden lg:block lg:w-1/2" aria-hidden />
        </div>
      </section>
  )
}
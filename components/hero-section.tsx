"use client"

import dynamic from "next/dynamic"
import {ChevronDown} from "lucide-react";

const Map3DScene = dynamic(
    () => import("@/components/map-3d-scene").then((mod) => mod.Map3DScene),
    { ssr: false }
)

export function HeroSection()
{

    const onScrollToNextSection = () => {
        const nextSection = document.querySelector("#fonctionnalites")
        if (nextSection) {
            nextSection.scrollIntoView({behavior: "smooth"})
        }
    }

  return (
      <section className="relative min-h-screen overflow-hidden bg-[#060e1b]">
        {/* 3D Map Scene */}
        <Map3DScene />

          {/* Scroll indicator */}
          <div className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2 flex flex-col items-center gap-2"
                onClick={onScrollToNextSection}>
              <span className="text-[10px] uppercase tracking-widest text-[#475569] font-semibold">Découvrir</span>
              <ChevronDown className="h-5 w-5 text-[#0d9488] animate-bounce" />
          </div>
      </section>
  )
}
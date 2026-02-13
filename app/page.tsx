import { Navbar } from "@/components/navbar"
import { HeroSection } from "@/components/hero-section"
import { StatsBand } from "@/components/stats-band"
import { FeaturesSection } from "@/components/features-section"
import { HowItWorksSection } from "@/components/how-it-works-section"
import { EcosystemSection } from "@/components/ecosystem-section"
import { ApiSection } from "@/components/api-section"
import { PricingSection } from "@/components/pricing-section"
import { CtaSection } from "@/components/cta-section"
import { Footer } from "@/components/footer"

export default function Page() {
  return (
    <main>
      <Navbar />
      <HeroSection />
      <StatsBand />
      <FeaturesSection />
      <HowItWorksSection />
      <EcosystemSection />
      <ApiSection />
      <PricingSection />
      <CtaSection />
      <Footer />
    </main>
  )
}

import { Navbar } from "@/components/navbar"
import { HeroSection } from "@/components/hero-section"
import { FeaturesSection } from "@/components/features-section"
import { HowItWorksSection } from "@/components/how-it-works-section"
import { EcosystemSection } from "@/components/ecosystem-section"
import { ApiSection } from "@/components/api-section"
import { PricingSection } from "@/components/pricing-section"
import { CtaSection } from "@/components/cta-section"
import { Footer } from "@/components/footer"
import { I18nProvider } from "@/lib/i18n"

export default function Page() {
  return (
    <I18nProvider>
      <main>
        <Navbar />
        <HeroSection />
        <FeaturesSection />
        <HowItWorksSection />
        <EcosystemSection />
        <ApiSection />
        <PricingSection />
        <CtaSection />
        <Footer />
      </main>
    </I18nProvider>
  )
}

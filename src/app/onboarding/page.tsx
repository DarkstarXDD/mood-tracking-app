import Onboarding from "@/components/onboarding/Onboarding"
import BrandLogo from "@/components/ui/BrandLogo"

export default function OnboardingPage() {
  return (
    <main className="grid w-full justify-items-center gap-8 md:gap-12">
      <BrandLogo />
      <Onboarding />
    </main>
  )
}

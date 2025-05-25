import { redirect } from "next/navigation"

import Onboarding from "@/components/onboarding/Onboarding"
import BrandLogo from "@/components/ui/BrandLogo"
import { hasCompletedOnboarding } from "@/lib/data-access/user"

export default async function OnboardingPage() {
  if (await hasCompletedOnboarding()) {
    redirect("/")
  }

  return (
    <main className="grid w-full justify-items-center gap-8 md:gap-12">
      <BrandLogo />
      <Onboarding />
    </main>
  )
}

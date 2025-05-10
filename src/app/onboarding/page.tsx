import Image from "next/image"

import moodTrackerLogo from "@/assets/logo.svg"
import Onboarding from "@/components/onboarding/Onboarding"

export default function OnboardingPage() {
  return (
    <main className="grid justify-items-center gap-8 md:gap-12">
      <Image
        src={moodTrackerLogo}
        alt="Mood Tracker"
        priority
        className="h-10 w-45"
      />
      <Onboarding />
    </main>
  )
}

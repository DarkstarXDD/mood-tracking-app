import Image from "next/image"

import moodTrackerLogo from "@/assets/logo.svg"
import LogInForm from "@/components/login/LogInForm"

export default function LogInPage() {
  return (
    <div className="grid justify-items-center gap-8 md:gap-12">
      <Image
        src={moodTrackerLogo}
        alt="Mood Tracker"
        priority
        className="h-10 w-45"
      />
      <LogInForm />
    </div>
  )
}

import Image from "next/image"

import moodTrackerLogo from "@/assets/logo.svg"
import SignUpForm from "@/components/signup/SignUpForm"

export default function SignUpPage() {
  return (
    <div className="grid justify-items-center gap-8 md:gap-12">
      <Image
        src={moodTrackerLogo}
        alt="Mood Tracker"
        priority
        className="h-10 w-45"
      />
      <SignUpForm />
    </div>
  )
}

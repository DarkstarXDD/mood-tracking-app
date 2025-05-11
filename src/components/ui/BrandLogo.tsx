import Image from "next/image"

import moodTrackerLogo from "@/assets/logo.svg"
import { cn } from "@/lib/utils"

export default function BrandLogo({ className }: { className?: string }) {
  return (
    <Image
      src={moodTrackerLogo}
      alt="Mood Tracker"
      priority
      className={cn("h-10 w-45", className)}
    />
  )
}

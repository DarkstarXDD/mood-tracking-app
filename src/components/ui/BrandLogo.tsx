import Image from "next/image"

import { cn } from "@/lib/utils"

export default function BrandLogo({ className }: { className?: string }) {
  return (
    <Image
      src="/logo/logo.svg"
      alt="Mood Tracker"
      priority
      className={cn("h-10 w-45", className)}
      width={178}
      height={40}
    />
  )
}

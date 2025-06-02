import SVGIcon from "@/components/ui/SVGIcon"
import { cn } from "@/lib/utils"

export default function BrandLogo({ className }: { className?: string }) {
  return (
    <SVGIcon
      name="brand-logo"
      className={cn("h-10 w-45", className)}
      aria-hidden="false"
      aria-label="Mood Tracker"
    />
  )
}

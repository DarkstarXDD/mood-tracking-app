import Tooltip from "@/components/ui/Tooltip"
import { cn } from "@/lib/utils"

import type { ComponentProps, ReactNode } from "react"

export default function Label({
  className,
  children,
  tooltip,
  ...props
}: ComponentProps<"label"> & { tooltip?: ReactNode }) {
  return (
    <label
      {...props}
      className={cn(
        "flex items-center gap-1 justify-self-start text-lg leading-normal tracking-tight text-neutral-900",
        className
      )}
    >
      {children}
      {tooltip && <Tooltip>{tooltip}</Tooltip>}
    </label>
  )
}

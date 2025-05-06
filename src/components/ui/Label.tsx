import { cn } from "@/lib/utils"

import type { ComponentProps } from "react"

export default function Label({
  className,
  children,
  ...props
}: ComponentProps<"label">) {
  return (
    <label
      {...props}
      className={cn(
        "text-lg leading-normal tracking-tight text-neutral-900",
        className
      )}
    >
      {children}
    </label>
  )
}

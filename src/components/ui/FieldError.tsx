import { cn } from "@/lib/utils"

import type { ComponentProps } from "react"

export default function FieldError({
  children,
  className,
  ...props
}: ComponentProps<"p">) {
  return (
    <p
      {...props}
      className={cn("text-base leading-none text-red-700", className)}
    >
      {children}
    </p>
  )
}

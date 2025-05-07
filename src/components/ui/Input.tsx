import { cn } from "@/lib/utils"

import type { ComponentProps } from "react"

export default function Input({
  className,
  ...props
}: ComponentProps<"input">) {
  return (
    <input
      {...props}
      className={cn(
        "min-w-0 rounded-xl border border-neutral-300 px-4 py-3 text-lg leading-normal tracking-tight text-neutral-600 ring-blue-600 outline-none focus-visible:border-blue-600 focus-visible:ring-2 aria-[invalid]:border-red-700 aria-[invalid]:ring-red-700",
        className
      )}
    />
  )
}

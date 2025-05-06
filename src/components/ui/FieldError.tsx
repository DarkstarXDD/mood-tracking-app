import { MdError } from "react-icons/md"

import { cn } from "@/lib/utils"

import type { ComponentProps } from "react"

export default function FieldError({
  children,
  className,
  ...props
}: ComponentProps<"div">) {
  return (
    <div
      {...props}
      className={cn(
        "flex items-center justify-start gap-1 text-sm leading-none text-red-700",
        className
      )}
    >
      <MdError className="size-5" />
      <p>{children}</p>
    </div>
  )
}

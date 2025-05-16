import { FieldError } from "react-aria-components"

import { cn } from "@/lib/utils"

import type { FieldErrorProps } from "react-aria-components"

type RACFieldErrorProps = Omit<FieldErrorProps, "className"> & {
  className?: string
}

export default function RACFieldError({
  className,
  ...props
}: RACFieldErrorProps) {
  return (
    <FieldError
      {...props}
      className={cn(
        "text-base leading-normal font-normal tracking-tight text-red-700",
        className
      )}
    />
  )
}

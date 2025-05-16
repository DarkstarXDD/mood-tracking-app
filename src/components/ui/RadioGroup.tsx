import {
  Label,
  Radio as RACRadio,
  RadioGroup as RACRadioGroup,
} from "react-aria-components"

import RACFieldError from "@/components/ui/RACFieldError"
import { cn } from "@/lib/utils"

import type { ReactNode } from "react"
import type {
  RadioGroupProps as RACRadioGroupProps,
  RadioProps as RACRadioProps,
} from "react-aria-components"

type RadioGroupProps = Omit<RACRadioGroupProps, "children"> & {
  label?: string
  children: ReactNode
  errorMessage?: string
}

export function RadioGroup({
  label,
  children,
  className,
  errorMessage = "Test",
  ...props
}: RadioGroupProps) {
  return (
    <RACRadioGroup {...props} className={cn("grid gap-6 md:gap-8", className)}>
      <Label className="text-3xl leading-snug font-bold tracking-tight text-neutral-900 md:text-4xl md:leading-normal">
        {label}
      </Label>
      <div className="grid gap-3">{children}</div>
      <RACFieldError>{errorMessage}</RACFieldError>
    </RACRadioGroup>
  )
}

type RadioOptionProps = Omit<RACRadioProps, "children"> & {
  children: ReactNode
}

export function RadioOption({
  children,
  className,
  ...props
}: RadioOptionProps) {
  return (
    <RACRadio
      className={cn(
        "group rac-selected:ring-1 rac-hover:bg-blue-50 rac-focus-visible:ring-1 rac-focus-visible:border-blue-600 rac-selected:border-blue-600 flex cursor-pointer items-center gap-3 rounded-xl border-2 border-blue-100 bg-white px-5 py-3 ring-blue-600 transition-[background-color]",
        className
      )}
      {...props}
    >
      <span className="group-rac-selected:border-blue-600 group-rac-selected:border-5 h-5 w-5 shrink-0 rounded-full border-2 border-blue-100"></span>
      {children}
    </RACRadio>
  )
}

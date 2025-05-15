import {
  Label,
  Radio as RACRadio,
  RadioGroup as RACRadioGroup,
} from "react-aria-components"

import { cn } from "@/lib/utils"

import type { ReactNode } from "react"
import type {
  RadioGroupProps as RACRadioGroupProps,
  RadioProps as RACRadioProps,
} from "react-aria-components"

type RadioGroupProps = Omit<RACRadioGroupProps, "children"> & {
  label?: string
  children: ReactNode
}

export function RadioGroup({
  label,
  children,
  className,
  ...props
}: RadioGroupProps) {
  return (
    <RACRadioGroup {...props} className={cn("grid gap-3", className)}>
      <Label>{label}</Label>
      {children}
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

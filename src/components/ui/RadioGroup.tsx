import { motion } from "motion/react"
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

function RadioGroup({
  label,
  children,
  className,
  errorMessage = "Test",
  ...props
}: RadioGroupProps) {
  return (
    <RACRadioGroup {...props} className={cn("grid gap-6 md:gap-8", className)}>
      <Label className="text-3xl leading-snug font-bold tracking-tight text-neutral-900">
        {label}
      </Label>
      <div className="grid gap-3">{children}</div>
      <RACFieldError>{errorMessage}</RACFieldError>
    </RACRadioGroup>
  )
}

type RadioGroupItemProps = Omit<RACRadioProps, "children"> & {
  children: ReactNode
}

function RadioGroupItem({
  children,
  className,
  ...props
}: RadioGroupItemProps) {
  return (
    <RACRadio {...props} className="group">
      {({ isSelected }) => (
        <div
          className={cn(
            "group-rac-hover:bg-blue-50 group-rac-selected:ring-1 group-rac-focus-visible:ring-1 group-rac-focus-visible:border-blue-600 group-rac-selected:border-blue-600 relative flex cursor-pointer items-center gap-3 rounded-xl border-2 border-blue-100 bg-white px-5 py-4 ring-blue-600 transition-[background-color]",
            className
          )}
        >
          <motion.span
            className="relative h-5 w-5 shrink-0 rounded-full border-2 border-blue-100 bg-white"
            animate={isSelected ? "selected" : "unSelected"}
            variants={{
              selected: { borderColor: "var(--color-blue-600)" },
              unSelected: { borderColor: "var(--color-blue-100)" },
            }}
          >
            <motion.span
              className="absolute inset-0 rounded-full bg-blue-600"
              initial={{ scale: 0 }}
              animate={isSelected ? "selected" : "unSelected"}
              variants={{
                selected: { scale: 0.7, opacity: 1 },
                unSelected: { scale: 0, opacity: 0 },
              }}
              transition={{ type: "spring", stiffness: 350, damping: 30 }}
            />
          </motion.span>
          {children}
        </div>
      )}
    </RACRadio>
  )
}

export { RadioGroup, RadioGroupItem }

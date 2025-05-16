"use client"

import { useId } from "react"

import FieldError from "@/components/ui/FieldError"
import Input from "@/components/ui/Input"
import Label from "@/components/ui/Label"
import { cn } from "@/lib/utils"

import type { ComponentProps } from "react"

type TextFieldProps = {
  label: string
  errorMessage?: string
} & Omit<ComponentProps<"input">, "type"> & {
    type?: "text" | "email" | "password"
  }

export default function TextField({
  label,
  id,
  className,
  errorMessage,
  ...props
}: TextFieldProps) {
  const defaultId = useId()

  const inputId = id ?? defaultId

  const errorId = `${inputId}-error`
  const isInvalid = errorMessage ? true : false

  return (
    <div className={cn("grid gap-2", className)}>
      <Label htmlFor={inputId}>{label}</Label>
      <Input
        id={inputId}
        {...props}
        aria-invalid={isInvalid || undefined}
        aria-describedby={isInvalid ? errorId : undefined}
      />
      {isInvalid && <FieldError id={errorId}>{errorMessage}</FieldError>}
    </div>
  )
}

"use client"

import { useId } from "react"

import Label from "@/components/ui/Label"
import TextArea from "@/components/ui/TextArea"

export default function DailyNote() {
  const inputId = useId()

  return (
    <div className="grid gap-6 md:gap-8">
      <Label
        htmlFor={inputId}
        className="text-3xl leading-snug font-bold tracking-tight text-neutral-900 md:text-4xl md:leading-normal"
      >
        Write about your day...
      </Label>
      <div className="grid gap-2">
        <TextArea
          id={inputId}
          placeholder="Today, I felt…"
          className="h-38 resize-none placeholder:italic"
        />
        <span className="justify-self-end text-xs leading-none font-semibold tracking-normal text-neutral-600">
          0/150
        </span>
      </div>
    </div>
  )
}

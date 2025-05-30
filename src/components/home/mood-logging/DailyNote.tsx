"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useId } from "react"
import { useForm } from "react-hook-form"

import Button from "@/components/ui/Button"
import FieldError from "@/components/ui/FieldError"
import Label from "@/components/ui/Label"
import TextArea from "@/components/ui/TextArea"
import useMoodForm from "@/hooks/useMoodForm"
import { moodFormSchema } from "@/lib/schema"

import type { MoodFormSchemaType } from "@/lib/schema"

const formSchema = moodFormSchema.pick({ dailyNote: true })
type FormSchemaType = Pick<MoodFormSchemaType, "dailyNote">

export default function DailyNote() {
  const { updateFormData, handleNext } = useMoodForm()
  const {
    handleSubmit,
    register,
    formState: { errors },
    watch,
  } = useForm<FormSchemaType>({ resolver: zodResolver(formSchema) })
  const inputId = useId()
  const errorId = `${inputId}-error`
  const isInvalid = errors.dailyNote?.message ? true : false

  return (
    <form
      className="grid gap-6 md:gap-8"
      onSubmit={handleSubmit((data) => {
        updateFormData(data)
        handleNext()
      })}
    >
      <div className="grid gap-6 md:gap-8">
        <Label
          htmlFor={inputId}
          className="text-3xl leading-snug font-bold tracking-tight text-neutral-900"
        >
          Write about your day...
          <span className="text-lg font-medium text-neutral-600">
            {" "}
            (Optional)
          </span>
        </Label>

        <div className="grid gap-2">
          <TextArea
            id={inputId}
            {...register("dailyNote")}
            placeholder="Today, I felt…"
            className="h-38 resize-none placeholder:italic"
            aria-invalid={isInvalid || undefined}
            aria-describedby={isInvalid ? errorId : undefined}
          />
          <span className="justify-self-end text-xs leading-none font-semibold tracking-normal text-neutral-600">
            {`${watch("dailyNote")?.length}/150`}
          </span>
        </div>

        {isInvalid && (
          <FieldError id={errorId}>{errors.dailyNote?.message}</FieldError>
        )}
      </div>

      <Button type="submit" size="lg">
        Continue
      </Button>
    </form>
  )
}

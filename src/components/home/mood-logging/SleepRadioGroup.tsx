import { zodResolver } from "@hookform/resolvers/zod"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { useForm, Controller } from "react-hook-form"

import { createMoodEntry } from "@/actions/user"
import AnimatedSuccessMark from "@/components/ui/AnimatedSuccessMark"
import Button from "@/components/ui/Button"
import LoadingDots from "@/components/ui/LoadingDots"
import { RadioGroup, RadioGroupItem } from "@/components/ui/RadioGroup"
import useMoodForm from "@/hooks/useMoodForm"
import useMoodFormOptions from "@/hooks/useMoodFormOptions"
import { moodFormSchema } from "@/lib/schema"

import type { MoodFormSchemaType } from "@/lib/schema"

const formSchema = moodFormSchema.pick({ hoursOfSleep: true })
type FormSchemaType = Pick<MoodFormSchemaType, "hoursOfSleep">

export default function SleepRadioGroup() {
  const { moodFormData } = useMoodForm()
  const { hoursOfSleep } = useMoodFormOptions()
  const [status, setStatus] = useState<"idle" | "loading" | "success">("idle")
  const router = useRouter()

  const { handleSubmit, control, setError } = useForm<FormSchemaType>({
    resolver: zodResolver(formSchema),
  })

  return (
    <div>
      {status !== "success" ? (
        <form
          className="grid gap-6 md:gap-8"
          onSubmit={handleSubmit(async (data) => {
            setStatus("loading")
            const allFormData = { ...moodFormData, ...data }
            const validationResult = moodFormSchema.safeParse(allFormData)
            if (!validationResult.success) {
              setError("hoursOfSleep", { message: "Invalid mood data values." })
              setStatus("idle")
              return
            }
            const response = await createMoodEntry(validationResult.data)
            if (!response.success) {
              setError("hoursOfSleep", response.error)
              return
            } else {
              router.refresh()
              setStatus("success")
            }
          })}
        >
          <Controller
            name="hoursOfSleep"
            control={control}
            render={({
              field: { name, value, onChange, onBlur },
              fieldState: { invalid, error },
            }) => (
              <RadioGroup
                label="How many hours did you sleep last night?"
                name={name}
                value={value?.toString() ?? null}
                onChange={onChange}
                onBlur={onBlur}
                isInvalid={invalid}
                errorMessage={error?.message}
              >
                {hoursOfSleep.map((item) => (
                  <RadioGroupItem key={item.id} value={item.id.toString()}>
                    <span className="text-xl leading-normal font-semibold tracking-normal text-neutral-900">
                      {item.label}
                    </span>
                  </RadioGroupItem>
                ))}
              </RadioGroup>
            )}
          />
          <Button type="submit" size="lg" isDisabled={status === "loading"}>
            {status == "loading" ? <LoadingDots /> : "Submit"}
          </Button>
        </form>
      ) : (
        <div className="grid justify-items-center gap-8 py-8">
          <div className="flex flex-col items-center justify-center gap-4 md:flex-row">
            <AnimatedSuccessMark variant="secondary" />
            <p className="text-center text-2xl leading-tight font-medium tracking-normal text-neutral-600">
              Logged mood successfully!
            </p>
          </div>
          <Button slot="close">Close</Button>
        </div>
      )}
    </div>
  )
}

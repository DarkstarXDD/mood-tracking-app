import { zodResolver } from "@hookform/resolvers/zod"
import { useState } from "react"
import { useForm, Controller } from "react-hook-form"

import { createMoodEntry } from "@/actions/user"
import AnimatedSuccessMark from "@/components/ui/AnimatedSuccessMark"
import Button from "@/components/ui/Button"
import LoadingDots from "@/components/ui/LoadingDots"
import { RadioGroup, RadioOption } from "@/components/ui/RadioGroup"
import useMoodForm from "@/hooks/useMoodForm"
import useMoodFormOptions from "@/hooks/useMoodFormOptions"
import { moodFormSchema } from "@/lib/schema"

import type { MoodFormSchemaType } from "@/lib/schema"
import type { RadioProps } from "react-aria-components"

const formSchema = moodFormSchema.pick({ hoursOfSleep: true })
type FormSchemaType = Pick<MoodFormSchemaType, "hoursOfSleep">

export default function SleepRadioGroup() {
  const { moodFormData } = useMoodForm()
  const { hoursOfSleep } = useMoodFormOptions()
  const [status, setStatus] = useState<"idle" | "loading" | "success">("idle")

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
            setStatus("success")
            const response = await createMoodEntry(validationResult.data)
            if (response) {
              setError("hoursOfSleep", response)
              return
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
                  <SleepRadioOption
                    key={item.id}
                    value={item.id.toString()}
                    label={item.label}
                  />
                ))}
              </RadioGroup>
            )}
          />

          <Button type="submit" size="lg">
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

type SleepRadioOptionProps = RadioProps & {
  label: string
}

function SleepRadioOption({ label, ...props }: SleepRadioOptionProps) {
  return (
    <RadioOption {...props}>
      <span className="text-xl leading-normal font-semibold tracking-normal text-neutral-900">
        {label}
      </span>
    </RadioOption>
  )
}

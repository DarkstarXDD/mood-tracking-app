import { zodResolver } from "@hookform/resolvers/zod"
import { useForm, Controller } from "react-hook-form"

import Button from "@/components/ui/Button"
import { RadioGroup, RadioOption } from "@/components/ui/RadioGroup"
import useMoodForm from "@/hooks/useMoodForm"
import { moodFormSchema } from "@/lib/schema"

import type { MoodFormSchemaType } from "@/lib/schema"
import type { RadioProps } from "react-aria-components"

const formSchema = moodFormSchema.pick({ hoursOfSleep: true })
type FormSchemaType = Pick<MoodFormSchemaType, "hoursOfSleep">

export default function SleepRadioGroup() {
  const moodForm = useMoodForm()

  const { handleSubmit, control } = useForm<FormSchemaType>({
    resolver: zodResolver(formSchema),
  })

  return (
    <form
      className="grid gap-6 md:gap-8"
      onSubmit={handleSubmit((data) => {
        moodForm?.updateFormData(data)
        moodForm?.handleNext()
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
            value={value ?? null}
            onChange={onChange}
            onBlur={onBlur}
            isInvalid={invalid}
            errorMessage={error?.message}
          >
            <SleepRadioOption value="OverNineHours" label="9+ hours" />
            <SleepRadioOption value="SevenToEightHours" label="7-8 hours" />
            <SleepRadioOption value="FiveToSixHours" label="5-6 hours" />
            <SleepRadioOption value="ThreeToFourHours" label="3-4 hours" />
            <SleepRadioOption value="ZeroToTwoHours" label="0-2 hours" />
          </RadioGroup>
        )}
      />

      <Button type="submit" size="large">
        Continue
      </Button>
    </form>
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

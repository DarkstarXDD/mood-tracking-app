import { zodResolver } from "@hookform/resolvers/zod"
import Image from "next/image"
import { useForm, Controller } from "react-hook-form"

import happyEmoji from "@/assets/icon-happy-color.svg"
import neutralEmoji from "@/assets/icon-neutral-color.svg"
import sadEmoji from "@/assets/icon-sad-color.svg"
import veryHappyEmoji from "@/assets/icon-very-happy-color.svg"
import verySadEmoji from "@/assets/icon-very-sad-color.svg"
import Button from "@/components/ui/Button"
import { RadioGroup, RadioOption } from "@/components/ui/RadioGroup"
import useMoodForm from "@/hooks/useMoodForm"
import { moodFormSchema } from "@/lib/schema"

import type { MoodFormSchemaType } from "@/lib/schema"
import type { RadioProps } from "react-aria-components"

const formSchema = moodFormSchema.pick({ mood: true })
type FormSchemaType = Pick<MoodFormSchemaType, "mood">

export default function MoodRadioGroup() {
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
        control={control}
        name="mood"
        render={({
          field: { name, value, onChange, onBlur },
          fieldState: { invalid, error },
        }) => (
          <RadioGroup
            label="How was your mood today?"
            name={name}
            value={value ?? null}
            onChange={onChange}
            onBlur={onBlur}
            isInvalid={invalid}
            errorMessage={error?.message}
          >
            <MoodRadioOption
              value="veryHappy"
              label="Very Happy"
              emoji={veryHappyEmoji}
            />
            <MoodRadioOption value="happy" label="Happy" emoji={happyEmoji} />
            <MoodRadioOption
              value="neutral"
              label="Neutral"
              emoji={neutralEmoji}
            />
            <MoodRadioOption value="sad" label="Sad" emoji={sadEmoji} />
            <MoodRadioOption
              value="verySad"
              label="Very Sad"
              emoji={verySadEmoji}
            />
          </RadioGroup>
        )}
      />

      <Button type="submit" size="large">
        Continue
      </Button>
    </form>
  )
}

type MoodRadioOptionProps = RadioProps & {
  label: string
  emoji: string
}

function MoodRadioOption({ label, emoji, ...props }: MoodRadioOptionProps) {
  return (
    <RadioOption {...props}>
      <span className="flex w-full items-center justify-between gap-3">
        <span className="text-xl leading-normal font-semibold tracking-normal text-neutral-900">
          {label}
        </span>
        <Image src={emoji} alt="" className="h-[2.375rem] w-[2.375rem]" />
      </span>
    </RadioOption>
  )
}

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm, Controller } from "react-hook-form"

import Button from "@/components/ui/Button"
import { RadioGroup, RadioOption } from "@/components/ui/RadioGroup"
import SVGIcon from "@/components/ui/SVGIcon"
import useMoodForm from "@/hooks/useMoodForm"
import useMoodFormOptions from "@/hooks/useMoodFormOptions"
import { moodFormSchema } from "@/lib/schema"

import type { MoodFormSchemaType } from "@/lib/schema"
import type { SVGIconNameType } from "@/lib/types"
import type { RadioProps } from "react-aria-components"

const formSchema = moodFormSchema.pick({ mood: true })
type FormSchemaType = Pick<MoodFormSchemaType, "mood">

export default function MoodRadioGroup() {
  const moodForm = useMoodForm()
  const { moods } = useMoodFormOptions()

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
            value={value?.toString() ?? null}
            onChange={onChange}
            onBlur={onBlur}
            isInvalid={invalid}
            errorMessage={error?.message}
          >
            {moods.map((item) => (
              <MoodRadioOption
                key={item.id}
                value={item.id.toString()}
                label={item.label}
                icon={item.iconColor as SVGIconNameType}
              />
            ))}
          </RadioGroup>
        )}
      />

      <Button type="submit" size="lg">
        Continue
      </Button>
    </form>
  )
}

type MoodRadioOptionProps = RadioProps & {
  label: string
  icon: SVGIconNameType
}

function MoodRadioOption({ label, icon, ...props }: MoodRadioOptionProps) {
  return (
    <RadioOption {...props} className="py-3">
      <span className="flex w-full items-center justify-between gap-3">
        <span className="text-xl leading-normal font-semibold tracking-normal text-neutral-900">
          {label}
        </span>
        <SVGIcon name={icon} className="h-[2.375rem] w-[2.375rem]" />
      </span>
    </RadioOption>
  )
}

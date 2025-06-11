import { zodResolver } from "@hookform/resolvers/zod"
import { useForm, Controller } from "react-hook-form"

import Button from "@/components/ui/Button"
import { RadioGroup, RadioGroupItem } from "@/components/ui/RadioGroup"
import SVGIcon from "@/components/ui/SVGIcon"
import useMoodForm from "@/hooks/useMoodForm"
import useMoodFormOptions from "@/hooks/useMoodFormOptions"
import { moodFormSchema, MoodFormSchemaType } from "@/lib/schema"

import type { SVGIconNameType } from "@/lib/types"

const formSchema = moodFormSchema.pick({ mood: true })
type FormSchemaType = Pick<MoodFormSchemaType, "mood">

export default function MoodRadioGroup() {
  const { updateFormData, handleNext } = useMoodForm()
  const { moods } = useMoodFormOptions()

  const { handleSubmit, control } = useForm<FormSchemaType>({
    resolver: zodResolver(formSchema),
  })

  return (
    <form
      className="grid gap-6 md:gap-8"
      onSubmit={handleSubmit((data) => {
        updateFormData(data)
        handleNext()
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
              <RadioGroupItem
                key={item.id}
                value={item.id.toString()}
                className="py-3"
              >
                <span className="flex w-full items-center justify-between gap-3">
                  <span className="text-xl leading-normal font-semibold tracking-normal text-neutral-900">
                    {item.label}
                  </span>
                  <SVGIcon
                    name={item.iconColor as SVGIconNameType}
                    className="h-[2.375rem] w-[2.375rem]"
                  />
                </span>
              </RadioGroupItem>
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

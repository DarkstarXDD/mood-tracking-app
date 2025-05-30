import { zodResolver } from "@hookform/resolvers/zod"
import { capitalize } from "lodash"
import { motion } from "motion/react"
import { Checkbox, CheckboxGroup, Label, Text } from "react-aria-components"
import { useForm, Controller } from "react-hook-form"

import Button from "@/components/ui/Button"
import RACFieldError from "@/components/ui/RACFieldError"
import useMoodForm from "@/hooks/useMoodForm"
import useMoodFormOptions from "@/hooks/useMoodFormOptions"
import { moodFormSchema } from "@/lib/schema"

import type { MoodFormSchemaType } from "@/lib/schema"
import type { ReactNode } from "react"
import type { CheckboxProps } from "react-aria-components"

const formSchema = moodFormSchema.pick({ moodTags: true })
type FormSchemaType = Pick<MoodFormSchemaType, "moodTags">

export default function MoodTagCheckboxGroup() {
  const { updateFormData, handleNext } = useMoodForm()
  const { moodTags } = useMoodFormOptions()

  const { handleSubmit, control } = useForm<FormSchemaType>({
    resolver: zodResolver(formSchema),
    mode: "onChange",
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
        name="moodTags"
        control={control}
        render={({
          field: { name, value, onChange, onBlur },
          fieldState: { invalid, error },
        }) => (
          <CheckboxGroup
            className="grid gap-6 md:gap-8"
            name={name}
            value={value ?? []}
            onChange={onChange}
            onBlur={onBlur}
            isInvalid={invalid}
          >
            <div className="grid gap-2">
              <Label className="text-3xl leading-snug font-bold tracking-tight text-neutral-900">
                How did you feel?
              </Label>
              <Text
                slot="description"
                className="text-lg leading-tight font-medium tracking-normal text-neutral-600"
              >
                Select up to three tags:
              </Text>
            </div>

            <div className="flex flex-wrap gap-x-4 gap-y-3">
              {moodTags?.map((item) => (
                <MoodTagCheckbox key={item.name} value={item.name}>
                  {capitalize(item.name)}
                </MoodTagCheckbox>
              ))}
            </div>
            <RACFieldError>{error?.message}</RACFieldError>
          </CheckboxGroup>
        )}
      />

      <Button type="submit" size="lg">
        Continue
      </Button>
    </form>
  )
}

type MoodTagCheckboxProps = Omit<CheckboxProps, "children"> & {
  children: ReactNode
}

function MoodTagCheckbox({ children, ...props }: MoodTagCheckboxProps) {
  return (
    <Checkbox
      {...props}
      className="rac-selected:border-blue-600 group rac-hover:bg-blue-50 rac-focus-visible:ring-2 flex cursor-pointer items-center gap-2 rounded-xl border-2 border-blue-100 bg-white px-4 py-3 text-lg leading-normal font-normal tracking-tight text-neutral-900 ring-blue-600 transition-[background-color]"
    >
      {({ isSelected }) => (
        <>
          <div className="relative">
            <motion.div
              animate={isSelected ? "selected" : "unSelected"}
              variants={{
                unSelected: { scale: 0.95 },
                selected: { scale: 1.4 },
              }}
              className="absolute inset-0 rounded-sm bg-blue-200"
            />
            <span className="group-rac-selected:border-blue-600 group-rac-selected:bg-blue-600 relative flex h-4 w-4 items-center justify-center rounded-sm border-2 border-blue-200 bg-white transition-none">
              {isSelected && <CheckIcon className="h-4 w-4 text-white" />}
            </span>
          </div>
          {children}
        </>
      )}
    </Checkbox>
  )
}

function CheckIcon({ className }: { className: string }) {
  return (
    <svg
      className={className}
      stroke="currentColor"
      strokeWidth={3}
      fill="none"
      viewBox="0 0 24 24"
    >
      <motion.path
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 0.15 }}
        d="M5 13l4 4L19 7"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

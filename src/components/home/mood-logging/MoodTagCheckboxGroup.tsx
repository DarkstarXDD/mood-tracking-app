import { Checkbox, CheckboxGroup, Label, Text } from "react-aria-components"
import { FaCheck } from "react-icons/fa"

import type { ReactNode } from "react"
import type { CheckboxProps } from "react-aria-components"

export default function MoodTagCheckboxGroup() {
  return (
    <CheckboxGroup
      className="grid gap-6 md:gap-8"
      onChange={(values) => console.log(values)}
    >
      <div className="grid gap-1.5">
        <Label className="text-3xl leading-snug font-bold tracking-tight text-neutral-900 md:text-4xl md:leading-normal">
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
        <MoodTagCheckbox value="anxious">Anxious</MoodTagCheckbox>
        <MoodTagCheckbox value="down">Down</MoodTagCheckbox>
        <MoodTagCheckbox value="joyful">Joyful</MoodTagCheckbox>
      </div>
    </CheckboxGroup>
  )
}

type MoodTagCheckboxProps = Omit<CheckboxProps, "children"> & {
  children: ReactNode
}

function MoodTagCheckbox({ children, ...props }: MoodTagCheckboxProps) {
  return (
    <Checkbox
      {...props}
      className="rac-selected:border-blue-600 group rac-hover:bg-blue-50 rac-focus-visible:ring-2 flex cursor-pointer items-center gap-2 rounded-xl border-2 border-blue-100 px-4 py-3 text-lg leading-normal font-normal tracking-tight text-neutral-900 ring-blue-600 transition-[background-color]"
    >
      {({ isSelected }) => (
        <>
          <span className="group-rac-selected:border-blue-600 group-rac-selected:bg-blue-600 flex h-4 w-4 items-center justify-center rounded-sm border-2 border-blue-200 transition-none">
            {isSelected && <FaCheck className="h-2.5 w-2.5 text-white" />}
          </span>
          {children}
        </>
      )}
    </Checkbox>
  )
}

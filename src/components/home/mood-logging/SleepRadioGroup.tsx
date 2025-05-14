import { RadioGroup, RadioOption } from "@/components/ui/RadioGroup"

import type { RadioProps } from "react-aria-components"

export default function SleepRadioGroup() {
  return (
    <RadioGroup>
      <SleepRadioOption value="OverNineHours" label="9+ hours" />
      <SleepRadioOption value="SevenToEightHours" label="7-8 hours" />
      <SleepRadioOption value="FiveToSixHours" label="5-6 hours" />
      <SleepRadioOption value="ThreeToFourHours" label="3-4 hours" />
      <SleepRadioOption value="ZeroToTwoHours" label="0-2 hours" />
    </RadioGroup>
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

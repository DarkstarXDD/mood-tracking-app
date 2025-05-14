import Image from "next/image"

import happyEmoji from "@/assets/icon-happy-color.svg"
import neutralEmoji from "@/assets/icon-neutral-color.svg"
import sadEmoji from "@/assets/icon-sad-color.svg"
import veryHappyEmoji from "@/assets/icon-very-happy-color.svg"
import verySadEmoji from "@/assets/icon-very-sad-color.svg"
import { RadioGroup, RadioOption } from "@/components/ui/RadioGroup"

import type { RadioProps } from "react-aria-components"

export default function MoodRadioGroup() {
  return (
    <RadioGroup>
      <MoodRadioOption
        value="veryHappy"
        label="Very Happy"
        emoji={veryHappyEmoji}
      />
      <MoodRadioOption value="happy" label="Happy" emoji={happyEmoji} />
      <MoodRadioOption value="neutral" label="Neutral" emoji={neutralEmoji} />
      <MoodRadioOption value="sad" label="Sad" emoji={sadEmoji} />
      <MoodRadioOption value="verySad" label="Very Sad" emoji={verySadEmoji} />
    </RadioGroup>
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

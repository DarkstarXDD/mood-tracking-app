import { startCase } from "lodash"
import Image from "next/image"
import { ElementType } from "react"
import { FiArrowRight, FiArrowUpRight, FiArrowDownRight } from "react-icons/fi"
import { tv } from "tailwind-variants"

import happyEmojiSmall from "@/assets/icon-happy-white.svg"
import neutralEmojiSmall from "@/assets/icon-neutral-white.svg"
import sadEmojiSmall from "@/assets/icon-sad-white.svg"
import veryHappyEmoji from "@/assets/icon-very-happy-white.svg"
import verySadEmojiSmall from "@/assets/icon-very-sad-white.svg"

import type { VariantProps } from "tailwind-variants"

const moodIcons: Record<string, string> = {
  VerySad: verySadEmojiSmall,
  Sad: sadEmojiSmall,
  Neutral: neutralEmojiSmall,
  Happy: happyEmojiSmall,
  VeryHappy: veryHappyEmoji,
}

const moodStyles = tv({
  base: "custom-bg flex min-h-38 flex-col items-start justify-center gap-3 rounded-2xl px-4 py-5 md:px-5",
  variants: {
    mood: {
      VerySad: "bg-red-300",
      Sad: "bg-indigo-200",
      Neutral: "bg-blue-300",
      Happy: "bg-green-300",
      VeryHappy: "bg-amber-300",
    },
  },
})

export type AverageMoodProps = Required<VariantProps<typeof moodStyles>> & {
  averageMoodComparison: -1 | 0 | 1
}

const comparisonTextMap: Record<string, string> = {
  "0": "Same as the previous 5 check-ins",
  "-1": "Decrease from the previous 5 check-ins",
  "1": "Increase from the previous 5 check-ins",
}

const comparisonIconMap: Record<string, ElementType> = {
  "0": FiArrowRight,
  "-1": FiArrowDownRight,
  "1": FiArrowUpRight,
}

export default function AverageMood({
  mood,
  averageMoodComparison,
}: AverageMoodProps) {
  const Icon = comparisonIconMap[String(averageMoodComparison)]

  return (
    <div className={moodStyles({ mood })}>
      <div className="flex items-center gap-3 lg:gap-4">
        <Image src={moodIcons[mood]} alt="" />
        <p className="text-2xl leading-normal font-semibold tracking-normal text-neutral-900">
          {startCase(mood)}
        </p>
      </div>

      <div className="flex items-center gap-2">
        <Icon className="size-4 text-neutral-900" />
        <p className="text-base leading-normal font-normal tracking-tight text-neutral-900">
          {comparisonTextMap[String(averageMoodComparison)]}
        </p>
      </div>
    </div>
  )
}

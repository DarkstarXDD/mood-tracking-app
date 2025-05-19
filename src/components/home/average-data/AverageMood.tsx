import Image from "next/image"
import { FiArrowRight } from "react-icons/fi"
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
  base: "custom-bg flex min-h-[9.375rem] flex-col items-start justify-center gap-3 rounded-2xl px-4 py-5 md:px-5",
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

type AverageMoodProps = Required<VariantProps<typeof moodStyles>>

export default function AverageMood({ mood }: AverageMoodProps) {
  console.log(mood)
  return (
    <div className={moodStyles({ mood })}>
      <div className="flex items-center gap-3 lg:gap-4">
        <Image src={moodIcons[mood]} alt="" />
        <p className="text-2xl leading-normal font-semibold tracking-normal text-neutral-900">
          {mood}
        </p>
      </div>
      <div className="flex items-center gap-2">
        <FiArrowRight className="size-4" />
        <p className="text-base leading-normal font-normal tracking-tight text-neutral-900">
          Same as the previous 5 check-ins
        </p>
      </div>
    </div>
  )
}

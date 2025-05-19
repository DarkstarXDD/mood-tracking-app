import Image from "next/image"
import { ImQuotesLeft } from "react-icons/im"

// import happyEmoji from "@/assets/icon-happy-color.svg"
// import neutralEmoji from "@/assets/icon-neutral-color.svg"
// import sadEmoji from "@/assets/icon-sad-color.svg"
import veryHappyEmoji from "@/assets/icon-very-happy-color.svg"
// import verySadEmoji from "@/assets/icon-very-sad-color.svg"

export default function MoodCard() {
  return (
    <div className="grid justify-items-center gap-8 overflow-hidden rounded-2xl border border-blue-100 bg-white px-4 py-8 md:grid-cols-[1fr_auto] md:justify-items-start md:px-8 lg:row-span-2">
      <h2 className="flex flex-col justify-start text-center font-bold tracking-tight text-neutral-900 md:text-start">
        <span className="text-4xl leading-normal opacity-70">
          I&apos;m feeling
        </span>
        <span className="text-5xl leading-tight">Very Happy</span>
      </h2>

      <Image
        src={veryHappyEmoji}
        alt=""
        className="row-span-2 h-50 w-50 md:h-80 md:w-80 md:translate-y-12 md:justify-self-end"
      />

      <div className="flex flex-col items-center gap-4 text-center md:items-start md:justify-items-start md:gap-3 md:self-end md:text-start">
        <ImQuotesLeft className="size-6 text-blue-600" />
        <blockquote className="text-lg leading-snug font-medium tracking-normal text-neutral-900 italic">
          “When your heart is full, share your light with the world.”
        </blockquote>
      </div>
    </div>
  )
}

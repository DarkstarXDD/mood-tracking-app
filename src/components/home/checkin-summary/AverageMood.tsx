import SVGIcon from "@/components/ui/SVGIcon"
import {
  averageDiffToTextMap,
  averageDiffToIconMap,
  moodIdToIconWhiteMap,
  moodIdToLabelMap,
} from "@/lib/data-maps"
import { cn } from "@/lib/utils"

export type AverageMoodProps = {
  averageMoodId: number
  averageMoodWeightDiff: -1 | 0 | 1
}

const moodIdToColorMap: Record<number, string> = {
  1: "bg-red-300",
  2: "bg-indigo-200",
  3: "bg-blue-300",
  4: "bg-green-300",
  5: "bg-amber-300",
}

export default function AverageMood({
  averageMoodId,
  averageMoodWeightDiff,
}: AverageMoodProps) {
  const Icon = averageDiffToIconMap[String(averageMoodWeightDiff)]

  return (
    <div
      className={cn(
        "custom-bg flex min-h-38 flex-col items-start justify-center gap-3 rounded-2xl px-4 py-5 md:px-5",
        moodIdToColorMap[averageMoodId]
      )}
    >
      <div className="flex items-center gap-3 lg:gap-4">
        <SVGIcon
          name={moodIdToIconWhiteMap[averageMoodId]}
          className="size-7.5"
        />
        <p className="text-2xl leading-normal font-semibold tracking-normal text-neutral-900">
          {moodIdToLabelMap[averageMoodId]}
        </p>
      </div>

      <div className="flex items-center gap-2">
        <Icon className="size-4 text-neutral-900" />
        <p className="text-base leading-normal font-normal tracking-tight text-neutral-900">
          {averageDiffToTextMap[String(averageMoodWeightDiff)]}
        </p>
      </div>
    </div>
  )
}

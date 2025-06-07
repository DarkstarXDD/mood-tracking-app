import NotEnoughData from "@/components/home/checkin-summary/NotEnoughData"
import SVGIcon from "@/components/ui/SVGIcon"
import useMoodFormOptions from "@/hooks/useMoodFormOptions"
import useUser from "@/hooks/useUser"
import { averageDiffToTextMap, averageDiffToIconMap } from "@/lib/data-maps"
import { getAverageMoodData } from "@/lib/helpers/mood-helpers"
import { cn } from "@/lib/utils"

import type { SVGIconNameType } from "@/lib/types"

const moodIdToColorMap: Record<number, string> = {
  1: "bg-red-300",
  2: "bg-indigo-200",
  3: "bg-blue-300",
  4: "bg-green-300",
  5: "bg-amber-300",
}

export default function AverageMoodCard() {
  const {
    user: { moodEntries },
    hasFiveEntries,
  } = useUser()

  const { averageMoodId, averageMoodWeightDiff } =
    getAverageMoodData(moodEntries)

  const { moods } = useMoodFormOptions()
  const Icon = averageDiffToIconMap[String(averageMoodWeightDiff)]

  return (
    <div className="grid gap-3">
      <h2>
        <span className="text-xl leading-normal font-semibold tracking-normal text-neutral-900">
          Average Mood{" "}
        </span>
        <span className="text-base leading-normal font-normal tracking-tight text-neutral-600">
          (Last 5 Check-ins)
        </span>
      </h2>

      {!hasFiveEntries && <NotEnoughData type="mood" />}

      {hasFiveEntries && (
        <div
          className={cn(
            "custom-bg flex min-h-38 flex-col items-start justify-center gap-3 rounded-2xl px-4 py-5 md:px-5",
            moodIdToColorMap[averageMoodId]
          )}
        >
          <div className="flex items-center gap-3 lg:gap-4">
            <SVGIcon
              name={
                moods.find((m) => m.id === averageMoodId)
                  ?.iconWhite as SVGIconNameType
              }
              className="size-7.5"
            />
            <p className="text-2xl leading-normal font-semibold tracking-normal text-neutral-900">
              {moods.find((m) => m.id === averageMoodId)?.label}
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Icon className="size-4 text-neutral-900" />
            <p className="text-base leading-normal font-normal tracking-tight text-neutral-900">
              {averageDiffToTextMap[String(averageMoodWeightDiff)]}
            </p>
          </div>
        </div>
      )}
    </div>
  )
}

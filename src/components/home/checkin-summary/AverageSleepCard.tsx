import NotEnoughData from "@/components/home/checkin-summary/NotEnoughData"
import SVGIcon from "@/components/ui/SVGIcon"
import useMoodFormOptions from "@/hooks/useMoodFormOptions"
import useUser from "@/hooks/useUser"
import { averageDiffToTextMap, averageDiffToIconMap } from "@/lib/data-maps"
import { getAverageMoodData } from "@/lib/helpers/mood-helpers"

export default function AverageSleepCard() {
  const {
    user: { moodEntries },
    hasFiveEntries,
  } = useUser()

  const { averageSleepId, averageSleepWeightDiff } =
    getAverageMoodData(moodEntries)

  const { hoursOfSleep } = useMoodFormOptions()
  const Icon = averageDiffToIconMap[String(averageSleepWeightDiff)]

  return (
    <div className="grid gap-3">
      <h2>
        <span className="text-xl leading-normal font-semibold tracking-normal text-neutral-900">
          Average Sleep{" "}
        </span>
        <span className="text-base leading-normal font-normal tracking-tight text-neutral-600">
          (Last 5 Check-ins)
        </span>
      </h2>

      {!hasFiveEntries && <NotEnoughData type="sleep" />}

      {hasFiveEntries && (
        <div className="custom-bg flex min-h-38 flex-col items-start justify-center gap-3 rounded-2xl bg-blue-600 px-4 py-5 md:px-5">
          <div className="flex items-center gap-3 lg:gap-4">
            <SVGIcon
              name="icon-sleep"
              className="size-6 text-white opacity-70"
            />
            <p className="text-2xl leading-normal font-semibold tracking-normal text-white">
              {hoursOfSleep.find((hour) => hour.id === averageSleepId)?.label}
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Icon className="size-4 text-white opacity-70" />
            <p className="text-base leading-normal font-normal tracking-tight text-white opacity-70">
              {averageDiffToTextMap[String(averageSleepWeightDiff)]}
            </p>
          </div>
        </div>
      )}
    </div>
  )
}

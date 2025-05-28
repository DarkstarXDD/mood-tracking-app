import SleepIcon from "@/components/icons/SleepIcon"
import useMoodFormOptions from "@/hooks/useMoodFormOptions"
import { averageDiffToTextMap, averageDiffToIconMap } from "@/lib/data-maps"

export type AverageSleepProps = {
  averageSleepId: number
  averageSleepWeightDiff: -1 | 0 | 1
}

export default function AverageSleep({
  averageSleepId,
  averageSleepWeightDiff,
}: AverageSleepProps) {
  const { hoursOfSleep } = useMoodFormOptions()
  const Icon = averageDiffToIconMap[String(averageSleepWeightDiff)]

  return (
    <div className="custom-bg flex min-h-38 flex-col items-start justify-center gap-3 rounded-2xl bg-blue-600 px-4 py-5 md:px-5">
      <div className="flex items-center gap-3 lg:gap-4">
        <SleepIcon className="size-6 text-white opacity-70" />
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
  )
}

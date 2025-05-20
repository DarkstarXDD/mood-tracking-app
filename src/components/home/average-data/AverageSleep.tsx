import { ElementType } from "react"
import { FiArrowDownRight, FiArrowRight, FiArrowUpRight } from "react-icons/fi"

import SleepIcon from "@/components/icons/SleepIcon"

export type AverageSleepProps = {
  hoursOfSleep:
    | "ZeroToTwoHours"
    | "ThreeToFourHours"
    | "FiveToSixHours"
    | "SevenToEightHours"
    | "OverNineHours"
  averageSleepComparison: -1 | 0 | 1
}

const sleepToSleepLabelMap: Record<string, string> = {
  ZeroToTwoHours: "1 hour",
  ThreeToFourHours: "3-4 hours",
  FiveToSixHours: "4-6 hours",
  SevenToEightHours: "7-8 hours",
  OverNineHours: "9+ hours",
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

export default function AverageSleep({
  hoursOfSleep,
  averageSleepComparison,
}: AverageSleepProps) {
  const Icon = comparisonIconMap[String(averageSleepComparison)]
  return (
    <div className="custom-bg flex min-h-38 flex-col items-start justify-center gap-3 rounded-2xl bg-blue-600 px-4 py-5 md:px-5">
      <div className="flex items-center gap-3 lg:gap-4">
        <SleepIcon className="size-6 text-white opacity-70" />
        <p className="text-2xl leading-normal font-semibold tracking-normal text-white">
          {sleepToSleepLabelMap[hoursOfSleep]}
        </p>
      </div>

      <div className="flex items-center gap-2">
        <Icon className="size-4 text-white opacity-70" />
        <p className="text-base leading-normal font-normal tracking-tight text-white opacity-70">
          {comparisonTextMap[String(averageSleepComparison)]}
        </p>
      </div>
    </div>
  )
}

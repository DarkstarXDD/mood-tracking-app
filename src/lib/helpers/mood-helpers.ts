import type { AverageMoodProps } from "@/components/home/average-data/AverageMood"
import type { AverageSleepProps } from "@/components/home/average-data/AverageSleep"
import type { GetUserType } from "@/lib/data-access/user"

function getComparison(a: number, b?: number): -1 | 0 | 1 {
  if (!b || a === b) return 0
  return a < b ? -1 : 1
}

const moodWeight: Record<AverageMoodProps["mood"], number> = {
  VerySad: 1,
  Sad: 2,
  Neutral: 3,
  Happy: 4,
  VeryHappy: 5,
}

const moodLabels: Record<number, AverageMoodProps["mood"]> = {
  1: "VerySad",
  2: "Sad",
  3: "Neutral",
  4: "Happy",
  5: "VeryHappy",
}

const sleepWeight: Record<AverageSleepProps["hoursOfSleep"], number> = {
  ZeroToTwoHours: 1,
  ThreeToFourHours: 2,
  FiveToSixHours: 3,
  SevenToEightHours: 4,
  OverNineHours: 5,
}

const sleepLabels: Record<number, AverageSleepProps["hoursOfSleep"]> = {
  1: "ZeroToTwoHours",
  2: "ThreeToFourHours",
  3: "FiveToSixHours",
  4: "SevenToEightHours",
  5: "OverNineHours",
}

type GetAverageMoodDataReturnType = {
  averageMood: AverageMoodProps["mood"]
  averageSleep: AverageSleepProps["hoursOfSleep"]
  averageMoodComparison: -1 | 0 | 1
  averageSleepComparison: -1 | 0 | 1
}

export function getAverageMoodData(
  moodEntries: Exclude<GetUserType, null>["moodEntries"]
): GetAverageMoodDataReturnType {
  const current = moodEntries.slice(0, 5)
  const previous = moodEntries.slice(5, 10)

  const currentMoodAvg = Math.round(
    current.reduce((s, e) => s + moodWeight[e.mood], 0) / current.length
  )
  const currentSleepAvg = Math.round(
    current.reduce((s, e) => s + sleepWeight[e.sleep], 0) / current.length
  )

  const previousMoodAvg =
    previous.length === 5
      ? Math.round(previous.reduce((s, e) => s + moodWeight[e.mood], 0) / 5)
      : undefined

  const previousSleepAvg =
    previous.length === 5
      ? Math.round(previous.reduce((s, e) => s + sleepWeight[e.sleep], 0) / 5)
      : undefined

  return {
    averageMood: moodLabels[currentMoodAvg],
    averageSleep: sleepLabels[currentSleepAvg],
    averageMoodComparison: getComparison(currentMoodAvg, previousMoodAvg),
    averageSleepComparison: getComparison(currentSleepAvg, previousSleepAvg),
  }
}

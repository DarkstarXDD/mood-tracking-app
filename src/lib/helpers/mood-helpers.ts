import type { AverageMoodProps } from "@/components/home/checkin-summary/AverageMood"
import type { AverageSleepProps } from "@/components/home/checkin-summary/AverageSleep"
import type { GetUserType } from "@/lib/data-access/user"

function getComparison(a: number, b?: number): -1 | 0 | 1 {
  if (!b || a === b) return 0
  return a < b ? -1 : 1
}

const moodLabels: Record<number, AverageMoodProps["mood"]> = {
  1: "VerySad",
  2: "Sad",
  3: "Neutral",
  4: "Happy",
  5: "VeryHappy",
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
  moodEntries: GetUserType["moodEntries"]
): GetAverageMoodDataReturnType {
  const current = moodEntries.slice(0, 5)
  const previous = moodEntries.slice(5, 10)

  const currentMoodAvg = Math.round(
    current.reduce((sum, current) => sum + current.mood.id, 0) / current.length
  )
  const currentSleepAvg = Math.round(
    current.reduce((sum, current) => sum + current.hoursOfSleep.id, 0) /
      current.length
  )

  const previousMoodAvg =
    previous.length === 5
      ? Math.round(
          previous.reduce((sum, current) => sum + current.mood.id, 0) / 5
        )
      : undefined

  const previousSleepAvg =
    previous.length === 5
      ? Math.round(
          previous.reduce((sum, current) => sum + current.hoursOfSleep.id, 0) /
            5
        )
      : undefined

  return {
    averageMood: moodLabels[currentMoodAvg],
    averageSleep: sleepLabels[currentSleepAvg],
    averageMoodComparison: getComparison(currentMoodAvg, previousMoodAvg),
    averageSleepComparison: getComparison(currentSleepAvg, previousSleepAvg),
  }
}

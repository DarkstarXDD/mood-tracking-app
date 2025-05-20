import type { AverageMoodProps } from "@/components/home/average-data/AverageMood"
import type { AverageSleepProps } from "@/components/home/average-data/AverageSleep"
import type { GetUserType } from "@/lib/data-access/user"

const moodWeight: Record<string, number> = {
  VerySad: 1,
  Sad: 2,
  Neutral: 3,
  Happy: 4,
  VeryHappy: 5,
}

const moodLabels: Record<number, string> = {
  1: "VerySad",
  2: "Sad",
  3: "Neutral",
  4: "Happy",
  5: "VeryHappy",
}

const sleepWeight: Record<string, number> = {
  ZeroToTwoHours: 1,
  ThreeToFourHours: 2,
  FiveToSixHours: 3,
  SevenToEightHours: 4,
  OverNineHours: 5,
}

const sleepLabels: Record<number, string> = {
  1: "ZeroToTwoHours",
  2: "ThreeToFourHours",
  3: "FiveToSixHours",
  4: "SevenToEightHours",
  5: "OverNineHours",
}

type GetAverageMoodDataReturnType = {
  averageMood: AverageMoodProps["mood"]
  averageMoodComparison: -1 | 0 | 1
  averageSleep: AverageSleepProps["hoursOfSleep"]
  averageSleepComparison: -1 | 0 | 1
}

export function getAverageMoodData(
  moodEntries: Exclude<GetUserType, null>["moodEntries"]
): GetAverageMoodDataReturnType {
  let averageMoodComparison: -1 | 0 | 1 = 0
  let averageSleepComparison: -1 | 0 | 1 = 0

  let prevAverageMoodWeight: number | undefined
  let prevAverageSleepWeight: number | undefined

  const currentEntries = moodEntries.slice(0, 5)
  const previousEntries = moodEntries.slice(5, 10)

  // Current average mood
  const currentMoodSum = currentEntries.reduce(
    (sum, current) => sum + moodWeight[current.mood],
    0
  )
  const currentAverageMoodWeight = Math.round(currentMoodSum / 5)
  const currentAverageMood = moodLabels[currentAverageMoodWeight]

  // Current average sleep
  const currentSleepSum = currentEntries.reduce(
    (sum, current) => sum + sleepWeight[current.sleep],
    0
  )
  const currentAverageSleepWeight = Math.round(currentSleepSum / 5)
  const currentAverageSleep = sleepLabels[currentAverageSleepWeight]

  // Previous averages
  if (previousEntries.length === 5) {
    // Previous average mood
    const previousMoodSum = previousEntries.reduce(
      (sum, current) => sum + moodWeight[current.mood],
      0
    )

    const previousSleepSum = previousEntries.reduce(
      (sum, current) => sum + sleepWeight[current.sleep],
      0
    )
    prevAverageMoodWeight = Math.round(previousMoodSum / 5)
    prevAverageSleepWeight = Math.round(previousSleepSum / 5)
  }

  // Comparison between mood averages
  if (
    !prevAverageMoodWeight ||
    prevAverageMoodWeight === currentAverageMoodWeight
  ) {
    averageMoodComparison = 0
  } else if (currentAverageMoodWeight < prevAverageMoodWeight) {
    averageMoodComparison = -1
  } else {
    averageMoodComparison = 1
  }

  // Comparison between sleep averages
  if (
    !prevAverageSleepWeight ||
    prevAverageSleepWeight === currentAverageSleepWeight
  ) {
    averageSleepComparison = 0
  } else if (currentAverageSleepWeight < prevAverageSleepWeight) {
    averageSleepComparison = -1
  } else {
    averageSleepComparison = 1
  }

  return {
    averageMood: currentAverageMood as AverageMoodProps["mood"],
    averageSleep:
      currentAverageSleep as unknown as AverageSleepProps["hoursOfSleep"],
    averageMoodComparison,
    averageSleepComparison,
  }
}

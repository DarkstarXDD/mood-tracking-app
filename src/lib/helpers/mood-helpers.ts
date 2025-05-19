import { GetUserType } from "@/lib/dal/user"

import type { AverageMoodProps } from "@/components/home/average-data/AverageMood"

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

type GetAverageMoodDataReturnType = {
  averageMood: AverageMoodProps["mood"]
  averageMoodComparison: -1 | 0 | 1
}

export function getAverageMoodData(
  moodEntries: Exclude<GetUserType, null>["moodEntries"]
): GetAverageMoodDataReturnType {
  let averageMoodComparison: -1 | 0 | 1 = 0
  let previousAverageWeight: number | undefined

  const currentEntries = moodEntries.slice(0, 5)
  const previousEntries = moodEntries.slice(5, 10)

  const currentSum = currentEntries.reduce(
    (sum, current) => sum + moodWeight[current.mood],
    0
  )
  const currentAverageWeight = Math.round(currentSum / 5)

  const currentAverageMood = moodLabels[currentAverageWeight]

  if (previousEntries.length === 5) {
    const previousSum = previousEntries.reduce(
      (sum, current) => sum + moodWeight[current.mood],
      0
    )
    previousAverageWeight = Math.round(previousSum / 5)
  }

  if (
    !previousAverageWeight ||
    previousAverageWeight === currentAverageWeight
  ) {
    averageMoodComparison = 0
  } else if (currentAverageWeight < previousAverageWeight) {
    averageMoodComparison = -1
  } else {
    averageMoodComparison = 1
  }

  return {
    averageMood: currentAverageMood as AverageMoodProps["mood"],
    averageMoodComparison,
  }
}

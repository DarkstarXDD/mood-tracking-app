import type { GetUserType } from "@/lib/data-access/user"

function getComparison(a: number, b?: number): -1 | 0 | 1 {
  if (!b || a === b) return 0
  return a < b ? -1 : 1
}

type GetAverageMoodDataReturnType = {
  averageMoodId: number
  averageSleepId: number
  averageMoodWeightDiff: -1 | 0 | 1
  averageSleepWeightDiff: -1 | 0 | 1
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
    averageMoodId: currentMoodAvg,
    averageSleepId: currentSleepAvg,
    averageMoodWeightDiff: getComparison(currentMoodAvg, previousMoodAvg),
    averageSleepWeightDiff: getComparison(currentSleepAvg, previousSleepAvg),
  }
}

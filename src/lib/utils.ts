import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

import { GetUserType } from "@/lib/dal/user"

import type { AverageMoodProps } from "@/components/home/average-data/AverageMood"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function getFirstName(name: string | undefined | null) {
  if (!name) return ""
  return name.trim().split(/\s+/)[0]
}

/**
 * Given a number n, creates an array of length n. Useful for mapping.
 */
export const range = (start: number, end?: number, step = 1) => {
  const output = []

  if (typeof end === "undefined") {
    end = start
    start = 0
  }

  for (let i = start; i < end; i += step) {
    output.push(i)
  }

  return output
}

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

export function getAverageMood(
  moodEntries: Exclude<GetUserType, null>["moodEntries"]
): AverageMoodProps["mood"] {
  const sum = moodEntries.reduce(
    (sum, current) => sum + moodWeight[current.mood],
    0
  )

  const averageMoodLabel = moodLabels[Math.round(sum / 5)]
  return averageMoodLabel as AverageMoodProps["mood"]
}

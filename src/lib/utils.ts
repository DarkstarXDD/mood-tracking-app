import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

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

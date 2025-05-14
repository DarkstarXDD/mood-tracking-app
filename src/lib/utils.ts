import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function getFirstName(name: string | undefined | null) {
  if (!name) return ""
  return name.trim().split(/\s+/)[0]
}

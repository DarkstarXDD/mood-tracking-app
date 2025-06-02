import { useContext } from "react"

import { MoodFormContext } from "@/components/home/mood-logging/MoodLogForm"

export default function useMoodForm() {
  const context = useContext(MoodFormContext)
  if (!context) {
    throw new Error(
      "useMoodForm must be used within a MoodFormContext.Provider"
    )
  }
  return context
}

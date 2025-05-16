import { useContext } from "react"

import { MoodFormContext } from "@/components/home/mood-logging/MoodLogForm"

export default function useMoodForm() {
  return useContext(MoodFormContext)
}

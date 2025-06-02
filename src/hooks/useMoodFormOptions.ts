import { useContext } from "react"

import { MoodFormOptionsContext } from "@/components/home/HomePage"

export default function useMoodFormOptions() {
  const context = useContext(MoodFormOptionsContext)
  if (!context) {
    throw new Error(
      "useMoodFormOptions must be used within a MoodFormOptionContext.Provider"
    )
  }
  return context
}

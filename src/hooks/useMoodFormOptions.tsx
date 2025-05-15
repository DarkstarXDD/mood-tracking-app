import { useContext } from "react"

import { MoodFormOptionsContext } from "@/components/home/HomePage"

export default function useMoodFormOptions() {
  return useContext(MoodFormOptionsContext)
}

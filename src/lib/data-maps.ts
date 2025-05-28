import { ElementType } from "react"
import { FiArrowDownRight, FiArrowRight, FiArrowUpRight } from "react-icons/fi"

export const averageDiffToTextMap: Record<string, string> = {
  "0": "Same as the previous 5 check-ins",
  "-1": "Decrease from the previous 5 check-ins",
  "1": "Increase from the previous 5 check-ins",
}

export const averageDiffToIconMap: Record<string, ElementType> = {
  "0": FiArrowRight,
  "-1": FiArrowDownRight,
  "1": FiArrowUpRight,
}

export const moodToColorMap: Record<string, string> = {
  1: "#ff9b99",
  2: "#b8b1ff",
  3: "#89caff",
  4: "#89e780",
  5: "#ffc97c",
}

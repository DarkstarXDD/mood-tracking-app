import { ElementType } from "react"
import { FiArrowDownRight, FiArrowRight, FiArrowUpRight } from "react-icons/fi"

import type { SVGIconNameType } from "@/lib/types"

export const moodIdToIconWhiteMap: Record<string, SVGIconNameType> = {
  1: "icon-very-sad-white",
  2: "icon-sad-white",
  3: "icon-neutral-white",
  4: "icon-happy-white",
  5: "icon-very-happy-white",
}

export const moodIdToLabelMap: Record<number, string> = {
  1: "Very Sad",
  2: "Sad",
  3: "Neutral",
  4: "Happy",
  5: "Very Happy",
}

export const sleepIdToLabelMap: Record<number, string> = {
  1: "0-2 hours",
  2: "3-4 hours",
  3: "5-6 hours",
  4: "7-8 hours",
  5: "9+ hours",
}

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

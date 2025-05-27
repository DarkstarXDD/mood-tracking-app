import type { SVGIconNameType } from "@/lib/types"

export const moodToSmallEmojiMap: Record<string, SVGIconNameType> = {
  VeryHappy: "icon-very-happy-white",
  Happy: "icon-happy-white",
  Neutral: "icon-neutral-white",
  Sad: "icon-sad-white",
  VerySad: "icon-very-sad-white",
}

export const sleepToSleepLabelMap: Record<string, string> = {
  ZeroToTwoHours: "0-2 hours",
  ThreeToFourHours: "3-4 hours",
  FiveToSixHours: "5-6 hours",
  SevenToEightHours: "7-8 hours",
  OverNineHours: "9+ hours",
}

export const moodToColorMap: Record<string, string> = {
  1: "#ff9b99",
  2: "#b8b1ff",
  3: "#89caff",
  4: "#89e780",
  5: "#ffc97c",
}

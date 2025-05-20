import React from "react"

export default function NotEnoughData({ type }: { type: "mood" | "sleep" }) {
  const typeToLabelMap = {
    mood: {
      heading: "Keep tracking!",
      description: "Log 5 check-ins to see your average mood.",
    },

    sleep: {
      heading: "Not enough data yet!",
      description: "Track 5 nights to view average sleep.",
    },
  }

  const { heading, description } = typeToLabelMap[type]

  return (
    <div className="custom-bg flex min-h-38 flex-col items-start justify-center gap-3 rounded-2xl bg-blue-100 px-4 py-5 md:px-5">
      <p className="text-2xl leading-normal font-semibold tracking-normal text-neutral-900">
        {heading}
      </p>
      <p className="text-base leading-normal font-normal tracking-tight text-neutral-600">
        {description}
      </p>
    </div>
  )
}

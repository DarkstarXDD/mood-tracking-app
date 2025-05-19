import React from "react"

export default function NotEnoughData({ type }: { type: "mood" | "sleep" }) {
  let contentHeading = ""
  let contentDescription = ""

  if (type === "mood") {
    contentHeading = "Keep tracking!"
    contentDescription = "Log 5 check-ins to see your average mood."
  }

  if (type === "sleep") {
    contentHeading = "Not enough data yet!"
    contentDescription = "Track 5 nights to view average sleep."
  }

  return (
    <div className="custom-bg flex min-h-[9.375rem] flex-col items-start justify-center gap-3 rounded-2xl bg-blue-100 px-4 py-5 md:px-5">
      <p className="text-2xl leading-normal font-semibold tracking-normal text-neutral-900">
        {contentHeading}
      </p>
      <p className="text-base leading-normal font-normal tracking-tight text-neutral-600">
        {contentDescription}
      </p>
    </div>
  )
}

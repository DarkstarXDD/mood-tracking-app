"use client"
import dynamic from "next/dynamic"

import useUser from "@/hooks/useUser"

// const MoodSleepChartNoSSR = dynamic(
//   () => import(`@/components/home/mood-sleep-chart/MoodSleepChart`),
//   { ssr: false }
// )

const ChartNoSSR = dynamic(
  () => import("@/components/home/mood-sleep-chart/Chart"),
  { ssr: false }
)

export default function MoodSleepChartWrapper() {
  const {
    user: { moodEntries },
  } = useUser()

  const hasNoMoodEntries = moodEntries.length === 0

  return (
    <div className="grid gap-8 rounded-2xl border border-blue-100 bg-white px-4 py-5 md:p-6">
      <h2 className="text-3xl leading-snug font-bold tracking-tight text-neutral-900 md:text-4xl md:leading-normal">
        Mood and sleep trends
      </h2>
      {hasNoMoodEntries ? (
        <p className="text-base leading-normal font-normal tracking-tight text-neutral-600 lg:text-center">
          Not enough data yet. Please add at least one entry.
        </p>
      ) : (
        // <MoodSleepChartNoSSR />
        <ChartNoSSR />
      )}
    </div>
  )
}

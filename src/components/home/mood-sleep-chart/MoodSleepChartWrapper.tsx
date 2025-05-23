"use client"
import dynamic from "next/dynamic"

const MoodSleepChartNoSSR = dynamic(
  () => import(`@/components/home/mood-sleep-chart/MoodSleepChart`),
  {
    ssr: false,
  }
)

export default function MoodSleepChartWrapper() {
  return (
    <div className="grid gap-8 rounded-2xl border border-blue-100 bg-white px-4 py-5 md:p-6">
      <h2 className="text-3xl leading-snug font-bold tracking-tight text-neutral-900 md:text-4xl md:leading-normal">
        Mood and sleep trends
      </h2>
      <MoodSleepChartNoSSR />
    </div>
  )
}

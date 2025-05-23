import React from "react"

import MoodCard from "@/components/home/daily-summary/MoodCard"
import ReflectionCard from "@/components/home/daily-summary/ReflectionCard"
import SleepCard from "@/components/home/daily-summary/SleepCard"

export default function DailySummary() {
  return (
    <div className="grid gap-y-5 lg:grid-cols-[minmax(0,_41.875rem)_1fr] lg:grid-rows-[auto_1fr] lg:gap-x-8">
      <MoodCard />
      <SleepCard />
      <ReflectionCard />
    </div>
  )
}

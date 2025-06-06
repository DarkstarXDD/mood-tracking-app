"use client"

import MoodLogDialog from "@/components/home/mood-logging/MoodLogDialog"
import TodayDate from "@/components/home/TodayDate"
import useUser from "@/hooks/useUser"
import { getFirstName } from "@/lib/utils"

export default function Hero() {
  const { user } = useUser()

  return (
    <div className="flex flex-col items-center justify-center gap-12 lg:gap-16">
      <div className="grid justify-items-center gap-4 text-center md:gap-2.5">
        <p className="text-2xl leading-normal font-bold tracking-tight text-blue-600 md:text-4xl">
          Hello, {getFirstName(user.name)}!
        </p>
        <h1 className="text-6xl leading-tight font-bold tracking-tighter text-neutral-900 md:text-7xl md:leading-normal">
          How are you feeling today?
        </h1>
        <TodayDate />
      </div>

      {/* {!hasMoodLoggedToday && <MoodLogDialog />} */}
      <MoodLogDialog />
    </div>
  )
}

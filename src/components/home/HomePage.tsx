"use client"

import { isSameDay } from "date-fns"
import { createContext } from "react"

import CheckinSummary from "@/components/home/checkin-summary/CheckinSummary"
import DailySummary from "@/components/home/daily-summary/DailySummary"
import Header from "@/components/home/Header"
import Hero from "@/components/home/Hero"
import MoodSleepChartWrapper from "@/components/home/mood-sleep-chart/MoodSleepChartWrapper"

import type { GetMoodFormOptionsType } from "@/lib/data-access/mood"
import type { GetUserType } from "@/lib/data-access/user"

type UserContextType = {
  user: GetUserType
  hasMoodLoggedToday: boolean
  hasFiveEntries: boolean
} | null

export const UserContext = createContext<UserContextType>(null)
export const MoodFormOptionsContext =
  createContext<GetMoodFormOptionsType | null>(null)

type HomePageProps = {
  user: GetUserType
  moodFormOptions: GetMoodFormOptionsType
}

export default function HomePage({ user, moodFormOptions }: HomePageProps) {
  const hasMoodLoggedToday =
    user.moodEntries.length > 0 &&
    isSameDay(new Date(), new Date(user.moodEntries[0].createdAt))

  const hasFiveEntries = user.moodEntries.length >= 5

  return (
    <UserContext.Provider value={{ user, hasMoodLoggedToday, hasFiveEntries }}>
      <MoodFormOptionsContext.Provider value={moodFormOptions}>
        <div className="grid w-full max-w-[73.125rem] gap-12 lg:gap-16">
          <Header />
          <main className="grid gap-12 lg:gap-16">
            <Hero />

            <div className="grid gap-8">
              {hasMoodLoggedToday && <DailySummary />}

              <div className="grid gap-8 lg:grid-cols-[auto_1fr]">
                <CheckinSummary />
                <MoodSleepChartWrapper />
              </div>
            </div>
          </main>
        </div>
      </MoodFormOptionsContext.Provider>
    </UserContext.Provider>
  )
}

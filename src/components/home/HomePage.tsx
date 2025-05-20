"use client"

import { createContext } from "react"

import AverageMoodCard from "@/components/home/average-data/AverageMoodCard"
import AverageSleepCard from "@/components/home/average-data/AverageSleepCard"
import Header from "@/components/home/Header"
import Hero from "@/components/home/Hero"
import MoodCard from "@/components/home/MoodCard"
import ReflectionCard from "@/components/home/ReflectionCard"
import SleepCard from "@/components/home/SleepCard"

import type { GetUserType, GetMoodTagsType } from "@/lib/data-access/user"

export const UserContext = createContext<GetUserType | null>(null)
export const MoodFormOptionsContext = createContext<GetMoodTagsType | null>(
  null
)

type HomePageProps = {
  user: GetUserType
  moodTags: GetMoodTagsType
}

export default function HomePage({ user, moodTags }: HomePageProps) {
  return (
    <UserContext.Provider value={user}>
      <MoodFormOptionsContext.Provider value={moodTags}>
        <div className="grid w-full max-w-[73.125rem] gap-12 lg:gap-16">
          <Header />
          <main className="grid gap-16">
            <Hero />

            <div className="grid gap-x-8 gap-y-5 lg:grid-cols-[minmax(0,_41.875rem)_1fr] lg:grid-rows-[auto_1fr]">
              <MoodCard />
              <SleepCard />
              <ReflectionCard />
            </div>

            <div className="grid gap-6 rounded-2xl border border-blue-100 bg-white px-4 py-5 md:px-5 md:py-6 lg:px-6">
              <AverageMoodCard />
              <AverageSleepCard />
            </div>
          </main>
        </div>
      </MoodFormOptionsContext.Provider>
    </UserContext.Provider>
  )
}

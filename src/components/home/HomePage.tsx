"use client"

import { createContext } from "react"

import AverageMood from "@/components/home/AverageMood"
import AverageSleep from "@/components/home/AverageSleep"
import Header from "@/components/home/Header"
import Hero from "@/components/home/Hero"

import type { GetUserType } from "@/lib/dal/user"

export const UserContext = createContext<GetUserType | null>(null)

export default function HomePage({ user }: { user: GetUserType }) {
  return (
    <UserContext.Provider value={user}>
      <div className="grid w-full max-w-[73.125rem] gap-12 lg:gap-16">
        <Header />
        <main className="grid gap-16">
          <Hero />
          <div className="grid gap-6 rounded-2xl border border-blue-100 bg-white px-4 py-5 md:px-5 md:py-6 lg:px-6">
            <AverageMood />
            <AverageSleep />
          </div>
        </main>
      </div>
    </UserContext.Provider>
  )
}

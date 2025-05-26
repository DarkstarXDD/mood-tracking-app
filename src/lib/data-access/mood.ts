import "server-only"

import { redirect } from "next/navigation"

import { verifySession } from "@/lib/data-access/auth"
import { prisma } from "@/lib/prisma"

export async function getMoodFormOptions() {
  const userId = await verifySession()
  if (!userId) redirect("/login")

  const [moods, moodTags, hoursOfSleep] = await Promise.all([
    prisma.mood.findMany({
      orderBy: { id: "desc" },
    }),

    prisma.moodTag.findMany({
      select: { name: true },
      orderBy: { name: "asc" },
    }),

    prisma.hoursOfSleep.findMany({
      orderBy: { id: "desc" },
    }),
  ])
  return { moods, moodTags, hoursOfSleep }
}

export type GetMoodFormOptionsType = Awaited<
  ReturnType<typeof getMoodFormOptions>
>

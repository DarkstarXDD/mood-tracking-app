import "server-only"

import { cookies } from "next/headers"
import { redirect } from "next/navigation"
import { cache } from "react"

import { messages } from "@/lib/messages"
import { prisma } from "@/lib/prisma"
import { verifyToken } from "@/lib/session"

import type { MoodFormSchemaType, UserProfileSchemaType } from "@/lib/schema"

export const verifySession = cache(async () => {
  const token = (await cookies()).get("token")?.value
  const session = await verifyToken(token)

  if (!session?.userId) return undefined
  return session.userId
})

export async function getUser() {
  const userId = await verifySession()
  if (!userId) redirect("/login")

  const user = await prisma.user.findUniqueOrThrow({
    where: { id: userId },
    select: {
      name: true,
      email: true,
      avatarUrl: true,
      moodEntries: {
        take: 10,
        orderBy: { createdAt: "desc" },
        omit: {
          updatedAt: true,
          userId: true,
        },
        include: { tags: true },
      },
    },
  })
  return user
}
export type GetUserType = Awaited<ReturnType<typeof getUser>>

export async function getMoodTags() {
  const userId = await verifySession()
  if (!userId) redirect("/login")

  const moodTags = await prisma.moodTag.findMany({
    select: {
      name: true,
    },
    orderBy: {
      name: "asc",
    },
  })
  return moodTags
}
export type GetMoodTagsType = Awaited<ReturnType<typeof getMoodTags>>

export async function updateUser({ name, avatarUrl }: UserProfileSchemaType) {
  const userId = await verifySession()
  if (!userId) redirect("/login")

  try {
    await prisma.user.update({
      where: { id: userId },
      data: { name: name, avatarUrl: avatarUrl },
      select: { id: true },
    })
  } catch {
    return messages.errors.generic
  }
}

export async function checkIsOnboarded() {
  const userId = await verifySession()
  if (!userId) redirect("/login")

  const user = await prisma.user.findFirst({
    where: { id: userId, name: { not: null } },
    select: { id: true },
  })

  return !!user
}

const moodMap = {
  veryHappy: "VeryHappy",
  happy: "Happy",
  neutral: "Neutral",
  sad: "Sad",
  verySad: "VerySad",
} as const

export async function createMoodEntry(moodData: MoodFormSchemaType) {
  const userId = await verifySession()
  if (!userId) redirect("/login")

  try {
    await prisma.moodEntry.create({
      data: {
        mood: moodMap[moodData.mood],
        tags: {
          connect: moodData.moodTags.map((tag) => ({ name: tag })),
        },
        note: moodData.dailyNote,
        sleep: moodData.hoursOfSleep,
        user: { connect: { id: userId } },
      },
    })
  } catch (e) {
    console.error(e)
    return messages.errors.generic
  }
}

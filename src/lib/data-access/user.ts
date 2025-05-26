import "server-only"

import { redirect } from "next/navigation"

import { verifySession } from "@/lib/data-access/auth"
import { messages } from "@/lib/messages"
import { prisma } from "@/lib/prisma"

import type { MoodFormSchemaType, UserProfileSchemaType } from "@/lib/schema"
import type { ActionResultType } from "@/lib/types"

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
        include: { tags: true, hoursOfSleep: true, mood: true },
      },
    },
  })
  return user
}
export type GetUserType = Awaited<ReturnType<typeof getUser>>

export async function updateUser({
  name,
  avatarUrl,
}: UserProfileSchemaType): Promise<ActionResultType> {
  const userId = await verifySession()
  if (!userId) redirect("/login")

  try {
    await prisma.user.update({
      where: { id: userId },
      data: { name: name, avatarUrl: avatarUrl },
      select: { id: true },
    })
    return { success: true }
  } catch {
    return { success: false, error: messages.errors.generic }
  }
}

export async function hasCompletedOnboarding() {
  const userId = await verifySession()
  if (!userId) redirect("/login")

  const user = await prisma.user.findFirst({
    where: { id: userId, name: { not: null } },
    select: { id: true },
  })

  return !!user
}

export async function createMoodEntry(moodData: MoodFormSchemaType) {
  const userId = await verifySession()
  if (!userId) redirect("/login")

  try {
    await prisma.moodEntry.create({
      data: {
        mood: { connect: { id: moodData.mood } },
        tags: {
          connect: moodData.moodTags.map((tag) => ({ name: tag })),
        },
        note: moodData.dailyNote,
        hoursOfSleep: { connect: { id: moodData.hoursOfSleep } },
        user: { connect: { id: userId } },
      },
    })
  } catch (e) {
    console.error(e)
    return messages.errors.generic
  }
}

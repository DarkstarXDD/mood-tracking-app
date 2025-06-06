import "server-only"

import { redirect } from "next/navigation"

import { cloudinary } from "@/lib/cloudinary"
import { verifySession } from "@/lib/data-access/auth"
import { messages } from "@/lib/messages"
import { prisma } from "@/lib/prisma"

import type {
  MoodFormSchemaType,
  UserProfileSchemaServerType,
} from "@/lib/schema"
import type { ActionResultType } from "@/lib/types"
import type { UploadApiResponse } from "cloudinary"

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

export async function getQuote(moodId: number) {
  const userId = await verifySession()
  if (!userId) redirect("/login")

  const quotes = await prisma.quote.findMany({ where: { moodId } })
  const quote = quotes[Math.floor(Math.random() * quotes.length)]
  return quote.quote
}

export async function updateUser({
  name,
  avatarFile,
}: UserProfileSchemaServerType): ActionResultType {
  const userId = await verifySession()
  if (!userId) redirect("/login")

  let cloudinaryResult: UploadApiResponse | undefined = undefined

  if (avatarFile && avatarFile.size > 0) {
    const arrayBuffer = await avatarFile.arrayBuffer()
    const buffer = Buffer.from(arrayBuffer)
    try {
      cloudinaryResult = await new Promise((resolve, reject) => {
        cloudinary.uploader
          .upload_stream(
            { resource_type: "image", folder: "mood-tracker/avatars" },
            (error, result) => {
              if (error || !result) return reject(error)
              resolve(result)
            }
          )
          .end(buffer)
      })
    } catch (e) {
      console.error(e)
      return { success: false, error: messages.errors.generic }
    }
  }

  try {
    await prisma.user.update({
      where: { id: userId },
      data: { name: name, avatarUrl: cloudinaryResult?.public_id },
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

export async function createMoodEntry(
  moodData: MoodFormSchemaType
): ActionResultType {
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
    return { success: true }
  } catch (e) {
    console.error(e)
    return { success: false, error: messages.errors.generic }
  }
}

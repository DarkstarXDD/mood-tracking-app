"use server"

import { Prisma } from "@prisma/client"
import { hash, compare } from "bcryptjs"
import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"

import * as user from "@/lib/data-access/user"
import { messages } from "@/lib/messages"
import { prisma } from "@/lib/prisma"
import { authSchema, moodFormSchema } from "@/lib/schema"
import { createSession } from "@/lib/session"

import type {
  AuthSchemaType,
  MoodFormSchemaType,
  UserProfileSchemaType,
} from "@/lib/schema"

export async function registerUser(userData: AuthSchemaType) {
  const validationResult = authSchema.safeParse(userData)
  if (!validationResult.success) return messages.errors.validation

  const hashedPassword = await hash(validationResult.data.password, 10)

  try {
    const user = await prisma.user.create({
      data: { email: validationResult.data.email, password: hashedPassword },
      select: { id: true },
    })

    await createSession(user.id)
  } catch (e) {
    if (e instanceof Prisma.PrismaClientKnownRequestError && e.code === "P2002")
      return messages.errors.existingEmail
    return messages.errors.generic
  }
  redirect("/")
}

export async function loginUser(userData: AuthSchemaType) {
  try {
    const user = await prisma.user.findUnique({
      where: { email: userData.email },
      select: { id: true, password: true },
    })

    if (!user) return messages.errors.invalidCredentials

    const isUserValid = await compare(userData.password, user.password)
    if (!isUserValid) return messages.errors.invalidCredentials

    await createSession(user.id)
  } catch {
    return messages.errors.generic
  }
  redirect("/")
}

export async function updateUser({ name, avatarUrl }: UserProfileSchemaType) {
  const response = await user.updateUser({ name, avatarUrl })
  if (response) {
    return response
  }
  redirect("/")
}

export async function createMoodEntry(moodData: MoodFormSchemaType) {
  const validationResult = moodFormSchema.safeParse(moodData)
  if (!validationResult.success) {
    return messages.errors.validation
  }

  const response = await user.createMoodEntry(validationResult.data)
  if (response) {
    return response
  }
  revalidatePath("/")
}

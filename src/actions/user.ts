"use server"

import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"

import * as user from "@/lib/data-access/user"
import { messages } from "@/lib/messages"
import { moodFormSchema } from "@/lib/schema"

import type { UserProfileSchemaType, MoodFormSchemaType } from "@/lib/schema"

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

"use server"

import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"

import * as user from "@/lib/data-access/user"
import { messages } from "@/lib/messages"
import { userProfileSchema, moodFormSchema } from "@/lib/schema"

import type { UserProfileSchemaType, MoodFormSchemaType } from "@/lib/schema"

export async function updateUser(formData: UserProfileSchemaType) {
  const parsed = userProfileSchema.safeParse(formData)
  if (!parsed.success) return messages.errors.validation

  const { name, avatarUrl } = parsed.data
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

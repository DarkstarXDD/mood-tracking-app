"use server"

import * as user from "@/lib/data-access/user"
import { messages } from "@/lib/messages"
import { userProfileSchema, moodFormSchema } from "@/lib/schema"

import type { UserProfileSchemaType, MoodFormSchemaType } from "@/lib/schema"
import type { ActionResultType } from "@/lib/types"

export async function updateUser(
  formData: UserProfileSchemaType
): ActionResultType {
  const parsed = userProfileSchema.safeParse(formData)
  if (!parsed.success)
    return { success: false, error: messages.errors.validation }
  const response = await user.updateUser(parsed.data)
  return response
}

export async function createMoodEntry(
  moodData: MoodFormSchemaType
): ActionResultType {
  const parsed = moodFormSchema.safeParse(moodData)
  if (!parsed.success) {
    return { success: false, error: messages.errors.validation }
  }
  const response = await user.createMoodEntry(parsed.data)
  return response
}

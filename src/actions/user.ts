"use server"

import { revalidatePath } from "next/cache"

import * as user from "@/lib/data-access/user"
import { messages } from "@/lib/messages"
import { userProfileSchema, moodFormSchema } from "@/lib/schema"

import type { UserProfileSchemaType, MoodFormSchemaType } from "@/lib/schema"
import type { ActionResultType } from "@/lib/types"

export async function updateUser(
  formData: UserProfileSchemaType
): Promise<ActionResultType> {
  const parsed = userProfileSchema.safeParse(formData)
  if (!parsed.success)
    return { success: false, error: messages.errors.validation }

  const { name, avatarUrl } = parsed.data
  const response = await user.updateUser({ name, avatarUrl })
  return response
}

export async function createMoodEntry(moodData: MoodFormSchemaType) {
  const parsed = moodFormSchema.safeParse(moodData)
  if (!parsed.success) {
    return messages.errors.validation
  }

  const response = await user.createMoodEntry(parsed.data)
  if (response) {
    return response
  }
  revalidatePath("/")
}

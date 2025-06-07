"use server"

import { z } from "zod"

import * as user from "@/lib/data-access/user"
import { errorMessages } from "@/lib/error-messages"
import {
  userProfileSchemaClient,
  moodFormSchema,
  userProfileSchemaServer,
  type MoodFormSchemaType,
} from "@/lib/schema"

import type { ActionResultType } from "@/lib/types"

type UpdateUserData = z.input<typeof userProfileSchemaClient>

export async function updateUser(formData: UpdateUserData): ActionResultType {
  const parsed = userProfileSchemaServer.safeParse(formData)
  if (!parsed.success)
    return { success: false, error: errorMessages.validation }
  const response = await user.updateUser(parsed.data)
  return response
}

export async function createMoodEntry(
  moodData: MoodFormSchemaType
): ActionResultType {
  const parsed = moodFormSchema.safeParse(moodData)
  if (!parsed.success) {
    return { success: false, error: errorMessages.validation }
  }
  const response = await user.createMoodEntry(parsed.data)
  return response
}

import { z } from "zod"

export const authSchema = z.object({
  email: z.string().trim().email("Invalid email format"),
  password: z
    .string()
    .trim()
    .min(8, "Password must have at least 8 characters"),
})
export type AuthSchemaType = z.infer<typeof authSchema>

export const userProfileSchema = z.object({
  name: z.string().trim().min(1, "Name cannot be empty."),
  avatarUrl: z.string().optional(),
})
export type userProfileSchemaType = z.infer<typeof userProfileSchema>

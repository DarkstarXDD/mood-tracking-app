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
export type UserProfileSchemaType = z.infer<typeof userProfileSchema>

export const moodFormSchema = z.object({
  mood: z.enum(["veryHappy", "happy", "neutral", "sad", "verySad"], {
    required_error: "Please select a mood before continuing.",
  }),
  moodTags: z
    .array(z.string(), {
      required_error: "Please select at least one tag.",
      invalid_type_error: "Please select at least one tag.",
    })
    .nonempty("Please select at least one tag.")
    .max(3, "You can only select a maximum of 3 tags."),
  dailyNote: z.string().trim().max(150),
  hoursOfSleep: z.enum(
    [
      "OverNineHours",
      "SevenToEightHours",
      "FiveToSixHours",
      "ThreeToFourHours",
      "ZeroToTwoHours",
    ],
    { required_error: "Please select the number of hours before continuing." }
  ),
})
export type MoodFormSchemaType = z.infer<typeof moodFormSchema>

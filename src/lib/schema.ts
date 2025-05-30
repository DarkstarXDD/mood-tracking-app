import { z } from "zod"

/*
---------------
  SignUp Schema
---------------
*/
export const signUpSchema = z.object({
  email: z.string().trim().email("Invalid email format."),
  password: z
    .string()
    .trim()
    .min(8, "Password must have at least 8 characters."),
})
export type SignUpSchemaType = z.infer<typeof signUpSchema>

/*
---------------
  LogIn Schema
---------------
*/
export const logInSchema = z.object({
  email: z.string().trim().email("Invalid email format."),
  password: z.string().trim().min(1, "Password is required."),
})
export type LogInSchemaType = z.infer<typeof logInSchema>

/*
---------------------
  User Profile Schema
---------------------
*/
export const userProfileSchema = z.object({
  name: z.string().trim().min(1, "Name cannot be empty."),
  avatarUrl: z.string().optional(),
})
export type UserProfileSchemaType = z.infer<typeof userProfileSchema>

/*
-------------------
  Mood Form Schema
-------------------
*/
export const moodFormSchema = z.object({
  mood: z.coerce
    .number({
      required_error: "Please select a mood before continuing.",
      invalid_type_error: "Please select a mood before continuing.",
    })
    .int()
    .min(1)
    .max(5),

  moodTags: z
    .array(z.string(), {
      required_error: "Please select at least one tag.",
      invalid_type_error: "Please select at least one tag.",
    })
    .nonempty("Please select at least one tag.")
    .max(3, "You can only select a maximum of 3 tags."),

  dailyNote: z.string().trim().max(150).optional(),

  hoursOfSleep: z.coerce
    .number({
      required_error: "Please select the number of hours before continuing.",
      invalid_type_error:
        "Please select the number of hours before continuing.",
    })
    .int()
    .min(1)
    .max(5),
})
export type MoodFormSchemaType = z.infer<typeof moodFormSchema>

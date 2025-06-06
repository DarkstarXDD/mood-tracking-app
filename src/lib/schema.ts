import { z } from "zod"

/*
--------------------------------------
  Signup Schema

  Why separate schemas called `login` and `signup` instead of one schema called `auth`?
  Sometimes the signup schema may have more fields than the login schema.
  I technically could use the same schema and `pick` the needed fields and types for each form from that one schema,
  but i instead went with separate schemas.
  Maybe it's something i would change in the future.
--------------------------------------
*/
export const signupSchema = z.object({
  email: z.string().trim().email("Invalid email format."),
  password: z
    .string()
    .trim()
    .min(8, "Password must have at least 8 characters."),
})
export type SignupSchemaType = z.infer<typeof signupSchema>

/*
---------------
  Login Schema
---------------
*/
export const loginSchema = z.object({
  email: z.string().trim().email("Invalid email format."),
  password: z.string().trim().min(1, "Password is required."),
})
export type LoginSchemaType = z.infer<typeof loginSchema>

/*
---------------------------------------
  User Profile Schema
  
  Why 2 schemas called Client and Server? RHF passes a FileList to the schema. So i need to accept that in the schema.
  But the `FileList` type is not available in Node. It's only available in the browser. So i had to do some transform work with zod.
  But the resulting schema i got doesn't work well with `File` input. It only works with `FileList`.
  On the server the schema receives a `File`. So i created a separate schema for the server.
---------------------------------------
*/
const allowedFileTypes = ["image/png", "image/jpeg", "image/jpg"]
const maximumFileSize = 251000

const AvatarFileSchema = z
  .instanceof(File)
  .refine((file) => allowedFileTypes.includes(file.type), {
    message: "Invalid image file type.",
  })
  .refine((file) => file.size < maximumFileSize, {
    message: "File size should not exceed 250KB.",
  })
  .optional()

export const userProfileSchemaClient = z.object({
  name: z.string().trim().min(1, "Name cannot be empty."),
  avatarFile: z.preprocess((val) => {
    try {
      const files = Array.from(val as File[])
      return files.length > 0 ? files[0] : undefined
    } catch {
      console.log("It is undefined")
      return undefined
    }
  }, AvatarFileSchema),
})

export type UserProfileSchemaClientType = z.infer<
  typeof userProfileSchemaClient
>

export const userProfileSchemaServer = z.object({
  name: z.string().trim().min(1, "Name cannot be empty."),
  avatarFile: AvatarFileSchema,
})
export type UserProfileSchemaServerType = z.infer<
  typeof userProfileSchemaServer
>

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

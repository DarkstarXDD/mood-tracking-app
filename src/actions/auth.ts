"use server"

import { Prisma } from "@prisma/client"
import { hash, compare } from "bcryptjs"
import { cookies } from "next/headers"
import { redirect } from "next/navigation"

import { errorMessages } from "@/lib/error-messages"
import { prisma } from "@/lib/prisma"
import { signupSchema, loginSchema } from "@/lib/schema"
import { createSession } from "@/lib/session"

import type { SignupSchemaType, LoginSchemaType } from "@/lib/schema"

export async function registerUser(formData: SignupSchemaType) {
  const parsed = signupSchema.safeParse(formData)
  if (!parsed.success)
    return { success: false, error: errorMessages.validation }

  const hashedPassword = await hash(parsed.data.password, 10)

  try {
    const user = await prisma.user.create({
      data: { email: parsed.data.email, password: hashedPassword },
      select: { id: true },
    })
    await createSession(user.id)
  } catch (e) {
    if (e instanceof Prisma.PrismaClientKnownRequestError && e.code === "P2002")
      return { success: false, error: errorMessages.existingEmail }
    return { success: false, error: errorMessages.generic }
  }
  redirect("/onboarding")
}

export async function loginUser(formData: LoginSchemaType) {
  const parsed = loginSchema.safeParse(formData)
  if (!parsed.success)
    return { success: false, error: errorMessages.validation }

  try {
    const user = await prisma.user.findUnique({
      where: { email: formData.email },
      select: { id: true, password: true },
    })
    if (!user)
      return { success: false, error: errorMessages.invalidCredentials }

    const isPasswordValid = await compare(formData.password, user.password)
    if (!isPasswordValid)
      return { success: false, error: errorMessages.invalidCredentials }

    await createSession(user.id)
  } catch {
    return { success: false, error: errorMessages.generic }
  }
  redirect("/")
}

export async function logoutUser() {
  const cookieStore = await cookies()
  cookieStore.delete("token")
  redirect("/login")
}

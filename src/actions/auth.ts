"use server"

import { Prisma } from "@prisma/client"
import { hash, compare } from "bcryptjs"
import { redirect } from "next/navigation"

import { messages } from "@/lib/messages"
import { prisma } from "@/lib/prisma"
import { signUpSchema } from "@/lib/schema"
import { createSession } from "@/lib/session"

import type { SignUpSchemaType, LogInSchemaType } from "@/lib/schema"

export async function registerUser(formData: SignUpSchemaType) {
  const parsed = signUpSchema.safeParse(formData)
  if (!parsed.success) return messages.errors.validation

  const hashedPassword = await hash(parsed.data.password, 10)

  try {
    const user = await prisma.user.create({
      data: { email: parsed.data.email, password: hashedPassword },
      select: { id: true },
    })

    await createSession(user.id)
  } catch (e) {
    if (e instanceof Prisma.PrismaClientKnownRequestError && e.code === "P2002")
      return messages.errors.existingEmail
    return messages.errors.generic
  }
  redirect("/onboarding")
}

export async function loginUser(formData: LogInSchemaType) {
  try {
    const user = await prisma.user.findUnique({
      where: { email: formData.email },
      select: { id: true, password: true },
    })

    if (!user) return messages.errors.invalidCredentials

    const isPasswordValid = await compare(formData.password, user.password)
    if (!isPasswordValid) return messages.errors.invalidCredentials

    await createSession(user.id)
  } catch {
    return messages.errors.generic
  }
  redirect("/")
}

"use server"

import { Prisma } from "@prisma/client"
import { hash, compare } from "bcryptjs"
import { redirect } from "next/navigation"

import { prisma } from "@/lib/prisma/prisma"
import { authSchema } from "@/lib/schema"
import { createSession } from "@/lib/session"

import type { AuthSchemaType } from "@/lib/schema"

export async function registerUser(userData: AuthSchemaType) {
  const validationResult = authSchema.safeParse(userData)

  if (!validationResult.success) {
    return {
      type: "validation_error",
      message: "Server validation error. Please try again.",
    }
  }

  const hashedPassword = await hash(validationResult.data.password, 10)

  try {
    const user = await prisma.user.create({
      data: {
        email: validationResult.data.email,
        password: hashedPassword,
      },
      select: {
        id: true,
      },
    })

    await createSession(user.id)
  } catch (e) {
    if (
      e instanceof Prisma.PrismaClientKnownRequestError &&
      e.code === "P2002"
    ) {
      return {
        type: "auth_error",
        message:
          "An account with this email already exists. Try logging in instead.",
      }
    }

    return {
      type: "server_error",
      message: "Something went wrong. Please try again.",
    }
  }
  redirect("/")
}

export async function loginUser(userData: AuthSchemaType) {
  try {
    const user = await prisma.user.findUnique({
      where: {
        email: userData.email,
      },
      select: {
        id: true,
        password: true,
      },
    })

    if (!user) {
      return {
        type: "auth_error",
        message: "Incorrect username or password.",
      }
    }

    const isUserValid = await compare(userData.password, user.password)

    if (!isUserValid) {
      return {
        type: "auth_error",
        message: "Incorrect username or password.",
      }
    }
    await createSession(user.id)
  } catch {
    return {
      type: "server_error",
      message: "Something went wrong. Please try again.",
    }
  }
  redirect("/")
}

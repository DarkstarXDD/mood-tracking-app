"use server"

import { Prisma } from "@prisma/client"

import { prisma } from "@/lib/prisma/prisma"
import { authSchema } from "@/lib/schema"
import { createSession } from "@/lib/session"

import type { AuthSchemaType } from "@/lib/schema"

export async function addNewUser(userData: AuthSchemaType) {
  console.log(userData)

  const validationResult = authSchema.safeParse(userData)
  if (!validationResult.success) {
    return {
      type: "server_error",
      message: "Server validation error. Please try again.",
    }
  }

  try {
    const user = await prisma.user.create({
      data: validationResult.data,
      select: {
        id: true,
      },
    })
    await createSession(user.id)
  } catch (e) {
    if (
      e instanceof Prisma.PrismaClientKnownRequestError &&
      e.code === "P2001"
    ) {
      return {
        type: "server_error",
        message:
          "An account with this email already exists. Try logging in instead.",
      }
    }

    return {
      type: "server_error",
      message: "Something went wrong. Please try again.",
    }
  }
}

import "server-only"

import { cookies } from "next/headers"
import { redirect } from "next/navigation"
import { cache } from "react"

import { messages } from "@/lib/messages"
import { prisma } from "@/lib/prisma/prisma"
import { userProfileSchemaType } from "@/lib/schema"
import { verifyToken } from "@/lib/session"

export const verifySession = cache(async () => {
  const token = (await cookies()).get("token")?.value
  const session = await verifyToken(token)

  if (!session?.userId) return undefined

  return session.userId
})

export async function updateUser({ name, avatarUrl }: userProfileSchemaType) {
  const userId = await verifySession()

  if (!userId) {
    redirect("/login")
  }

  try {
    const user = await prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        name: name,
        avatarUrl: avatarUrl,
      },
      select: {
        id: true,
      },
    })
    console.log({ name, avatarUrl })
    console.log(user)
  } catch {
    return messages.errors.generic
  }
}

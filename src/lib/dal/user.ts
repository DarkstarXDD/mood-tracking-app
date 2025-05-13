import "server-only"

import { cookies } from "next/headers"
import { redirect } from "next/navigation"
import { cache } from "react"

import { messages } from "@/lib/messages"
import { prisma } from "@/lib/prisma"
import { verifyToken } from "@/lib/session"

import type { UserProfileSchemaType } from "@/lib/schema"

export const verifySession = cache(async () => {
  const token = (await cookies()).get("token")?.value
  const session = await verifyToken(token)

  if (!session?.userId) return undefined
  return session.userId
})

export async function updateUser({ name, avatarUrl }: UserProfileSchemaType) {
  const userId = await verifySession()
  if (!userId) redirect("/login")

  try {
    await prisma.user.update({
      where: { id: userId },
      data: { name: name, avatarUrl: avatarUrl },
      select: { id: true },
    })
  } catch {
    return messages.errors.generic
  }
}

export async function checkIsOnboarded() {
  const userId = await verifySession()
  if (!userId) redirect("/login")

  const user = await prisma.user.findFirst({
    where: { id: userId, name: { not: null } },
    select: { id: true },
  })

  return !!user
}

import "server-only"

import { cookies } from "next/headers"
import { cache } from "react"

import { verifyToken } from "@/lib/session"

export const verifySession = cache(async () => {
  const token = (await cookies()).get("token")?.value
  const session = await verifyToken(token)

  if (!session?.userId) return undefined
  return session.userId
})

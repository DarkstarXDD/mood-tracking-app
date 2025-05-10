import "server-only"

import { cookies } from "next/headers"
import { redirect } from "next/navigation"
import { cache } from "react"

// import { prisma } from "@/lib/prisma/prisma"
import { verifyToken } from "@/lib/session"

export const verifySession = cache(async () => {
  const token = (await cookies()).get("token")?.value
  const session = await verifyToken(token)

  if (!session?.userId) return undefined

  return session.userId
})

export async function updateUser() {
  const userId = await verifySession()

  if (!userId) {
    redirect("/login")
  }

  // const user = await prisma.user.update({
  //   where: {
  //     id: userId,
  //   },
  //   data: null,
  // })
}

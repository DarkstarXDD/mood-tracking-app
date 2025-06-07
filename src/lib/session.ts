import "server-only"

import { SignJWT, jwtVerify } from "jose"
import { cookies } from "next/headers"

const secretKey = process.env.SESSION_SECRET
const encodedSecretKey = new TextEncoder().encode(secretKey)

async function createToken(payload: { userId: string }) {
  const token = new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("7d")
    .sign(encodedSecretKey)
  return token
}

export async function createSession(userId: string) {
  const expiresAt = new Date(Date.now() + 1000 * 60 * 60 * 24 * 7)
  const token = await createToken({ userId: userId })
  const cookieStore = await cookies()
  cookieStore.set("token", token, {
    httpOnly: true,
    secure: true,
    expires: expiresAt,
    sameSite: "lax",
  })
}

export async function verifyToken(token: string | undefined = "") {
  try {
    const { payload } = await jwtVerify<{ userId: string }>(
      token,
      encodedSecretKey,
      {
        algorithms: ["HS256"],
      }
    )
    return payload
  } catch {
    return undefined
  }
}

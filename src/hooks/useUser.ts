import { useContext } from "react"

import { UserContext } from "@/components/home/HomePage"

export default function useUser() {
  const context = useContext(UserContext)
  if (!context) {
    throw new Error("useUser must be used within a UserContext.Provider")
  }
  return context
}

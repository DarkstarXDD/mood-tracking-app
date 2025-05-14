import { useContext } from "react"

import { UserContext } from "@/components/home/HomePage"

export default function useUser() {
  const context = useContext(UserContext)
  return context
}

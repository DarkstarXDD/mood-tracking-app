import { useContext } from "react"

import { UserContext } from "@/components/home/HomePage"

export default function useUser() {
  return useContext(UserContext)
}

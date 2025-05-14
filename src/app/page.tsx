import { redirect } from "next/navigation"

import HomePage from "@/components/home/HomePage"
import { checkIsOnboarded, getUser } from "@/lib/dal/user"

export default async function Home() {
  if (!(await checkIsOnboarded())) {
    redirect("/onboarding")
  }

  const user = await getUser()

  return <HomePage user={user} />
}

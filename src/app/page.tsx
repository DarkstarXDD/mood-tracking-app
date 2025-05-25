import { redirect } from "next/navigation"

import HomePage from "@/components/home/HomePage"
import {
  hasCompletedOnboarding,
  getMoodTags,
  getUser,
} from "@/lib/data-access/user"

export default async function Home() {
  if (!(await hasCompletedOnboarding())) {
    redirect("/onboarding")
  }

  const user = await getUser()
  const moodTags = await getMoodTags()

  return <HomePage user={user} moodTags={moodTags} />
}

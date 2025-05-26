import { redirect } from "next/navigation"

import HomePage from "@/components/home/HomePage"
import { getMoodFormOptions } from "@/lib/data-access/mood"
import { hasCompletedOnboarding, getUser } from "@/lib/data-access/user"

export default async function Home() {
  if (!(await hasCompletedOnboarding())) {
    redirect("/onboarding")
  }

  const user = await getUser()
  const moodFormOptions = await getMoodFormOptions()

  return <HomePage user={user} moodFormOptions={moodFormOptions} />
}

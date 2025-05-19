import { redirect } from "next/navigation"

import HomePage from "@/components/home/HomePage"
import { checkIsOnboarded, getMoodTags, getUser } from "@/lib/dal/user"

export default async function Home() {
  if (!(await checkIsOnboarded())) {
    redirect("/onboarding")
  }

  const user = await getUser()
  const moodTags = await getMoodTags()

  return <HomePage user={user} moodTags={moodTags} />
}

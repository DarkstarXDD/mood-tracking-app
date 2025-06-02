import { redirect } from "next/navigation"

import HomePage from "@/components/home/HomePage"
import { getMoodFormOptions } from "@/lib/data-access/mood"
import {
  hasCompletedOnboarding,
  getUser,
  getQuote,
} from "@/lib/data-access/user"

export default async function Home() {
  if (!(await hasCompletedOnboarding())) {
    redirect("/onboarding")
  }

  const user = await getUser()
  const moodFormOptions = await getMoodFormOptions()
  let dailyQuote: string | undefined = undefined

  if (user.moodEntries.length > 0) {
    const moodId = user.moodEntries[0].mood.id
    dailyQuote = await getQuote(moodId)
  }

  const todayMood = user.moodEntries[0]

  if (todayMood)
    return (
      <HomePage
        user={user}
        dailyQuote={dailyQuote}
        moodFormOptions={moodFormOptions}
      />
    )
}

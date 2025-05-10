import { redirect } from "next/navigation"

import { checkIsOnboarded } from "@/lib/dal/user"

export default async function Home() {
  if (!(await checkIsOnboarded())) {
    redirect("/onboarding")
  }
  return (
    <main>
      <div>Hello world!</div>
    </main>
  )
}

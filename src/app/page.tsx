import { redirect } from "next/navigation"

import Header from "@/components/home/Header"
import Hero from "@/components/home/Hero"
import { checkIsOnboarded } from "@/lib/dal/user"

export default async function Home() {
  if (!(await checkIsOnboarded())) {
    redirect("/onboarding")
  }
  return (
    <div className="grid w-full max-w-[73.125rem] gap-12 lg:gap-16">
      <Header />
      <main>
        <Hero />
      </main>
    </div>
  )
}

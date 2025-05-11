import { redirect } from "next/navigation"

import AverageMood from "@/components/home/AverageMood"
import AverageSleep from "@/components/home/AverageSleep"
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
      <main className="grid gap-16">
        <Hero />
        <div className="grid gap-6 rounded-2xl border border-blue-100 bg-white px-4 py-5 md:px-5 md:py-6 lg:px-6">
          <AverageMood />
          <AverageSleep />
        </div>
      </main>
    </div>
  )
}

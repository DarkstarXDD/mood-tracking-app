"use client"

import { useRouter } from "next/navigation"

import UpdateProfileForm from "@/components/home/account-menu/UpdateProfileForm"

export default function Onboarding() {
  const router = useRouter()

  return (
    <div className="shadow-main grid w-full max-w-lg gap-8 rounded-2xl bg-white px-4 py-10 md:px-8">
      <div className="grid gap-2">
        <h1 className="text-4xl leading-normal font-bold tracking-tight text-neutral-900">
          Personalize your experience
        </h1>
        <p className="text-lg leading-normal tracking-tight text-neutral-600">
          Add your name and a profile picture to make Mood yours.
        </p>
      </div>

      <UpdateProfileForm
        buttonText="Start Tracking"
        onSuccess={() => router.replace("/")}
      />
    </div>
  )
}

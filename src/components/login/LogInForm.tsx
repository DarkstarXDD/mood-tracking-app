"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import Link from "next/link"
import { useForm } from "react-hook-form"

import Button from "@/components/ui/Button"
import TextField from "@/components/ui/TextField"
import { authSchema } from "@/lib/schema"

import type { AuthSchemaType } from "@/lib/schema"

export default function LogInForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AuthSchemaType>({
    resolver: zodResolver(authSchema),
  })

  return (
    <form
      className="shadow-main grid w-full max-w-lg gap-8 rounded-2xl bg-white px-4 py-10 md:px-8"
      onSubmit={handleSubmit((data) => console.log(data))}
    >
      <div className="grid gap-2">
        <h1 className="text-4xl leading-normal font-bold tracking-tight text-neutral-900">
          Welcome back!
        </h1>
        <p className="text-lg leading-normal tracking-tight text-neutral-600">
          Log in to continue tracking your mood and sleep.
        </p>
      </div>

      <div className="grid gap-5">
        <TextField
          label="Email address"
          {...register("email")}
          errorMessage={errors.email?.message}
        />
        <TextField
          label="Password"
          type="password"
          {...register("password")}
          errorMessage={errors.password?.message}
        />
      </div>

      <div className="grid gap-5">
        <Button>Log In</Button>

        <p className="text-center text-lg leading-normal tracking-tight">
          <span className="text-neutral-600">
            Haven&apos;t got an account?{" "}
          </span>
          <Link
            href="/signup"
            className="text-blue-600 underline hover:text-blue-700"
          >
            Sign up.
          </Link>
        </p>
      </div>
    </form>
  )
}

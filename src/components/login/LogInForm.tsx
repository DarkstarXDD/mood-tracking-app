"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import Link from "next/link"
import { useForm } from "react-hook-form"

import { loginUser } from "@/actions/auth"
import Button from "@/components/ui/Button"
import TextField from "@/components/ui/TextField"
import { logInSchema } from "@/lib/schema"

import type { LogInSchemaType } from "@/lib/schema"

export default function LogInForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<LogInSchemaType>({
    resolver: zodResolver(logInSchema),
  })

  return (
    <form
      className="shadow-main grid w-full max-w-lg gap-8 rounded-2xl bg-white px-4 py-10 md:px-8"
      onSubmit={handleSubmit(async (formData) => {
        const response = await loginUser(formData)
        if (response) {
          setError("email", response)
        }
      })}
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
          autoComplete="email"
          {...register("email")}
          errorMessage={errors.email?.message}
        />
        <TextField
          label="Password"
          type="password"
          autoComplete="current-password"
          {...register("password")}
          errorMessage={errors.password?.message}
        />
      </div>

      <div className="grid gap-5">
        <Button type="submit">Log In</Button>

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

"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import Link from "next/link"
import { useForm } from "react-hook-form"

import { addNewUser } from "@/action/auth"
import Button from "@/components/ui/Button"
import TextField from "@/components/ui/TextField"
import { authSchema } from "@/lib/schema"

import type { AuthSchemaType } from "@/lib/schema"

export default function SignUpForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<AuthSchemaType>({
    resolver: zodResolver(authSchema),
  })

  return (
    <form
      className="shadow-main grid w-full max-w-lg gap-8 rounded-2xl bg-white px-4 py-10 md:px-8"
      onSubmit={handleSubmit(async (data) => {
        const response = await addNewUser(data)
        if (response) {
          setError("email", response)
        }
      })}
    >
      <div className="grid gap-2">
        <h1 className="text-4xl leading-normal font-bold tracking-tight text-neutral-900">
          Create an account
        </h1>
        <p className="text-lg leading-normal tracking-tight text-neutral-600">
          Join to track your daily mood and sleep with ease.
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
        <Button>Sign Up</Button>

        <p className="text-center text-lg leading-normal tracking-tight">
          <span className="text-neutral-600">Already got an account? </span>
          <Link
            href="/login"
            className="text-blue-600 underline hover:text-blue-700"
          >
            Log in.
          </Link>
        </p>
      </div>
    </form>
  )
}

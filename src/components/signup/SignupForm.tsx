"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import Link from "next/link"
import { useState } from "react"
import { useForm } from "react-hook-form"

import { registerUser } from "@/actions/auth"
import Button from "@/components/ui/Button"
import LoadingDots from "@/components/ui/LoadingDots"
import TextField from "@/components/ui/TextField"
import { signupSchema, type SignupSchemaType } from "@/lib/schema"

export default function SignupForm() {
  const [status, setStatus] = useState<"idle" | "loading">("idle")
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<SignupSchemaType>({
    resolver: zodResolver(signupSchema),
  })

  return (
    <form
      className="shadow-main grid w-full max-w-lg gap-5 rounded-2xl bg-white px-4 py-10 md:px-8"
      onSubmit={handleSubmit(async (formData) => {
        setStatus("loading")
        const response = await registerUser(formData)
        if (!response.success) {
          setError("email", response.error)
          setStatus("idle")
        }
      })}
    >
      <div className="grid gap-8">
        <div className="grid gap-2">
          <h1 className="text-4xl leading-normal font-bold tracking-tight text-neutral-900">
            Create an account
          </h1>
          <p className="text-lg leading-normal tracking-tight text-neutral-600">
            Join to track your daily mood and sleep with ease.
          </p>
        </div>
        <fieldset
          className="grid gap-5 disabled:opacity-60"
          disabled={status === "loading"}
        >
          <TextField
            label="Email address"
            autoComplete="email"
            {...register("email")}
            errorMessage={errors.email?.message}
          />
          <TextField
            label="Password"
            type="password"
            autoComplete="new-password"
            {...register("password")}
            errorMessage={errors.password?.message}
          />
        </fieldset>
        <Button type="submit" isDisabled={status === "loading"}>
          {status === "loading" ? <LoadingDots /> : "Sign Up"}
        </Button>
      </div>
      <p className="text-center text-lg leading-normal tracking-tight">
        <span className="text-neutral-600">Already got an account? </span>
        <Link
          href="/login"
          className="text-blue-600 underline hover:text-blue-700"
        >
          Log in.
        </Link>
      </p>
    </form>
  )
}

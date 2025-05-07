import Link from "next/link"

import Button from "@/components/ui/Button"
import TextField from "@/components/ui/TextField"

export default function LogInForm() {
  return (
    <form className="shadow-main grid w-full max-w-lg gap-8 rounded-2xl bg-white px-4 py-10 md:px-8">
      <div className="grid gap-2">
        <h1 className="text-4xl leading-normal font-bold tracking-tight text-neutral-900">
          Welcome back!
        </h1>
        <p className="text-lg leading-normal tracking-tight text-neutral-600">
          Log in to continue tracking your mood and sleep.
        </p>
      </div>

      <div className="grid gap-5">
        <TextField label="Email address" />
        <TextField label="Password" />
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

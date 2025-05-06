import TextField from "@/components/ui/TextField"

export default function SignUpForm() {
  return (
    <form className="shadow-main grid w-full max-w-lg gap-8 rounded-2xl bg-white px-4 py-10 md:px-8">
      <div className="grid gap-2">
        <h1 className="text-4xl leading-normal font-bold tracking-tight text-neutral-900">
          Create an account
        </h1>
        <p className="text-lg leading-normal tracking-tight text-neutral-600">
          Join to track your daily mood and sleep with ease.
        </p>
      </div>

      <div className="grid gap-5">
        <TextField label="Email address" />
        <TextField label="Password" />
      </div>
    </form>
  )
}

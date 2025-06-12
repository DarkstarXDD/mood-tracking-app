import { BsInfoCircleFill } from "react-icons/bs"

export function DemoAccessInfo() {
  return (
    <div className="font-reddit-sans grid max-w-sm justify-items-start gap-2 rounded-2xl border border-blue-100 bg-white p-5 shadow-sm">
      <div className="flex w-full items-center gap-2">
        <BsInfoCircleFill className="size-4 text-blue-200" />
        <h2 className="mr-auto text-base font-semibold text-neutral-900">
          Demo Access
        </h2>
      </div>

      <p className="text-sm text-neutral-600">
        You can sign up using a fake email, as long as it&apos;s in a valid
        format. I recommend signing up, so you can experience the full
        onboarding process.
      </p>

      <div className="grid gap-2 border-t border-blue-100 pt-2 text-sm text-neutral-600">
        <p className="text-gray-700">
          Alternatively, you can log in to an existing demo account using these
          credentials.
        </p>

        <div className="rounded border border-blue-200 bg-blue-100 p-2 text-xs">
          <div className="flex">
            <span className="w-20 text-neutral-600">Email:</span>
            <span className="text-neutral-900">demo@example.com</span>
          </div>
          <div className="flex">
            <span className="w-20 text-neutral-600">Password:</span>
            <span className="text-neutral-900">Demo1234</span>
          </div>
        </div>
      </div>
    </div>
  )
}

import { tv } from "tailwind-variants"

import type { ComponentProps } from "react"

export const inputStyles = tv({
  base: "min-w-0 rounded-xl border border-neutral-300 bg-white px-4 py-3 text-lg leading-normal tracking-tight text-neutral-600 ring-blue-600 outline-none placeholder:text-neutral-600 focus-visible:border-blue-600 focus-visible:ring-2 aria-[invalid]:border-red-700 aria-[invalid]:ring-red-700",
})

export default function Input({
  className,
  ...props
}: ComponentProps<"input">) {
  return <input {...props} className={inputStyles({ className })} />
}

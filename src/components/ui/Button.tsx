import { tv } from "tailwind-variants"

import type { ComponentProps } from "react"
import type { VariantProps } from "tailwind-variants"

const buttonStyles = tv({
  base: "cursor-pointer border transition-colors outline-none focus-visible:ring-2",
  variants: {
    variant: {
      primary:
        "w-full rounded-xl border-blue-600 bg-blue-600 px-4 py-3 text-xl leading-normal font-semibold text-white ring-blue-600 ring-offset-2 ring-offset-white hover:border-blue-700 hover:bg-blue-700",
      secondary:
        "rounded-lg border-neutral-300 px-4 py-2 text-lg leading-tight font-medium text-neutral-900 ring-neutral-300 hover:border-neutral-900 hover:ring-neutral-900 focus-visible:ring-2",
    },
  },
  defaultVariants: {
    variant: "primary",
  },
})

type ButtonVariants = VariantProps<typeof buttonStyles>
type ButtonProps = ComponentProps<"button"> & ButtonVariants

export default function Button({ children, variant }: ButtonProps) {
  return <button className={buttonStyles({ variant })}>{children}</button>
}

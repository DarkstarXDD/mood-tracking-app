import { Button as RACButton } from "react-aria-components"
import { tv } from "tailwind-variants"

import type { ButtonProps as RACButtonProps } from "react-aria-components"
import type { VariantProps } from "tailwind-variants"

const buttonStyles = tv({
  base: "rac-focus-visible:ring-2 cursor-pointer border transition-colors outline-none",
  variants: {
    variant: {
      primary:
        "rounded-xl border-blue-600 bg-blue-600 text-white ring-blue-600 ring-offset-2 ring-offset-white hover:border-blue-700 hover:bg-blue-700",
      secondary:
        "rounded-lg border-neutral-300 text-neutral-900 ring-neutral-300 hover:border-neutral-900 hover:ring-neutral-900",
      close:
        "rac-hover:bg-blue-50 rounded-md border-hidden text-neutral-300 ring-blue-600",
    },
    size: {
      base: "px-4 py-3 text-xl leading-normal font-semibold",
      small: "px-4 py-2 text-lg leading-tight font-medium",
      large: "px-8 py-4 text-xl leading-normal font-semibold",
      icon: "p-0",
    },
  },
  defaultVariants: {
    variant: "primary",
    size: "base",
  },
})

type ButtonVariants = VariantProps<typeof buttonStyles>
type ButtonProps = Omit<RACButtonProps, "className"> &
  ButtonVariants & { className?: string }

export default function Button({
  children,
  variant,
  size,
  className,
  ...props
}: ButtonProps) {
  return (
    <RACButton
      {...props}
      className={buttonStyles({ variant, size, className })}
    >
      {children}
    </RACButton>
  )
}

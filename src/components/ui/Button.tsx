import { Button as RACButton } from "react-aria-components"
import { tv } from "tailwind-variants"

import type { ButtonProps as RACButtonProps } from "react-aria-components"
import type { VariantProps } from "tailwind-variants"

export const buttonStyles = tv({
  base: "cursor-pointer border transition-colors outline-none file:cursor-pointer focus-visible:ring-2 disabled:pointer-events-none",
  variants: {
    variant: {
      primary:
        "rac-hover:border-blue-700 rac-pressed:border-blue-700 rac-pressed:bg-blue-700 rac-hover:bg-blue-700 border-blue-600 bg-blue-600 text-white ring-blue-600 ring-offset-2 ring-offset-white",
      secondary:
        "rac-hover:bg-blue-50 rac-pressed:bg-blue-50 border-neutral-300 bg-transparent text-neutral-900 ring-neutral-300",
      close:
        "rac-hover:bg-blue-50 rac-pressed:bg-blue-50 border-hidden text-neutral-300 ring-blue-600",
    },
    size: {
      sm: "rounded-lg px-4 py-2 text-lg leading-tight font-medium",
      md: "min-h-13.5 rounded-xl px-8 py-3 text-xl leading-normal font-semibold",
      lg: "min-h-15.5 rounded-xl px-8 py-4 text-xl leading-normal font-semibold",
      icon: "rounded-md p-0",
    },
  },
  defaultVariants: {
    variant: "primary",
    size: "md",
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

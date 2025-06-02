import { motion } from "motion/react"
import React from "react"
import { tv } from "tailwind-variants"

import type { VariantProps } from "tailwind-variants"

const checkMarkStyles = tv({
  slots: {
    background: "flex size-8 items-center justify-center rounded-full",
    checkMark: "size-6",
  },
  variants: {
    variant: {
      primary: {
        background: "bg-white",
        checkMark: "text-blue-600",
      },
      secondary: {
        background: "bg-blue-600",
        checkMark: "text-white",
      },
    },
  },
  defaultVariants: {
    variant: "primary",
  },
})

type CheckMarkVariants = VariantProps<typeof checkMarkStyles>

export default function AnimatedSuccessMark({ variant }: CheckMarkVariants) {
  const { background, checkMark } = checkMarkStyles({ variant })

  return (
    <div className="flex items-center justify-center">
      <motion.div
        className={background()}
        initial={{ scale: 0.4, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
      >
        <svg
          stroke="currentColor"
          strokeWidth={3}
          fill="none"
          viewBox="0 0 24 24"
          className={checkMark()}
        >
          <motion.path
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 0.2, delay: 0.4 }}
            d="M5 13l4 4L19 7"
            strokeLinejoin="round"
          />
        </svg>
      </motion.div>
    </div>
  )
}

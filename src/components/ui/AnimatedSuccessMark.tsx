import { motion } from "motion/react"
import React from "react"

export default function AnimatedSuccessMark() {
  return (
    <div className="flex items-center justify-center">
      <motion.div
        className="flex size-7 items-center justify-center rounded-full bg-white"
        initial={{ scale: 0.4, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
      >
        <svg
          stroke="currentColor"
          strokeWidth={3}
          fill="none"
          viewBox="0 0 24 24"
          className="size-6 text-blue-600"
        >
          <motion.path
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 0.2, delay: 0.2 }}
            d="M5 13l4 4L19 7"
            // strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </motion.div>
    </div>
  )
}

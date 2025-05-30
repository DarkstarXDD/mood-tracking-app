"use client"

import { motion } from "motion/react"

import { range } from "@/lib/utils"

import type { Variants } from "motion/react"

export default function LoadingDots() {
  const dotVariants = {
    pulse: {
      scale: [1, 1.5, 1],
      transition: {
        duration: 1.2,
        repeat: Infinity,
        ease: "easeInOut",
      },
    },
  }

  return (
    <motion.div
      animate="pulse"
      transition={{ staggerChildren: 0.15, staggerDirection: 1 }}
      className="flex items-center justify-center gap-4"
    >
      {range(4).map((item) => (
        <LoadingDot key={item} variants={dotVariants} />
      ))}
    </motion.div>
  )
}

function LoadingDot({ variants }: { variants: Variants }) {
  return (
    <motion.div className="size-2 rounded-full bg-white" variants={variants} />
  )
}

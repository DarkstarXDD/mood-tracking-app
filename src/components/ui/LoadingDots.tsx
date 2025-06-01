"use client"

import { motion } from "motion/react"

import { cn, range } from "@/lib/utils"

import type { Variants } from "motion/react"

export default function LoadingDots({ className }: { className?: string }) {
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
    <motion.span
      animate="pulse"
      transition={{ staggerChildren: 0.15, staggerDirection: 1 }}
      className="flex items-center justify-center gap-4"
    >
      {range(4).map((item) => (
        <LoadingDot key={item} variants={dotVariants} className={className} />
      ))}
    </motion.span>
  )
}

function LoadingDot({
  variants,
  className,
}: {
  variants: Variants
  className?: string
}) {
  return (
    <motion.span
      className={cn("size-2 rounded-full bg-white", className)}
      variants={variants}
    />
  )
}

"use client"

import { format } from "date-fns"
import { easeIn, motion } from "motion/react"
import { useState, useEffect } from "react"

export default function TodayDate() {
  const [date, setDate] = useState<string | null>(null)

  const today = new Date()
  const formattedDate = format(today, "EEEE, MMMM do, yyyy")

  useEffect(() => setDate(formattedDate), [formattedDate])

  return (
    <motion.p
      className="text-lg leading-tight font-medium tracking-normal text-neutral-600"
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ type: "tween", duration: 0.2, ease: easeIn }}
    >
      {date ?? "-"}
    </motion.p>
  )
}

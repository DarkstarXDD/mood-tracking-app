import { motion } from "motion/react"
import {
  Tooltip as RACTooltip,
  TooltipTrigger as RACTooltipTrigger,
  Button as RACButton,
} from "react-aria-components"
import { BsInfoCircleFill } from "react-icons/bs"

import type { ReactNode } from "react"

export default function Tooltip({ children }: { children: ReactNode }) {
  return (
    <RACTooltipTrigger delay={400}>
      <RACButton className="size-4 rounded-full ring-blue-600 outline-none focus-visible:ring-2">
        <BsInfoCircleFill className="size-4 text-blue-200" />
      </RACButton>
      <RACTooltip offset={10}>
        <motion.div
          initial={{ y: 12, opacity: 0.4 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ type: "tween", ease: "easeOut", duration: 0.15 }}
        >
          {children}
        </motion.div>
      </RACTooltip>
    </RACTooltipTrigger>
  )
}

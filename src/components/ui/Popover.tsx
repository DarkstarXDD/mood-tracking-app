import { motion } from "motion/react"
import {
  Button as RACButton,
  Dialog,
  DialogTrigger,
  OverlayArrow,
  Popover as RACPopover,
} from "react-aria-components"
import { BsInfoCircleFill } from "react-icons/bs"

import type { ReactNode } from "react"

export default function Popover({ children }: { children: ReactNode }) {
  return (
    <DialogTrigger>
      <RACButton className="size-4 cursor-pointer rounded-full ring-blue-600 outline-none focus-visible:ring-2">
        <BsInfoCircleFill className="size-4 text-blue-200" />
      </RACButton>
      <RACPopover placement="top">
        <motion.div
          initial={{ y: 12, opacity: 0.4 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ type: "tween", ease: "easeOut", duration: 0.15 }}
        >
          <OverlayArrow>
            <svg className="size-3 fill-blue-200" viewBox="0 0 12 12">
              <path d="M0 0 L6 6 L12 0" />
            </svg>
          </OverlayArrow>
          <Dialog className="outline-none">{children}</Dialog>
        </motion.div>
      </RACPopover>
    </DialogTrigger>
  )
}

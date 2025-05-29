import { AnimatePresence, motion } from "motion/react"
import useMeasure from "react-use-measure"

import type { ReactNode } from "react"

export default function AnimatedHeightSwitcher({
  children,
}: {
  children: ReactNode
}) {
  const [ref, { height }] = useMeasure()
  return (
    <motion.div
      animate={{ height: height || "auto" }}
      transition={{ duration: 0.2, type: "tween", ease: "easeOut" }}
      className="overflow-hidden"
    >
      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={JSON.stringify(children, ignoreCircularReferences())}
          initial={{ opacity: 0, x: 200 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -200 }}
          transition={{ duration: 0.2 }}
        >
          <div ref={ref} className="p-1.5">
            {children}
          </div>
        </motion.div>
      </AnimatePresence>
    </motion.div>
  )
}

// https://github.com/facebook/react/issues/8669#issuecomment-531515508
const ignoreCircularReferences = (): ((
  key: string,
  value: unknown
) => unknown) => {
  const seen = new WeakSet<object>()
  return (key: string, value: unknown): unknown => {
    if (key.startsWith("_")) return
    if (typeof value === "object" && value !== null) {
      if (seen.has(value)) return
      seen.add(value)
    }
    return value
  }
}

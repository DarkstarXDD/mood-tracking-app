import { motion } from "motion/react"
import { ProgressBar } from "react-aria-components"

import { range } from "@/lib/utils"

type SteppedProgressBar = {
  totalSteps: number
  currentStep: number
  "aria-label": string
}

export default function SteppedProgressBar({
  totalSteps = 4,
  currentStep,
  "aria-label": ariaLabel,
}: SteppedProgressBar) {
  return (
    <ProgressBar
      aria-label={ariaLabel}
      minValue={1}
      maxValue={totalSteps}
      value={currentStep}
      valueLabel={`Step ${currentStep} of ${totalSteps}`}
      style={{ gridTemplateColumns: `repeat(${totalSteps}, minmax(0, 1fr))` }}
      className="grid h-1.5 gap-4 bg-transparent"
    >
      {range(1, totalSteps + 1).map((step) => (
        <span key={step} className="relative rounded-full bg-blue-200">
          <motion.span
            className="absolute inset-0 origin-left rounded bg-blue-600"
            initial={{ scaleX: step === 1 ? 1 : 0 }}
            animate={currentStep >= step ? "active" : "inActive"}
            variants={{
              inActive: { scaleX: 0 },
              active: { scaleX: 1 },
            }}
            transition={{ type: "spring", stiffness: 600, damping: 50 }}
          />
        </span>
      ))}
    </ProgressBar>
  )
}

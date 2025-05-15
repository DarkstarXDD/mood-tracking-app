import { ProgressBar } from "react-aria-components"

import { range, cn } from "@/lib/utils"

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
        <span
          key={step}
          className={cn(
            "rounded-full bg-blue-200",
            currentStep >= step && "bg-blue-600"
          )}
        ></span>
      ))}
    </ProgressBar>
  )
}

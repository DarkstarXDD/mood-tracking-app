import { useState } from "react"

import MoodRadioGroup from "@/components/home/mood-logging/MoodRadioGroup"
import MoodTagCheckboxGroup from "@/components/home/mood-logging/MoodTagCheckboxGroup"
import SleepRadioGroup from "@/components/home/mood-logging/SleepRadioGroup"
import Button from "@/components/ui/Button"
import SteppedProgressBar from "@/components/ui/SteppedProgressBar"

export default function MoodLogForm() {
  const [step, setStep] = useState(1)

  const handleNext = () => setStep(step + 1)

  return (
    <div className="grid gap-6 md:gap-8">
      <SteppedProgressBar
        totalSteps={4}
        currentStep={step}
        aria-label="Mood entry progress"
      />

      {step === 1 && <MoodRadioGroup />}
      {step === 2 && <MoodTagCheckboxGroup />}
      {step === 3 && <SleepRadioGroup />}

      <Button size="large" onPress={handleNext}>
        Continue
      </Button>
    </div>
  )
}

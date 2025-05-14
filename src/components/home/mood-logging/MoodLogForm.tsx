import { useState } from "react"

import MoodRadioGroup from "@/components/home/mood-logging/MoodRadioGroup"
import SleepRadioGroup from "@/components/home/mood-logging/SleepRadioGroup"
import Button from "@/components/ui/Button"

export default function MoodLogForm() {
  const [step, setStep] = useState(1)

  const handleNext = () => setStep(step + 1)

  return (
    <div className="grid gap-6 md:gap-8">
      {step === 1 && <MoodRadioGroup />}
      {step === 2 && <SleepRadioGroup />}

      <Button size="large" onPress={handleNext}>
        Continue
      </Button>
    </div>
  )
}

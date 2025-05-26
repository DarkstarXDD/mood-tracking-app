import { useState, createContext } from "react"

import DailyNote from "@/components/home/mood-logging/DailyNote"
import MoodRadioGroup from "@/components/home/mood-logging/MoodRadioGroup"
import MoodTagCheckboxGroup from "@/components/home/mood-logging/MoodTagCheckboxGroup"
import SleepRadioGroup from "@/components/home/mood-logging/SleepRadioGroup"
import SteppedProgressBar from "@/components/ui/SteppedProgressBar"
import { MoodFormSchemaType } from "@/lib/schema"

type MoodFormContextType = {
  handleNext: () => void
  updateFormData: (data: Partial<MoodFormSchemaType>) => void
  moodFormData: Partial<MoodFormSchemaType> | undefined
}

export const MoodFormContext = createContext<MoodFormContextType | undefined>(
  undefined
)

export default function MoodLogForm() {
  const [step, setStep] = useState(1)
  const [moodFormData, setMoodFormData] =
    useState<Partial<MoodFormSchemaType>>()

  const updateFormData = (data: Partial<MoodFormSchemaType>) => {
    setMoodFormData({ ...moodFormData, ...data })
  }

  const handleNext = () => setStep(step + 1)

  return (
    <MoodFormContext.Provider
      value={{ handleNext, updateFormData, moodFormData }}
    >
      <div className="grid gap-6 md:gap-8">
        <SteppedProgressBar
          totalSteps={4}
          currentStep={step}
          aria-label="Mood entry progress"
        />

        {step === 1 && <MoodRadioGroup />}
        {step === 2 && <MoodTagCheckboxGroup />}
        {step === 3 && <DailyNote />}
        {step === 4 && <SleepRadioGroup />}
      </div>
    </MoodFormContext.Provider>
  )
}

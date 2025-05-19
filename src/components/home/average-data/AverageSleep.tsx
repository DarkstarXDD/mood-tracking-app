import { FiArrowUpRight } from "react-icons/fi"

import SleepIcon from "@/components/icons/SleepIcon"

type AverageSleepProps = {
  hoursOfSleep: string
}

export default function AverageSleep({ hoursOfSleep }: AverageSleepProps) {
  return (
    <div className="custom-bg flex min-h-38 flex-col items-start justify-center gap-3 rounded-2xl bg-blue-600 px-4 py-5 md:px-5">
      <div className="flex items-center gap-3 lg:gap-4">
        <SleepIcon className="size-6 text-white opacity-70" />
        <p className="text-2xl leading-normal font-semibold tracking-normal text-white">
          {hoursOfSleep}
        </p>
      </div>

      <div className="flex items-center gap-2">
        <FiArrowUpRight className="size-4 text-white opacity-70" />
        <p className="text-base leading-normal font-normal tracking-tight text-white opacity-70">
          Increase from the previous 5 check-ins
        </p>
      </div>
    </div>
  )
}

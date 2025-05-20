import AverageSleep from "@/components/home/average-data/AverageSleep"
import NotEnoughData from "@/components/home/average-data/NotEnoughData"
import useUser from "@/hooks/useUser"
import { getAverageMoodData } from "@/lib/helpers/mood-helpers"

export default function AverageSleepCard() {
  const {
    user: { moodEntries },
    hasFiveEntries,
  } = useUser()

  const { averageSleep, averageSleepComparison } =
    getAverageMoodData(moodEntries)

  return (
    <div className="grid gap-3">
      <h2>
        <span className="text-xl leading-normal font-semibold tracking-normal text-neutral-900">
          Average Sleep{" "}
        </span>
        <span className="text-base leading-normal font-normal tracking-tight text-neutral-600">
          (Last 5 Check-ins)
        </span>
      </h2>

      {hasFiveEntries ? (
        <AverageSleep
          hoursOfSleep={averageSleep}
          averageSleepComparison={averageSleepComparison}
        />
      ) : (
        <NotEnoughData type="sleep" />
      )}
    </div>
  )
}

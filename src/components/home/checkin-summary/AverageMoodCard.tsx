import AverageMood from "@/components/home/checkin-summary/AverageMood"
import NotEnoughData from "@/components/home/checkin-summary/NotEnoughData"
import useUser from "@/hooks/useUser"
import { getAverageMoodData } from "@/lib/helpers/mood-helpers"

export default function AverageMoodCard() {
  const {
    user: { moodEntries },
    hasFiveEntries,
  } = useUser()

  const { averageMoodId, averageMoodWeightDiff } =
    getAverageMoodData(moodEntries)

  return (
    <div className="grid gap-3">
      <h2>
        <span className="text-xl leading-normal font-semibold tracking-normal text-neutral-900">
          Average Mood{" "}
        </span>
        <span className="text-base leading-normal font-normal tracking-tight text-neutral-600">
          (Last 5 Check-ins)
        </span>
      </h2>

      {hasFiveEntries ? (
        <AverageMood
          averageMoodId={averageMoodId}
          averageMoodWeightDiff={averageMoodWeightDiff}
        />
      ) : (
        <NotEnoughData type="mood" />
      )}
    </div>
  )
}

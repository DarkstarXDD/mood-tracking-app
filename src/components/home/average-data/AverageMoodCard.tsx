import AverageMood from "@/components/home/average-data/AverageMood"
import NotEnoughData from "@/components/home/average-data/NotEnoughData"
import useUser from "@/hooks/useUser"
import { getAverageMood } from "@/lib/utils"

export default function AverageMoodCard() {
  const { moodEntries } = useUser()
  const averageMood = getAverageMood(moodEntries)

  const isEnoughData = true
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

      {isEnoughData ? (
        <AverageMood mood={averageMood} />
      ) : (
        <NotEnoughData type="mood" />
      )}
    </div>
  )
}

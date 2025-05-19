import AverageMood from "@/components/home/average-data/AverageMood"
import NotEnoughData from "@/components/home/average-data/NotEnoughData"

export default function AverageMoodCard() {
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
        <AverageMood mood="Neutral" />
      ) : (
        <NotEnoughData type="mood" />
      )}
    </div>
  )
}

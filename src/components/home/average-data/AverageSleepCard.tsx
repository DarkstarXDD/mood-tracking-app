import AverageSleep from "@/components/home/average-data/AverageSleep"
import NotEnoughData from "@/components/home/average-data/NotEnoughData"

export default function AverageSleepCard() {
  const isEnoughData = true

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

      {isEnoughData ? (
        <AverageSleep hoursOfSleep="5-6 Hours" />
      ) : (
        <NotEnoughData type="sleep" />
      )}
    </div>
  )
}

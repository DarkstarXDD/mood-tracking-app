export default function AverageSleep() {
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

      <div className="flex min-h-[9.375rem] flex-col items-start justify-center gap-3 rounded-2xl bg-blue-100 px-4 py-5 md:px-5">
        <p className="text-2xl leading-normal font-semibold tracking-normal text-neutral-900">
          Not enough data yet!
        </p>
        <p className="text-base leading-normal font-normal tracking-tight text-neutral-600">
          Track 5 nights to view average sleep.
        </p>
      </div>
    </div>
  )
}

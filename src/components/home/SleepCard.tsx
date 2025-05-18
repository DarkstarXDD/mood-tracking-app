import SleepIcon from "@/components/icons/SleepIcon"

export default function SleepCard() {
  return (
    <div className="grid gap-4 rounded-2xl border border-blue-100 bg-white p-5 lg:col-start-2 lg:row-start-1">
      <h2 className="flex items-center gap-3 text-lg leading-tight font-medium tracking-normal text-neutral-600">
        <SleepIcon className="shrink-0" />
        <span>Sleep</span>
      </h2>
      <p className="text-4xl leading-normal font-bold tracking-tight text-neutral-900">
        9+ hours
      </p>
    </div>
  )
}

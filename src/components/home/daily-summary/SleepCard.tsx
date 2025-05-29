import SVGIcon from "@/components/ui/SVGIcon"
import useUser from "@/hooks/useUser"

export default function SleepCard() {
  const {
    user: { moodEntries },
  } = useUser()

  const todayMood = moodEntries[0]

  return (
    <div className="grid gap-4 rounded-2xl border border-blue-100 bg-white p-5 lg:col-start-2 lg:row-start-1">
      <h2 className="flex items-center gap-3 text-lg leading-tight font-medium tracking-normal text-neutral-600">
        <SVGIcon name="icon-sleep" className="size-4" />
        <span>Sleep</span>
      </h2>
      <p className="text-4xl leading-normal font-bold tracking-tight text-neutral-900">
        {todayMood.hoursOfSleep.label}
      </p>
    </div>
  )
}

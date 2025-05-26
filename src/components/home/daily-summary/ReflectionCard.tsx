import { startCase } from "lodash"

import ReflectionIcon from "@/components/icons/ReflectionIcon"
import useUser from "@/hooks/useUser"

export default function ReflectionCard() {
  const {
    user: { moodEntries },
  } = useUser()

  const todayMood = moodEntries[0]

  return (
    <div className="flex min-h-48 flex-col justify-between gap-4 rounded-2xl border border-blue-100 bg-white p-5 text-lg font-medium tracking-normal lg:col-start-2 lg:row-start-2">
      <div className="grid gap-4">
        <h2 className="flex items-center gap-3 leading-tight text-neutral-600">
          <ReflectionIcon className="shrink-0" />
          <span>Reflection of the day</span>
        </h2>
        {todayMood.note ? (
          <p className="leading-tight break-all text-neutral-900">
            {todayMood.note}
          </p>
        ) : (
          <p className="leading-tight text-neutral-600">
            No reflection added for today.
          </p>
        )}
      </div>

      <p className="flex flex-wrap items-center gap-3 leading-snug text-neutral-600 italic">
        {todayMood.tags.map((tag) => (
          <span key={tag.id}>{`#${startCase(tag.name)}`}</span>
        ))}
      </p>
    </div>
  )
}

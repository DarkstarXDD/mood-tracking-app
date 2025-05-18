import ReflectionIcon from "@/components/icons/ReflectionIcon"

export default function ReflectionCard() {
  return (
    <div className="flex min-h-48 flex-col justify-between gap-4 rounded-2xl border border-blue-100 bg-white p-5 text-lg font-medium tracking-normal lg:col-start-2 lg:row-start-2">
      <div className="grid gap-4">
        <h2 className="flex items-center gap-3 leading-tight text-neutral-600">
          <ReflectionIcon className="shrink-0" />
          <span>Reflection of the day</span>
        </h2>
        <p className="leading-tight text-neutral-900">
          Woke up early and finally tackled a big project!
        </p>
      </div>

      <p className="flex flex-wrap items-center gap-3 leading-snug text-neutral-600 italic">
        <span>#Grateful</span>
        <span>#Optimistic</span>
        <span>#Down</span>
      </p>
    </div>
  )
}

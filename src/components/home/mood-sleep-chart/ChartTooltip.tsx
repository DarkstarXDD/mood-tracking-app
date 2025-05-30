import { startCase } from "lodash"
import { ReactNode } from "react"

import SVGIcon from "@/components/ui/SVGIcon"
import { cn } from "@/lib/utils"

import type { BarChartPayload } from "@/components/home/mood-sleep-chart/MoodSleepChart"
import type { SVGIconNameType } from "@/lib/types"
import type { TooltipProps } from "recharts"

export default function ChartTooltip({
  active,
  payload,
}: TooltipProps<number, string>) {
  if (active && payload && payload.length > 0) {
    const data = payload[0].payload as BarChartPayload
    return (
      <div className="grid w-full max-w-44 gap-3 rounded-xl border border-blue-100 bg-white p-3">
        <div className="grid gap-1.5">
          <DescriptionTerm>Mood</DescriptionTerm>
          <DescriptionDetails className="flex items-center gap-2">
            <SVGIcon
              name={data.mood.iconColor as SVGIconNameType}
              className="size-5"
            />
            <span>{data.mood.label}</span>
          </DescriptionDetails>
        </div>

        <div className="grid gap-1.5">
          <DescriptionTerm>Sleep</DescriptionTerm>
          <DescriptionDetails>{data.sleepLabel}</DescriptionDetails>
        </div>

        <div className="grid gap-1.5">
          <DescriptionTerm>Tags</DescriptionTerm>
          <DescriptionDetails>
            {data.tags.map((tag) => startCase(tag.name)).join(", ")}
          </DescriptionDetails>
        </div>
      </div>
    )
  }
  return null
}

function DescriptionTerm({ children }: { children: ReactNode }) {
  return (
    <dt className="text-xs leading-none font-semibold tracking-normal text-neutral-600">
      {children}
    </dt>
  )
}

function DescriptionDetails({
  children,
  className,
}: {
  children: ReactNode
  className?: string
}) {
  return (
    <dd
      className={cn(
        "text-base leading-normal font-normal tracking-tight text-neutral-900",
        className
      )}
    >
      {children}
    </dd>
  )
}

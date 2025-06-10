import * as d3 from "d3"
import { format } from "date-fns"
import useMeasure from "react-use-measure"

import SVGIcon from "@/components/ui/SVGIcon"
import useUser from "@/hooks/useUser"
import { hoursOfSleep } from "@/lib/data/mood-data"
import { moodToColorMap } from "@/lib/data-maps"
import { SVGIconNameType } from "@/lib/types"

const margin = {
  top: 20,
  bottom: 40,
  left: 70,
  right: 10,
}

function tickFormatter(id: number) {
  const match = hoursOfSleep.find((item) => item.id === id)
  return match?.label ?? id
}

export default function Chart() {
  const {
    user: { moodEntries },
  } = useUser()

  const [ref, { width, height }] = useMeasure()
  const data = moodEntries.toReversed()

  const xScale = d3
    .scaleBand()
    .domain(data.map((d) => d.createdAt.toISOString()))
    .range([margin.left, width - margin.right])
    .paddingInner(0.2)
  const xTicks = xScale.domain()

  const yScale = d3
    .scaleLinear()
    .domain([0, 5])
    .range([height - margin.bottom, margin.top])
  const yTicks = yScale.ticks(6)

  return (
    <div ref={ref} className="min-h-75">
      <svg className="h-full w-full">
        <g>
          {yTicks.map((tick) => {
            if (tick === 0) return null
            return (
              <g key={tick} transform={`translate(0, ${yScale(tick)})`}>
                <line
                  x1={margin.left}
                  x2={width - margin.right}
                  className="stroke-blue-100"
                />
                <text
                  x={4}
                  alignmentBaseline="middle"
                  className="fill-neutral-600 text-xs"
                >
                  {tickFormatter(tick)}
                </text>
              </g>
            )
          })}
        </g>

        <g>
          {xTicks.map((tick) => {
            const xPosTemp = xScale(tick)
            const tickXPos =
              xPosTemp !== undefined
                ? xPosTemp + xScale.bandwidth() / 2
                : undefined
            return (
              <g key={tick} transform={`translate(${tickXPos} 0)`}>
                <text
                  y={height - 20}
                  textAnchor="middle"
                  className="fill-neutral-600 text-xs"
                >
                  {format(tick, "MMM")}
                </text>
                <text
                  y={height - 2}
                  textAnchor="middle"
                  className="fill-neutral-900 text-xs"
                >
                  {format(tick, "d")}
                </text>
              </g>
            )
          })}
        </g>

        <g>
          {data.map((entry) => {
            const rawXPos = xScale(entry.createdAt.toISOString()) ?? 0
            const fullBandwidth = xScale.bandwidth()
            const bandwidth = Math.min(fullBandwidth, 40)
            const moodIconSize = bandwidth * 0.75

            const barXPos = rawXPos + (fullBandwidth - bandwidth) / 2
            const barYPos = yScale(entry.hoursOfSleep.id)
            const iconXPos = barXPos + (bandwidth - moodIconSize) / 2
            const iconYPos = barYPos + 5

            return (
              <g key={entry.id}>
                <rect
                  x={barXPos}
                  y={barYPos}
                  width={bandwidth}
                  height={height - (barYPos + margin.bottom)}
                  fill={moodToColorMap[entry.mood.id]}
                  rx={bandwidth / 2}
                />
                <SVGIcon
                  name={entry.mood.iconWhite as SVGIconNameType}
                  x={iconXPos}
                  y={iconYPos}
                  width={moodIconSize}
                  height={moodIconSize}
                />
              </g>
            )
          })}
        </g>
      </svg>
    </div>
  )
}

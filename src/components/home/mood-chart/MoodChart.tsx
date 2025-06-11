"use client"

import * as d3 from "d3"
import { format } from "date-fns"
import { motion } from "motion/react"
import useMeasure from "react-use-measure"

import SVGIcon from "@/components/ui/SVGIcon"
import useUser from "@/hooks/useUser"
import { hoursOfSleep } from "@/lib/data/mood-data"
import { moodToColorMap } from "@/lib/data-maps"
import { SVGIconNameType } from "@/lib/types"

const margin = {
  top: 20,
  bottom: 60,
  left: 70,
  right: 10,
}

const barMinWidth = 40

function tickFormatter(id: number) {
  const match = hoursOfSleep.find((item) => item.id === id)
  return match?.label ?? id
}

export default function MoodChart() {
  const {
    user: { moodEntries },
  } = useUser()

  const [ref, { width, height }] = useMeasure()
  const data = moodEntries.toReversed()

  // 50 is an arbitrary value added to consider for the gaps between bars.
  const minChartWidth =
    data.length * barMinWidth + margin.left + margin.right + 50
  const chartWidth = width < minChartWidth ? minChartWidth : width

  const xScale = d3
    .scaleBand()
    .domain(data.map((d) => d.createdAt.toISOString()))
    .range([0, chartWidth - margin.right])
    .paddingInner(0.2)
  const xTicks = xScale.domain()

  const yScale = d3
    .scaleLinear()
    .domain([0, 5])
    .range([height - margin.bottom, margin.top])
  const yTicks = yScale.ticks(6)

  return (
    <div className="flex min-h-75 w-full overflow-hidden">
      <svg className="shrink-0" style={{ width: margin.left, height }}>
        <g>
          {yTicks.map((tick) => {
            if (tick === 0) return null
            return (
              <g key={tick} transform={`translate(0, ${yScale(tick)})`}>
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
      </svg>

      <div ref={ref} dir="rtl" className="w-full overflow-x-auto">
        <svg className="h-full" style={{ width: chartWidth }}>
          <g>
            {yTicks.map((tick) => {
              if (tick === 0) return null
              return (
                <motion.line
                  key={tick}
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ delay: 0.15, duration: 0.25 }}
                  x1={0}
                  x2={chartWidth}
                  y1={yScale(tick)}
                  y2={yScale(tick)}
                  className="stroke-blue-100"
                />
              )
            })}
          </g>

          <g>
            {xTicks.map((tick) => {
              const rawXPos = xScale(tick)
              const tickXPos =
                rawXPos !== undefined ? rawXPos + xScale.bandwidth() / 2 : 0
              return (
                <g key={tick} transform={`translate(${tickXPos} 0)`}>
                  <text
                    y={height - 38}
                    textAnchor="middle"
                    className="fill-neutral-600 text-xs"
                  >
                    {format(tick, "MMM")}
                  </text>
                  <text
                    y={height - 18}
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
              const bandwidth = Math.min(fullBandwidth, barMinWidth)
              const moodIconSize = bandwidth * 0.75

              const barXPos = rawXPos + (fullBandwidth - bandwidth) / 2
              const barYPos = yScale(entry.hoursOfSleep.id)
              const barHeight = height - (barYPos + margin.bottom)
              const iconXPos = barXPos + (bandwidth - moodIconSize) / 2
              const iconYPos = barYPos + 5

              return (
                <g key={entry.id}>
                  <motion.rect
                    initial={{ height: 0 }}
                    animate={{ height: barHeight < 0 ? 0 : barHeight }}
                    transition={{
                      delay: 0.6,
                      type: "spring",
                      stiffness: 250,
                      damping: 35,
                    }}
                    x={barXPos}
                    y={barYPos}
                    width={bandwidth}
                    fill={moodToColorMap[entry.mood.id]}
                    rx={bandwidth / 2}
                  />
                  <MotionSVGIcon
                    name={entry.mood.iconWhite as SVGIconNameType}
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{
                      delay: 0.4,
                      type: "spring",
                      stiffness: 300,
                      damping: 15,
                    }}
                    // style={{ transformOrigin: "center" }}
                    style={{
                      transformOrigin: `${iconXPos + moodIconSize / 2}px ${iconYPos + moodIconSize / 2}px`,
                    }}
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
    </div>
  )
}

const MotionSVGIcon = motion.create(SVGIcon)

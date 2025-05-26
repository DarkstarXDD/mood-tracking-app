import { Bar, BarChart, XAxis, YAxis, CartesianGrid } from "recharts"

import useUser from "@/hooks/useUser"
import { moodToColorMap } from "@/lib/data-maps"

const sleepToSleepLabelMap: Record<string, string> = {
  1: "0-2 hours",
  2: "3-4 hours",
  3: "5-6 hours",
  4: "7-8 hours",
  5: "9+ hours",
}

type CustomBarShapeProps = {
  x?: number
  y?: number
  width?: number
  height?: number
  payload?: {
    moodColor: string
    moodIcon: string
  }
}

export default function MoodSleepChart() {
  const {
    user: { moodEntries },
  } = useUser()

  const data = moodEntries.map((entry) => ({
    sleepWeight: entry.hoursOfSleep.id,
    moodColor: moodToColorMap[entry.mood.id],
    moodIcon: entry.mood.emojiSmallUrl,
    formattedDate: new Date(entry.createdAt).toLocaleDateString(undefined, {
      month: "short",
      day: "numeric",
    }),
  }))

  const barWidth = 40
  const gap = 16
  const numberOfBars = data.length
  const chartWidth = numberOfBars * (barWidth + gap)

  return (
    <div className="min-h-75 overflow-auto">
      <BarChart
        data={data.reverse()}
        width={chartWidth + 40}
        height={300}
        margin={{ bottom: 20 }}
      >
        <CartesianGrid
          vertical={false}
          strokeWidth="1px"
          stroke="var(--color-blue-100)"
          strokeOpacity={0.5}
        />
        <Bar
          dataKey="sleepWeight"
          barSize={barWidth}
          shape={<CustomBarShape />}
        />
        <XAxis
          dataKey="formattedDate"
          tick={<CustomXAxisTick />}
          tickLine={false}
          axisLine={false}
          interval={0}
        />
        <YAxis
          domain={[0, 5]}
          ticks={[1, 2, 3, 4, 5]}
          tickLine={false}
          axisLine={false}
          tick={<CustomYAxisTick />}
        />
      </BarChart>
    </div>
  )
}

function CustomBarShape({ x, y, width, height, payload }: CustomBarShapeProps) {
  const imgSize = 30

  return (
    <g>
      <rect
        x={x}
        y={y}
        width={width}
        height={height}
        fill={payload?.moodColor}
        rx={20}
      />
      <image
        href={payload?.moodIcon}
        x={x! + width! / 2 - imgSize / 2}
        y={y! + 5}
        width={imgSize}
        height={imgSize}
        aria-hidden={true}
      />
    </g>
  )
}

type XAxisTickType = { x?: number; y?: number; payload?: { value: string } }

function CustomXAxisTick({ x, y, payload }: XAxisTickType) {
  const [month, day] = (payload?.value ?? "").split(" ")

  return (
    <text x={x} y={y! + 10} textAnchor="middle">
      <tspan fontSize={12} fill="var(--color-neutral-600)">
        {month}
      </tspan>
      <tspan
        x={x}
        dy="20"
        fontSize={13}
        fontWeight={600}
        fill="var(--color-neutral-900)"
      >
        {day}
      </tspan>
    </text>
  )
}

type YAxisTickType = { x?: number; y?: number; payload?: { value: number } }

function CustomYAxisTick({ x, y, payload }: YAxisTickType) {
  return (
    <text
      x={x}
      y={y}
      fontSize={12}
      textAnchor="end"
      fill="var(--color-neutral-600)"
      dominantBaseline="middle"
    >
      {sleepToSleepLabelMap[payload?.value ?? ""]}
    </text>
  )
}

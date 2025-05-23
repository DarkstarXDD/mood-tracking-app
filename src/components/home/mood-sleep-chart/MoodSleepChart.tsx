import { Bar, BarChart, XAxis, YAxis, CartesianGrid } from "recharts"

import useUser from "@/hooks/useUser"

const sleepToNumericValue: Record<string, number> = {
  ZeroToTwoHours: 1,
  ThreeToFourHours: 2,
  FiveToSixHours: 3,
  SevenToEightHours: 4,
  OverNineHours: 5,
}

const sleepToSleepLabelMap: Record<string, string> = {
  1: "0-2 hours",
  2: "3-4 hours",
  3: "5-6 hours",
  4: "7-8 hours",
  5: "9+ hours",
}

const moodToColorMap: Record<string, string> = {
  VeryHappy: "#ffc97c",
  Happy: "#89e780",
  Neutral: "#89caff",
  Sad: "#b8b1ff",
  VerySad: "#ff9b99",
}

const moodToIconMap: Record<string, string> = {
  VeryHappy: "/images/icon-very-happy-white.svg",
  Happy: "/images/icon-happy-white.svg",
  Neutral: "/images/icon-neutral-white.svg",
  Sad: "/images/icon-sad-white.svg",
  VerySad: "/images/icon-very-sad-white.svg",
}

type MoodEntry = {
  sleep: string
  sleepScore: number
  moodColor: string
  formattedDate: string
  moodIcon: string
  sleepLabel: string
}

type CustomBarShapeProps = {
  x?: number
  y?: number
  width?: number
  height?: number
  payload?: MoodEntry
}

export default function MoodSleepChart() {
  const {
    user: { moodEntries },
  } = useUser()

  const data = moodEntries.map((entry) => ({
    ...entry,
    sleepScore: sleepToNumericValue[entry.sleep],
    moodColor: moodToColorMap[entry.mood],
    formattedDate: new Date(entry.createdAt).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
    }),
    moodIcon: moodToIconMap[entry.mood],
  }))

  moodEntries.map((entry) => console.log(sleepToSleepLabelMap[entry.sleep]))

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
          dataKey="sleepScore"
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

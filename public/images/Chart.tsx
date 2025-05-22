import { Bar, BarChart, XAxis, YAxis, CartesianGrid } from "recharts"

import useUser from "@/hooks/useUser"

const sleepToNumericValue: Record<string, number> = {
  ZeroToTwoHours: 1,
  ThreeToFourHours: 2,
  FiveToSixHours: 3,
  SevenToEightHours: 4,
  OverNineHours: 5,
}

const moodToColorMap: Record<string, string> = {
  VeryHappy: "#ffc97c",
  Happy: "#89e780",
  Neutral: "#89caff",
  Sad: "#b8b1ff",
  VerySad: "#ff9b99",
}

type MoodEntry = {
  sleep: string
  sleepScore: number
  moodColor: string
}

type CustomBarShapeProps = {
  x?: number
  y?: number
  width?: number
  height?: number
  payload?: MoodEntry
}

export default function Chart() {
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
  }))

  const barWidth = 40
  const gap = 16
  const numberOfBars = data.length
  const chartWidth = numberOfBars * (barWidth + gap)

  return (
    <div className="min-h-75 overflow-auto">
      <BarChart
        data={data.reverse()}
        width={chartWidth}
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
        href="/images/icon-happy-white.svg"
        x={x! + width! / 2 - imgSize / 2}
        y={y! + 5}
        width={imgSize}
        height={imgSize}
        aria-hidden={true}
      />
    </g>
  )
}

function CustomXAxisTick({
  x,
  y,
  payload,
}: {
  x?: number
  y?: number
  payload?: { value: string }
}) {
  const [month, day] = (payload?.value ?? "").split(" ")

  return (
    <text x={x} y={y! + 10} textAnchor="middle">
      <tspan x={x} dy="0" fontSize={12} fill="var(--color-neutral-600)">
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

function CustomYAxisTick({
  x,
  y,
  payload,
}: {
  x?: number
  y?: number
  payload?: { value: string }
}) {
  return (
    <g transform={`translate(${x}, ${y})`}>
      <foreignObject x={-50} y={-10} width={100} height={20}>
        <div style={{ display: "flex", alignItems: "center", fontSize: 12 }}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="none"
            viewBox="0 0 16 16"
          >
            <path
              fill="#ccc"
              d="M10 .906c-.031.219-.125.531-.25.688L7.156 4.5H9c.25 0 .5.25.5.5v.5c0 .281-.25.5-.5.5H5.5a.494.494 0 0 1-.5-.5v-.406c0-.188.094-.5.219-.657L7.812 1.5H6a.494.494 0 0 1-.5-.5V.5c0-.25.219-.5.5-.5h3.5c.25 0 .5.25.5.5v.406ZM7.25 8a.76.76 0 0 1 .75.75v.813c-.031.218-.156.53-.313.687L3.876 14H7.5c.25 0 .5.25.5.5v1c0 .281-.25.5-.5.5H1.75a.722.722 0 0 1-.75-.75v-.781c0-.219.125-.531.281-.688L5.094 10H2a.494.494 0 0 1-.5-.5v-1c0-.25.219-.5.5-.5h5.25Zm7.25-1c.25 0 .5.25.5.5v.406c-.031.219-.125.532-.25.688L12.156 11.5H14c.25 0 .5.25.5.5v.5c0 .281-.25.5-.5.5h-3.5a.494.494 0 0 1-.5-.5v-.406c0-.188.094-.5.219-.656L12.813 8.5H11a.494.494 0 0 1-.5-.5v-.5c0-.25.219-.5.5-.5h3.5Z"
            />
          </svg>
          <span style={{ marginLeft: 6 }}>{payload?.value}</span>
        </div>
      </foreignObject>
    </g>
  )
}

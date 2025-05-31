import { format } from "date-fns"

export default function TodayDate() {
  const date = new Date()
  const formattedDate = format(date, "EEEE, MMMM do, yyyy")

  return (
    <p className="text-lg leading-tight font-medium tracking-normal text-neutral-600">
      {formattedDate}
    </p>
  )
}

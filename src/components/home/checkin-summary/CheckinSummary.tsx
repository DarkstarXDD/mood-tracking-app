import AverageMoodCard from "@/components/home/checkin-summary/AverageMoodCard"
import AverageSleepCard from "@/components/home/checkin-summary/AverageSleepCard"

export default function CheckinSummary() {
  return (
    <div className="grid gap-6 rounded-2xl border border-blue-100 bg-white px-4 py-5 md:px-5 md:py-6 lg:px-6">
      <AverageMoodCard />
      <AverageSleepCard />
    </div>
  )
}

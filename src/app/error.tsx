"use client"

import Link from "next/link"

import SVGIcon from "@/components/ui/SVGIcon"

export default function Error() {
  return (
    <div className="grid grid-cols-[auto_1fr] items-center gap-4">
      <SVGIcon name="icon-sad-color" className="row-span-2 size-16" />
      <h1 className="text-2xl leading-normal font-semibold tracking-normal text-neutral-900">
        Something went wrong!
      </h1>
      <p className="col-start-2 text-base leading-normal font-normal tracking-tight text-neutral-600">
        <span>
          Your last action did not complete properly. Please go back to the home
          page and try agin.{" "}
        </span>
        <Link href="/" className="underline">
          Back to home
        </Link>
      </p>
    </div>
  )
}

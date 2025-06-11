import type { SVGIconNameType } from "@/lib/types"
import type { ComponentProps } from "react"

type SVGIconProps = { name: SVGIconNameType } & ComponentProps<"svg">

export default function SVGIcon({ name, ...props }: SVGIconProps) {
  return (
    <svg {...props} fill="none" aria-hidden={props["aria-hidden"] ?? "true"}>
      <use href={`/icon-sprite.svg#${name}`} />
    </svg>
  )
}

import type { SVGIconNameType } from "@/lib/types"

type SVGIconProps = {
  name: SVGIconNameType
  width?: number
  height?: number
  x?: number
  y?: number
  className?: string
}

export default function SVGIcon({
  name,
  width,
  height,
  x,
  y,
  className,
}: SVGIconProps) {
  return (
    <svg
      width={width}
      height={height}
      className={className}
      x={x}
      y={y}
      aria-hidden="true"
    >
      <use href={`/icon-sprite.svg#${name}`} />
    </svg>
  )
}

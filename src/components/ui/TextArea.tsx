import { ComponentProps } from "react"

import { inputStyles } from "@/components/ui/Input"

type TextAreaProps = ComponentProps<"textarea">

export default function TextArea({ className, ...props }: TextAreaProps) {
  return <textarea className={inputStyles({ className })} {...props} />
}

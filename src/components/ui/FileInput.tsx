import { FileTrigger } from "react-aria-components"

import Button from "@/components/ui/Button"

export default function FileInput({ className }: { className?: string }) {
  return (
    <FileTrigger>
      <Button variant="secondary" size="small" className={className}>
        Upload
      </Button>
    </FileTrigger>
  )
}

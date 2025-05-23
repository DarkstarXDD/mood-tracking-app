import { FileTrigger } from "react-aria-components"

import Button from "@/components/ui/Button"

export default function FileInput({ className }: { className?: string }) {
  return (
    <FileTrigger>
      <Button variant="secondary" size="sm" className={className}>
        Upload
      </Button>
    </FileTrigger>
  )
}

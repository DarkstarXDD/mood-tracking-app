import {
  DialogTrigger,
  ModalOverlay,
  Modal,
  Dialog,
  Heading,
} from "react-aria-components"

import MoodLogForm from "@/components/home/mood-logging/MoodLogForm"
import Button from "@/components/ui/Button"

export default function MoodLogDialog() {
  return (
    <DialogTrigger>
      <Button size="large">Log today&apos;s mood</Button>
      <ModalOverlay className="fixed inset-0 z-10 flex min-h-dvh flex-col items-center justify-center overflow-auto bg-neutral-900/70 p-5">
        <Modal className="w-full max-w-152">
          <Dialog className="relative grid gap-8 rounded-2xl bg-white px-5 py-10 outline-none md:px-10 md:py-12">
            <Heading className="text-4xl leading-normal font-bold tracking-tight text-neutral-900 md:text-5xl md:leading-tight">
              Log your mood
            </Heading>
            <MoodLogForm />
          </Dialog>
        </Modal>
      </ModalOverlay>
    </DialogTrigger>
  )
}

import {
  DialogTrigger,
  ModalOverlay,
  Modal,
  Dialog,
  Heading,
} from "react-aria-components"
import { IoClose } from "react-icons/io5"

import MoodLogForm from "@/components/home/mood-logging/MoodLogForm"
import Button from "@/components/ui/Button"

export default function MoodLogDialog() {
  return (
    <DialogTrigger>
      <Button size="lg">Log today&apos;s mood</Button>
      <ModalOverlay className="fixed inset-0 z-10 flex min-h-dvh flex-col items-center overflow-auto bg-neutral-900/70 p-5 py-16">
        <Modal className="w-full max-w-152 overflow-auto">
          <Dialog className="from-gradient-start to-gradient-end relative grid gap-6 rounded-2xl bg-white bg-linear-to-b from-75% bg-no-repeat px-5 py-10 outline-none md:gap-8 md:px-10 md:py-12">
            <Button
              slot="close"
              variant="close"
              size="icon"
              className="rac-hover:bg-blue-100 absolute top-4.5 right-4.5 justify-self-end md:top-7 md:left-7"
            >
              <IoClose className="size-6 md:size-7" />
            </Button>
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

import MoodLogForm from "@/components/home/mood-logging/MoodLogForm"
import Button from "@/components/ui/Button"
import { Modal, ModalTrigger, ModalContent } from "@/components/ui/Modal"

export default function MoodLogDialog() {
  return (
    <Modal title="Log your mood">
      <ModalTrigger>
        <Button size="lg">Log today&apos;s mood</Button>
      </ModalTrigger>
      <ModalContent>
        <MoodLogForm />
      </ModalContent>
    </Modal>
  )
}

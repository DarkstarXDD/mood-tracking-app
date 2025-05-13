import {
  DialogTrigger,
  Button,
  Modal,
  Dialog,
  Heading,
  ModalOverlay,
} from "react-aria-components"
import { IoClose } from "react-icons/io5"

import UpdateProfileForm from "@/components/home/UpdateProfileForm"

export default function UpdateProfileDialog() {
  return (
    <DialogTrigger>
      <Button>Click Me</Button>
      <ModalOverlay className="fixed inset-0 z-10 flex min-h-dvh flex-col items-center justify-center overflow-auto bg-neutral-900/70 p-5">
        <Modal>
          <Dialog className="relative grid gap-8 rounded-2xl bg-white px-5 py-10 outline-none md:px-10 md:py-12">
            <div className="grid gap-2">
              <Button
                slot="close"
                className="rac-hover:bg-blue-50 rac-focus-visible:ring-2 absolute top-4.5 right-4.5 cursor-pointer justify-self-end rounded-md text-neutral-300 ring-blue-600 outline-none md:top-7 md:left-7"
              >
                <IoClose className="size-6 md:size-7" />
              </Button>
              <Heading
                slot="title"
                className="text-4xl leading-normal font-bold tracking-tight text-neutral-900"
              >
                Update your profile
              </Heading>
              <p className="text-lg leading-normal tracking-tight text-neutral-600">
                Personalize your account with your name and photo.
              </p>
            </div>
            <UpdateProfileForm buttonText="Save Changes" />
          </Dialog>
        </Modal>
      </ModalOverlay>
    </DialogTrigger>
  )
}

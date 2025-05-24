import { Modal, Dialog, Heading, ModalOverlay } from "react-aria-components"
import { IoClose } from "react-icons/io5"

import UpdateProfileForm from "@/components/home/UpdateProfileForm"
import Button from "@/components/ui/Button"
import useUser from "@/hooks/useUser"

type UpdateProfileDialog = {
  isDialogOpen: boolean
  onDialogClose: () => void
}

export default function UpdateProfileDialog({
  isDialogOpen,
  onDialogClose,
}: UpdateProfileDialog) {
  const { user } = useUser()

  return (
    <ModalOverlay
      isOpen={isDialogOpen}
      onOpenChange={onDialogClose}
      className="fixed inset-0 z-10 flex min-h-dvh flex-col items-center justify-center overflow-auto bg-neutral-900/70 p-5"
    >
      <Modal className="w-full max-w-152">
        <Dialog className="relative grid gap-8 rounded-2xl bg-white px-5 py-10 outline-none md:px-10 md:py-12">
          <div className="grid gap-2">
            <Button
              slot="close"
              variant="close"
              size="icon"
              className="absolute top-4.5 right-4.5 justify-self-end md:top-7 md:left-7"
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
          <UpdateProfileForm
            buttonText="Save Changes"
            name={user.name ?? undefined}
            avatarUrl={user.avatarUrl ?? undefined}
          />
        </Dialog>
      </Modal>
    </ModalOverlay>
  )
}

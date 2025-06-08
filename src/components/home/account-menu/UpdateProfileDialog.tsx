import { useRouter } from "next/navigation"

import UpdateProfileForm from "@/components/home/account-menu/UpdateProfileForm"
import { Modal, ModalContent } from "@/components/ui/Modal"
import useUser from "@/hooks/useUser"

type UpdateProfileDialogProps = {
  isDialogOpen: boolean
  onDialogClose: () => void
}

export default function UpdateProfileDialog({
  isDialogOpen,
  onDialogClose,
}: UpdateProfileDialogProps) {
  const { user } = useUser()
  const router = useRouter()

  return (
    <Modal
      title="Update your profile"
      isOpen={isDialogOpen}
      onOpenChange={onDialogClose}
    >
      <ModalContent>
        <div className="mt-2 grid gap-6 md:gap-8">
          <p className="text-lg leading-normal tracking-tight text-neutral-600">
            Personalize your account with your name and photo.
          </p>
          <UpdateProfileForm
            buttonText="Save Changes"
            name={user.name ?? undefined}
            avatarUrl={user.avatarUrl ?? undefined}
            onSuccess={() => {
              router.refresh()
              onDialogClose()
            }}
          />
        </div>
      </ModalContent>
    </Modal>
  )
}

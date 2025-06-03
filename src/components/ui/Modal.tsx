import React, {
  ReactNode,
  useContext,
  createContext,
  isValidElement,
  Children,
} from "react"
import {
  DialogTrigger,
  ModalOverlay,
  Modal as RACModal,
  Dialog,
  Heading,
} from "react-aria-components"
import { IoClose } from "react-icons/io5"

import Button from "@/components/ui/Button"

type ModalProps = {
  title: string
  isOpen?: boolean
  onOpenChange?: (isOpen: boolean) => void
}

const ModalContext = createContext<ModalProps>({ title: "" })

export function Modal({
  title,
  isOpen,
  onOpenChange,
  children,
}: ModalProps & { children: ReactNode }) {
  // Check if ModalTrigger is present among children
  const hasTrigger = Children.toArray(children).some(
    (child) => isValidElement(child) && child.type === ModalTrigger
  )

  if (hasTrigger) {
    return (
      <ModalContext.Provider value={{ title, isOpen, onOpenChange }}>
        <DialogTrigger>{children}</DialogTrigger>
      </ModalContext.Provider>
    )
  }

  // No ModalTrigger - no DialogTrigger wrapper
  return (
    <ModalContext.Provider value={{ title, isOpen, onOpenChange }}>
      {children}
    </ModalContext.Provider>
  )
}

export function ModalTrigger({ children }: { children: ReactNode }) {
  return <>{children}</>
}

export function ModalContent({ children }: { children: ReactNode }) {
  const { title, isOpen, onOpenChange } = useContext(ModalContext)

  return (
    <ModalOverlay
      isOpen={isOpen}
      onOpenChange={onOpenChange}
      className="rac-entering:animate-in rac-exiting:animate-out rac-entering:fade-in-0 rac-exiting:fade-out-0 fixed inset-0 z-10 flex min-h-dvh flex-col items-center overflow-auto bg-neutral-900/70 p-5 py-6 backdrop-blur duration-100 ease-out md:py-10 lg:py-16"
    >
      <RACModal className="no-scrollbar w-full max-w-152 overflow-auto">
        <Dialog className="from-gradient-start to-gradient-end relative rounded-2xl bg-linear-to-b from-75% bg-no-repeat px-5 py-10 outline-none md:px-10 md:py-12">
          <Button
            slot="close"
            variant="close"
            size="icon"
            className="rac-hover:bg-blue-100 absolute top-4.5 right-4.5 justify-self-end md:top-7 md:left-7"
          >
            <IoClose className="size-6 md:size-7" />
          </Button>
          <Heading
            slot="title"
            className="text-4xl leading-normal font-bold tracking-tight text-neutral-900"
          >
            {title}
          </Heading>
          {children}
        </Dialog>
      </RACModal>
    </ModalOverlay>
  )
}

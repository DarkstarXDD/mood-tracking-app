"use client"

import Image from "next/image"
import { useState } from "react"
import {
  MenuTrigger,
  Button,
  Popover,
  Menu,
  MenuItem,
  Separator,
  MenuItemProps,
} from "react-aria-components"
import { FiSettings, FiLogOut } from "react-icons/fi"

import { logoutUser } from "@/actions/auth"
import UpdateProfileDialog from "@/components/home/UpdateProfileDialog"
import useUser from "@/hooks/useUser"

export default function AccountMenu() {
  const { user } = useUser()
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  const openDialog = () => setIsDialogOpen(true)
  const closeDialog = () => setIsDialogOpen(false)

  return (
    <>
      <MenuTrigger>
        <Button
          aria-label="Account Details"
          className="rac-focus-visible:ring-3 cursor-pointer rounded-full ring-blue-600 outline-none"
        >
          <Image
            src={user.avatarUrl ?? "/avatar/avatar-placeholder.svg"}
            alt=""
            className="h-10 w-10 rounded-full"
            width={128}
            height={128}
          />
        </Button>
        <Popover
          placement="bottom end"
          className="w-full max-w-50 overflow-auto rounded-lg bg-white px-1 py-1"
        >
          <div className="grid gap-1">
            <div className="grid gap-0.25 px-3 py-2">
              <p className="text-lg leading-snug font-medium tracking-normal text-neutral-900">
                {user.name}
              </p>
              <p className="text-base leading-normal font-normal tracking-tight text-neutral-300">
                {user.email}
              </p>
            </div>
            <Separator className="h-0.25 border-none bg-blue-100" />

            <Menu className="outline-none">
              <AccountMenuItem onAction={openDialog}>
                <FiSettings className="size-4" />
                <span>Settings</span>
              </AccountMenuItem>

              <AccountMenuItem onAction={logoutUser}>
                <FiLogOut className="size-4" />
                <span>Logout</span>
              </AccountMenuItem>
            </Menu>
          </div>
        </Popover>
      </MenuTrigger>

      <UpdateProfileDialog
        isDialogOpen={isDialogOpen}
        onDialogClose={closeDialog}
      />
    </>
  )
}

function AccountMenuItem(props: MenuItemProps) {
  return (
    <MenuItem
      {...props}
      className="rac-focus-visible:ring-2 flex cursor-pointer items-center justify-start gap-2.5 rounded-md px-3 py-2 text-base leading-normal font-normal tracking-tight text-neutral-900 ring-blue-600 outline-none hover:bg-blue-50"
    />
  )
}

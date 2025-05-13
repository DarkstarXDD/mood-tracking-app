"use client"

import AccountMenu from "@/components/home/AccountMenu"
import UpdateProfileDialog from "@/components/home/UpdateProfileDialog"
import BrandLogo from "@/components/ui/BrandLogo"

export default function Header() {
  return (
    <header className="flex items-center justify-between">
      <BrandLogo />
      <UpdateProfileDialog />
      <AccountMenu />
    </header>
  )
}

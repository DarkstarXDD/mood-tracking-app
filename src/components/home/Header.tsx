"use client"

import AccountMenu from "@/components/home/account-menu/AccountMenu"
import BrandLogo from "@/components/ui/BrandLogo"

export default function Header() {
  return (
    <header className="flex items-center justify-between">
      <BrandLogo />
      <AccountMenu />
    </header>
  )
}

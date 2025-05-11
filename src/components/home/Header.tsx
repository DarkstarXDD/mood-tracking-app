import Image from "next/image"

import avatarPlaceholder from "@/assets/avatar-placeholder.svg"
import BrandLogo from "@/components/ui/BrandLogo"

export default function Header() {
  return (
    <header className="flex items-center justify-between">
      <BrandLogo />
      <Image src={avatarPlaceholder} alt="" className="h-10 w-10" />
    </header>
  )
}

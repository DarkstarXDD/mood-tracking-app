import LogInForm from "@/components/login/LogInForm"
import BrandLogo from "@/components/ui/BrandLogo"

export default function LogInPage() {
  return (
    <main className="grid w-full justify-items-center gap-8 md:gap-12">
      <BrandLogo />
      <LogInForm />
    </main>
  )
}

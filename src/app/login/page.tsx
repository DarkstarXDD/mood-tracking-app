import LoginForm from "@/components/login/LoginForm"
import BrandLogo from "@/components/ui/BrandLogo"

export default function LoginPage() {
  return (
    <main className="grid w-full justify-items-center gap-8 md:gap-12">
      <BrandLogo />
      <LoginForm />
    </main>
  )
}

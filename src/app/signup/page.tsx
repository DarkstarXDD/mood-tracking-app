import SignupForm from "@/components/signup/SignupForm"
import BrandLogo from "@/components/ui/BrandLogo"

export default function SignupPage() {
  return (
    <main className="grid w-full justify-items-center gap-8 md:gap-12">
      <BrandLogo />
      <SignupForm />
    </main>
  )
}

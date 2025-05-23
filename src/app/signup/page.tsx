import SignUpForm from "@/components/signup/SignUpForm"
import BrandLogo from "@/components/ui/BrandLogo"

export default function SignUpPage() {
  return (
    <main className="grid justify-items-center gap-8 md:gap-12">
      <BrandLogo />
      <SignUpForm />
    </main>
  )
}

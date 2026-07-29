import { Button } from "@/components/ui/button"
import { HeroSection } from "./_components/home/HeroSection"
import { FeaturedProperties } from "./_components/home/FeaturedProperties"
import { RoleCtaSection } from "./_components/home/RoleCtaSection"
import { WhyChooseUs } from "./_components/home/WhyChooseUs"


export default function Page() {
  return (
    <div>
      <HeroSection />
      <FeaturedProperties />
      <RoleCtaSection />
      <WhyChooseUs />
    </div>
  )
}

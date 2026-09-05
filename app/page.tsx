import { Navbar } from "@/components/sections/navbar";
import { Hero } from "@/components/sections/hero";
import { StatsBand } from "@/components/sections/stats-band";
import { ValueCards } from "@/components/sections/value-cards";
import { TopicsGrid } from "@/components/sections/topics-grid";
import { MeetKrishna } from "@/components/sections/meet-krishna";
import { SocialLinks } from "@/components/sections/social-links";
import { TestimonialsPlaceholder } from "@/components/sections/testimonials-placeholder";
import { CtaBand } from "@/components/sections/cta-band";
import { Footer } from "@/components/sections/footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="flex-1">
        <Hero />
        <StatsBand />
        <ValueCards />
        <TopicsGrid />
        <MeetKrishna />
        <SocialLinks />
        <TestimonialsPlaceholder />
        <CtaBand />
      </main>
      <Footer />
    </>
  );
}

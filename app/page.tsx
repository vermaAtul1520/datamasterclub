import { Navbar } from "@/components/sections/navbar";
import { Hero } from "@/components/sections/hero";
import { StatsBand } from "@/components/sections/stats-band";
import { GetPdfSection } from "@/components/sections/get-pdf-section";
import { ValueCards } from "@/components/sections/value-cards";
import { TopicsGrid } from "@/components/sections/topics-grid";
import { MeetKrishna } from "@/components/sections/meet-krishna";
import { SocialLinks } from "@/components/sections/social-links";
import { TestimonialsPlaceholder } from "@/components/sections/testimonials-placeholder";
import { CtaBand } from "@/components/sections/cta-band";
import { Footer } from "@/components/sections/footer";
import { InstagramShowcase } from "@/components/sections/instagram-showcase";
import { SourceBanner } from "@/components/source-banner";

export default function Home() {
  return (
    <>
      <SourceBanner />
      <Navbar />
      <main className="flex-1">
        <Hero />
        <StatsBand />
        <GetPdfSection />
        <ValueCards />
        <TopicsGrid />
        <MeetKrishna />
        <InstagramShowcase />
        <SocialLinks />
        <TestimonialsPlaceholder />
        <CtaBand />
      </main>
      <Footer />
    </>
  );
}

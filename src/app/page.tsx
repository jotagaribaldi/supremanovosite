import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Hero } from "@/components/sections/Hero";
import { Services } from "@/components/sections/Services";
import { About } from "@/components/sections/About";
import { Stats } from "@/components/sections/Stats";
import { CTA } from "@/components/sections/CTA";
import { BlogPreview } from "@/components/sections/BlogPreview";
import { TechStack } from "@/components/sections/TechStack";

export default async function HomePage() {
  return (
    <>
      <Header />
      <main id="main-content" className="min-h-screen">
        <Hero />
        <Services />
        <About />
        <Stats />
        <TechStack />
        <BlogPreview />
        <CTA />
      </main>
      <Footer />
    </>
  );
}
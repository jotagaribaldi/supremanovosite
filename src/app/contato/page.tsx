import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { getSiteSettings } from "@/lib/settings";
import { ContactForm } from "./ContactForm";

export const dynamic = "force-dynamic";

export default async function ContactPage() {
  const settings = await getSiteSettings();

  return (
    <>
      <Header />
      <main id="main-content" className="min-h-screen pt-16">
        <ContactForm settings={settings} />
      </main>
      <Footer />
    </>
  );
}
import { ArrowRight, MessageSquare, Phone } from "lucide-react";
import { Button } from "@/components/ui/Button";
import Link from "next/link";
import { getSiteSettings } from "@/lib/settings";

export async function CTA() {
  const settings = await getSiteSettings();

  return (
    <section className="section-padding bg-gradient-to-br from-primary via-primary/90 to-secondary" aria-labelledby="cta-title">
      <div className="container-custom">
        <div className="max-w-4xl mx-auto text-center">
          <h2 id="cta-title" className="text-3xl sm:text-4xl lg:text-5xl font-bold text-primary-foreground mb-6">
            Pronto para <span className="text-accent">Transformar</span> seu Negócio?
          </h2>
          <p className="text-lg sm:text-xl text-primary-foreground/90 mb-10 max-w-2xl mx-auto">
            Vamos conversar sobre seu projeto e encontrar a melhor solução tecnológica para sua empresa.
            Agende uma consultoria gratuita sem compromisso.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
            <Link href="/contato">
              <Button size="lg" className="gap-2 bg-primary-foreground text-primary hover:bg-primary-foreground/90 w-full sm:w-auto">
                <MessageSquare className="h-5 w-5" aria-hidden="true" />
                Solicitar Orçamento
                <ArrowRight className="h-5 w-5" />
              </Button>
            </Link>
            <a href={`https://wa.me/${settings.whatsappNumber}`} target="_blank" rel="noopener noreferrer">
              <Button variant="secondary" size="lg" className="gap-2 w-full sm:w-auto">
                <Phone className="h-5 w-5" aria-hidden="true" />
                Falar no WhatsApp
              </Button>
            </a>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-primary-foreground/70">
            <div className="flex items-center gap-2">
              <span className="font-medium">Resposta em até 2h úteis</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="font-medium">Consultoria inicial gratuita</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="font-medium">NDA disponível</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
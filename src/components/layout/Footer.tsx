import Link from "next/link";
import { Mail, Phone, MapPin, Building2, Globe, Camera, MessageSquare, Send, ArrowRight, Check } from "lucide-react";
import { getSiteSettings } from "@/lib/settings";

export async function Footer() {
  const settings = await getSiteSettings();

  const footerLinks = {
    empresa: [
      { name: "Sobre Nós", href: "/sobre" },
      { name: "Nossos Serviços", href: "/servicos" },
      { name: "Portfólio", href: "/portfolio" },
      { name: "Blog", href: "/blog" },
      { name: "Contato", href: "/contato" },
    ],
    servicos: [
      { name: "Desenvolvimento Web", href: "/servicos/desenvolvimento-web" },
      { name: "Segurança & LGPD", href: "/servicos/seguranca-lgpd" },
      { name: "Cloud & Infraestrutura", href: "/servicos/cloud-infraestrutura" },
      { name: "Arquitetura de Software", href: "/servicos/arquitetura-software" },
      { name: "Suporte & Manutenção", href: "/servicos/suporte-manutencao" },
    ],
    recursos: [
      { name: "Política de Privacidade", href: "/politica-privacidade" },
      { name: "Termos de Uso", href: "/termos-uso" },
      { name: "Mapa do Site", href: "/mapa-do-site" },
      { name: "LGPD", href: "/lgpd" },
    ],
  };

  const benefits = [
    "Equipe certificada e experiente",
    "Metodologias ágeis e modernas",
    "Suporte dedicado e SLA garantido",
    "Segurança e conformidade LGPD",
    "Tecnologias de ponta",
    "Parceria de longo prazo",
  ];

  return (
    <footer className="bg-slate-950 text-slate-300" role="contentinfo">
      <div className="container-custom py-16 lg:py-24">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-6">
          <div className="lg:col-span-2">
            <Link href="/" className="flex items-center gap-2 mb-6" aria-label="Suprema Consultoria em TI - Início">
              <img src={settings.logo} alt="" className="h-10 w-auto" />
              <span className="font-bold text-xl text-white">Suprema TI</span>
            </Link>
            <p className="text-slate-400 mb-6 max-w-xs leading-relaxed">
              {settings.siteDescription}
            </p>
            <div className="flex gap-4">
              {settings.linkedinUrl && (
                <a href={settings.linkedinUrl} target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-white transition-colors" aria-label="LinkedIn">
                  <Building2 className="h-5 w-5" />
                </a>
              )}
              {settings.githubUrl && (
                <a href={settings.githubUrl} target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-white transition-colors" aria-label="GitHub">
                  <Globe className="h-5 w-5" />
                </a>
              )}
              {settings.instagramUrl && (
                <a href={settings.instagramUrl} target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-white transition-colors" aria-label="Instagram">
                  <Camera className="h-5 w-5" />
                </a>
              )}
              {settings.facebookUrl && (
                <a href={settings.facebookUrl} target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-white transition-colors" aria-label="Facebook">
                  <MessageSquare className="h-5 w-5" />
                </a>
              )}
              {settings.twitterUrl && (
                <a href={settings.twitterUrl} target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-white transition-colors" aria-label="Twitter">
                  <Send className="h-5 w-5" />
                </a>
              )}
            </div>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4">Empresa</h3>
            <nav aria-label="Links da empresa">
              <ul className="space-y-3">
                {footerLinks.empresa.map((link) => (
                  <li key={link.name}>
                    <Link href={link.href} className="text-slate-400 hover:text-white transition-colors flex items-center gap-2">
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4">Serviços</h3>
            <nav aria-label="Links dos serviços">
              <ul className="space-y-3">
                {footerLinks.servicos.map((link) => (
                  <li key={link.name}>
                    <Link href={link.href} className="text-slate-400 hover:text-white transition-colors flex items-center gap-2">
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4">Recursos</h3>
            <nav aria-label="Links de recursos">
              <ul className="space-y-3">
                {footerLinks.recursos.map((link) => (
                  <li key={link.name}>
                    <Link href={link.href} className="text-slate-400 hover:text-white transition-colors flex items-center gap-2">
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4">Contato</h3>
            <address className="not-italic space-y-4">
              <a href={`mailto:${settings.contactEmail}`} className="flex items-center gap-3 text-slate-400 hover:text-white transition-colors">
                <Mail className="h-5 w-5 text-primary flex-shrink-0" aria-hidden="true" />
                <span>{settings.contactEmail}</span>
              </a>
              <a href={`tel:${settings.contactPhone}`} className="flex items-center gap-3 text-slate-400 hover:text-white transition-colors">
                <Phone className="h-5 w-5 text-primary flex-shrink-0" aria-hidden="true" />
                <span>{settings.contactPhone}</span>
              </a>
              <div className="flex items-start gap-3 text-slate-400">
                <MapPin className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" aria-hidden="true" />
                <span className="leading-relaxed">{settings.contactAddress}</span>
              </div>
              <a href={`https://wa.me/${settings.whatsappNumber}`} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-sm font-medium text-primary hover:text-primary/80 transition-colors">
                <span>WhatsApp</span>
                <ArrowRight className="h-4 w-4" />
              </a>
            </address>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-slate-800">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <p className="text-slate-500 text-sm">
              © {new Date().getFullYear()} {settings.siteName}. Todos os direitos reservados.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-slate-500">
              <span className="flex items-center gap-1.5">
                <Check className="h-3.5 w-3.5 text-green-500" aria-hidden="true" />
                CNPJ: 00.000.000/0001-00
              </span>
              <span className="flex items-center gap-1.5">
                <Check className="h-3.5 w-3.5 text-green-500" aria-hidden="true" />
                Desenvolvido com Next.js
              </span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
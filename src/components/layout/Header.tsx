"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, ChevronDown, Monitor, Shield, Cloud, Code, Wrench, HeadphonesIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/Button";

const navigation = [
  { name: "Início", href: "/" },
  { name: "Sobre", href: "/sobre" },
  { name: "Serviços", href: "/servicos" },
  { name: "Portfólio", href: "/portfolio" },
  { name: "Blog", href: "/blog" },
  { name: "Contato", href: "/contato" },
];

const services = [
  { name: "Desenvolvimento Web", href: "/servicos/desenvolvimento-web", icon: Code, description: "Sistemas web, APIs e aplicações modernas" },
  { name: "Segurança & LGPD", href: "/servicos/seguranca-lgpd", icon: Shield, description: "Auditoria, pentest e adequação LGPD" },
  { name: "Cloud & Infraestrutura", href: "/servicos/cloud-infraestrutura", icon: Cloud, description: "AWS, Azure, VPS, containers e DevOps" },
  { name: "Arquitetura de Software", href: "/servicos/arquitetura-software", icon: Monitor, description: "Code review, migração e decisões técnicas" },
  { name: "Suporte & Manutenção", href: "/servicos/suporte-manutencao", icon: Wrench, description: "SLA, monitoramento 24/7 e atualizações" },
];

export function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        isScrolled ? "bg-white/95 backdrop-blur-sm shadow-sm border-b border-gray-100" : "bg-transparent"
      )}
    >
      <nav className="container-custom" aria-label="Navegação principal">
        <div className="flex h-16 items-center justify-between">
          <Link href="/" className="flex items-center gap-2" aria-label="Suprema Consultoria em TI - Início">
            <img src="/logo.png" alt="" className="h-10 w-auto" />
            <span className="hidden sm:block font-bold text-xl text-primary">Suprema TI</span>
          </Link>

          <div className="hidden md:flex md:items-center md:gap-1">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  "px-4 py-2 text-sm font-medium transition-colors rounded-lg",
                  pathname === item.href
                    ? "bg-primary/10 text-primary"
                    : "text-gray-600 hover:text-primary hover:bg-primary/5"
                )}
              >
                {item.name}
              </Link>
            ))}

            <div className="relative group">
              <button
                className={cn(
                  "flex items-center gap-1 px-4 py-2 text-sm font-medium transition-colors rounded-lg",
                  pathname.startsWith("/servicos")
                    ? "bg-primary/10 text-primary"
                    : "text-gray-600 hover:text-primary hover:bg-primary/5"
                )}
                aria-haspopup="true"
                aria-expanded={servicesOpen}
              >
                Serviços <ChevronDown className="h-4 w-4" />
              </button>
              <div className="absolute left-0 top-full z-50 mt-2 w-72 rounded-xl bg-white py-3 shadow-lg border border-gray-100 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                {services.map((service) => (
                  <Link
                    key={service.name}
                    href={service.href}
                    className="flex items-center gap-3 px-4 py-3 text-sm transition-colors hover:bg-primary/5"
                  >
                    <service.icon className="h-5 w-5 text-primary" aria-hidden="true" />
                    <div>
                      <p className="font-medium text-gray-900">{service.name}</p>
                      <p className="text-xs text-gray-500">{service.description}</p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>

          <div className="hidden md:flex md:items-center md:gap-3">
            <Link href="/contato">
              <Button variant="outline" size="sm">
                Fale Conosco
              </Button>
            </Link>
            <Link href="/contato">
              <Button size="sm">Solicitar Orçamento</Button>
            </Link>
          </div>

          <button
            className="md:hidden p-2 rounded-lg text-gray-600 hover:bg-gray-100"
            onClick={() => setIsOpen(!isOpen)}
            aria-expanded={isOpen}
            aria-controls="mobile-menu"
            aria-label={isOpen ? "Fechar menu" : "Abrir menu"}
          >
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {isOpen && (
          <div id="mobile-menu" className="md:hidden py-4 border-t border-gray-100 animate-in">
            <div className="flex flex-col gap-2">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className={cn(
                    "px-4 py-3 text-base font-medium rounded-lg transition-colors",
                    pathname === item.href
                      ? "bg-primary/10 text-primary"
                      : "text-gray-600 hover:text-primary hover:bg-primary/5"
                  )}
                >
                  {item.name}
                </Link>
              ))}
              <div className="pt-2 border-t border-gray-100">
                <button
                  onClick={() => setServicesOpen(!servicesOpen)}
                  className="flex items-center justify-between w-full px-4 py-3 text-base font-medium text-gray-600 hover:text-primary"
                  aria-expanded={servicesOpen}
                >
                  Serviços
                  <ChevronDown className={cn("h-5 w-5 transition-transform", servicesOpen && "rotate-180")} />
                </button>
                {servicesOpen && (
                  <div className="pl-4 mt-2 space-y-1">
                    {services.map((service) => (
                      <Link
                        key={service.name}
                        href={service.href}
                        className="flex items-center gap-2 px-3 py-2 text-sm text-gray-600 hover:text-primary transition-colors"
                      >
                        <service.icon className="h-4 w-4" aria-hidden="true" />
                        {service.name}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
              <div className="pt-4 flex flex-col gap-3">
                <Link href="/contato">
                  <Button variant="outline" className="w-full">Fale Conosco</Button>
                </Link>
                <Link href="/contato">
                  <Button className="w-full">Solicitar Orçamento</Button>
                </Link>
              </div>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
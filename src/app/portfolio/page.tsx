import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { ArrowRight, Code, Shield, Cloud, Monitor, Globe, Database } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";

const projects = [
  {
    title: "Portal do Cliente - Fintech",
    client: "Financeira XYZ",
    category: "Sistema Web",
    shortDesc: "Portal completo para gestão de empréstimos, investimentos e conta digital com 50k+ usuários ativos.",
    description: "Desenvolvimento de portal web full-stack para fintech de crédito pessoal. Inclui onboarding digital, KYC automatizado, gestão de contratos, simuladores, área do investidor e dashboard administrativo. Arquitetura de microsserviços com Node.js, React, PostgreSQL e Kubernetes na AWS.",
    image: "/placeholder-portfolio-1.jpg",
    gallery: ["/placeholder-portfolio-1.jpg"],
    technologies: ["React", "Next.js", "Node.js", "TypeScript", "PostgreSQL", "Redis", "Kubernetes", "AWS"],
    projectUrl: "https://exemplo.com",
    featured: true,
  },
  {
    title: "Plataforma E-commerce B2B",
    client: "Distribuidora ABC",
    category: "E-commerce",
    shortDesc: "E-commerce B2B com gestão de pedidos, cotações, tabelas de preço por cliente e integração ERP.",
    description: "Plataforma de comércio eletrônico B2B com catálogo dinâmico, cotações personalizadas, aprovação de pedidos, integração com ERP (TOTVS/Sankhya), gestão de representantes e relatórios gerenciais. Stack: Next.js, NestJS, PostgreSQL, Docker.",
    image: "/placeholder-portfolio-2.jpg",
    gallery: ["/placeholder-portfolio-2.jpg"],
    technologies: ["Next.js", "NestJS", "PostgreSQL", "Docker", "RabbitMQ", "AWS"],
    projectUrl: "https://exemplo.com",
    featured: true,
  },
  {
    title: "Sistema de Gestão Legislativa",
    client: "Câmara Municipal",
    category: "Sistema Público",
    shortDesc: "Sistema completo para gestão de sessões, votações, atas, leis, decretos e transparência pública.",
    description: "Portal institucional e sistema de gestão legislativa atendendo à Lei de Acesso à Informação e transparência. Módulos: pauta de sessões, votação eletrônica, geração de atas, publicação de leis/decretos, portal de transparência, ouvidoria. Tecnologias: Laravel, Vue.js, MySQL.",
    image: "/placeholder-portfolio-3.jpg",
    gallery: ["/placeholder-portfolio-3.jpg"],
    technologies: ["Laravel", "Vue.js", "MySQL", "Docker", "Linux", "Nginx"],
    projectUrl: "https://exemplo.com",
    featured: false,
  },
  {
    title: "App de Delivery - Marketplace",
    client: "Startup FoodTech",
    category: "Mobile App",
    shortDesc: "Aplicativo mobile (iOS/Android) para delivery de alimentos com rastreamento em tempo real.",
    description: "Marketplace de delivery com app para cliente, estabelecimento e entregador. Funcionalidades: catálogo, carrinho, pagamentos (Stripe/Mercado Pago), rastreamento GPS, avaliações, programa de fidelidade, painel administrativo. React Native, Node.js, PostgreSQL, WebSockets.",
    image: "/placeholder-portfolio-4.jpg",
    gallery: ["/placeholder-portfolio-4.jpg"],
    technologies: ["React Native", "Node.js", "TypeScript", "PostgreSQL", "WebSockets", "AWS"],
    projectUrl: "https://exemplo.com",
    featured: false,
  },
  {
    title: "Migração Cloud & Modernização",
    client: "Indústria Química",
    category: "Cloud & DevOps",
    shortDesc: "Migração de datacenter on-premise para AWS com modernização de aplicações legadas.",
    description: "Projeto de migração lift-and-shift + refatoração de 15 aplicações legadas (Java/.NET) para AWS. Implementação de Landing Zone, Kubernetes (EKS), CI/CD, observabilidade, FinOps. Redução de 40% no custo de infraestrutura e 99.9% disponibilidade.",
    image: "/placeholder-portfolio-5.jpg",
    gallery: ["/placeholder-portfolio-5.jpg"],
    technologies: ["AWS", "EKS", "Terraform", "Java", ".NET", "Docker", "Prometheus", "Grafana"],
    projectUrl: "https://exemplo.com",
    featured: true,
  },
  {
    title: "Adequação LGPD - Saúde",
    client: "Rede Hospitalar",
    category: "Segurança & LGPD",
    shortDesc: "Projeto completo de adequação à LGPD para rede hospitalar com 10 unidades e 2M+ pacientes.",
    description: "Mapeamento de dados sensíveis (DPIA), implementação de controles técnicos e organizacionais, nomeação de DPO, políticas de privacidade, termos de consentimento, gestão de direitos do titular, treinamento de 500+ colaboradores, certificação ISO 27001.",
    image: "/placeholder-portfolio-6.jpg",
    gallery: ["/placeholder-portfolio-6.jpg"],
    technologies: ["LGPD", "ISO 27001", "DPIA", "OneTrust", "Varonis", "SIEM", "DLP"],
    projectUrl: "https://exemplo.com",
    featured: false,
  },
];

const categories = ["Todos", "Sistema Web", "E-commerce", "Sistema Público", "Mobile App", "Cloud & DevOps", "Segurança & LGPD"];

export default function PortfolioPage() {
  return (
    <>
      <Header />
      <main id="main-content" className="min-h-screen pt-16">
        <section className="section-padding bg-gradient-to-br from-primary/5 via-background to-accent/5" aria-labelledby="portfolio-hero-title">
          <div className="container-custom">
            <div className="max-w-3xl mx-auto text-center">
              <h1 id="portfolio-hero-title" className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-foreground mb-6">
                Nosso <span className="text-primary">Portfólio</span>
              </h1>
              <p className="text-lg sm:text-xl text-muted-foreground mb-8">
                Projetos desenvolvidos com tecnologia, qualidade e comprometimento.
                Conheça alguns casos de sucesso que transformamos em realidade.
              </p>
            </div>
          </div>
        </section>

        <section className="section-padding" aria-labelledby="filters-title">
          <div className="container-custom">
            <div className="flex flex-wrap gap-2 justify-center mb-12" role="group" aria-label="Filtrar projetos por categoria">
              {categories.map((cat) => (
                <button
                  key={cat}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                    cat === "Todos"
                      ? "bg-primary text-primary-foreground shadow-sm"
                      : "bg-gray-100 dark:bg-slate-800 text-gray-700 dark:text-slate-300 hover:bg-primary/10 hover:text-primary"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
              {projects.map((project, index) => (
                <article
                  key={project.title}
                  className="group rounded-2xl overflow-hidden border border-gray-100 dark:border-slate-700 bg-white dark:bg-slate-800 hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
                >
                  <div className="relative aspect-video overflow-hidden bg-gradient-to-br from-primary/10 to-accent/10">
                    {project.featured && (
                      <div className="absolute top-3 left-3 z-10">
                        <Badge variant="default" className="text-xs">Destaque</Badge>
                      </div>
                    )}
                    <div className="absolute inset-0 flex items-center justify-center text-muted-foreground">
                      <Code className="h-12 w-12 opacity-50" aria-hidden="true" />
                    </div>
                  </div>
                  <div className="p-6 space-y-4">
                    <div className="flex items-center gap-2 flex-wrap">
                      <Badge variant="outline" className="text-xs">{project.category}</Badge>
                      <span className="text-xs text-muted-foreground">{project.client}</span>
                    </div>
                    <h3 className="text-lg font-semibold text-foreground group-hover:text-primary transition-colors line-clamp-1">
                      {project.title}
                    </h3>
                    <p className="text-sm text-muted-foreground line-clamp-2">{project.shortDesc}</p>
                    <div className="flex flex-wrap gap-2 pt-2">
                      {project.technologies.slice(0, 5).map((tech) => (
                        <Badge key={tech} variant="secondary" className="text-xs px-2 py-1">
                          {tech}
                        </Badge>
                      ))}
                      {project.technologies.length > 5 && (
                        <Badge variant="outline" className="text-xs px-2 py-1">
                          +{project.technologies.length - 5}
                        </Badge>
                      )}
                    </div>
                    <Link
                      href={`/portfolio/${project.title.toLowerCase().replace(/\s+/g, "-")}`}
                      className="inline-flex items-center gap-1 text-sm font-medium text-primary hover:text-primary/80 transition-colors"
                    >
                      Ver Case Completo
                      <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" aria-hidden="true" />
                    </Link>
                  </div>
                </article>
              ))}
            </div>

            <div className="text-center mt-12">
              <Button variant="outline" size="lg" className="gap-2">
                Ver Mais Projetos
                <ArrowRight className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </section>

        <section className="section-padding bg-primary text-primary-foreground" aria-labelledby="cta-title">
          <div className="container-custom text-center">
            <h2 id="cta-title" className="text-3xl sm:text-4xl font-bold mb-4">
              Tem um projeto em mente?
            </h2>
            <p className="text-lg text-primary-foreground/90 mb-8 max-w-2xl mx-auto">
              Vamos transformar sua ideia em uma solução real e eficiente. Agende uma conversa sem compromisso.
            </p>
            <Link href="/contato">
              <Button size="lg" variant="secondary" className="gap-2">
                Iniciar Projeto
                <ArrowRight className="h-5 w-5" />
              </Button>
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
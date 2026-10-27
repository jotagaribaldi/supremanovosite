import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Code, Shield, Cloud, Monitor, Wrench, HeadphonesIcon, ArrowRight, Check } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";

const services = [
  {
    icon: Code,
    title: "Desenvolvimento Web & APIs",
    slug: "desenvolvimento-web",
    shortDesc: "Sistemas web robustos, APIs RESTful/GraphQL e aplicações modernas com as melhores tecnologias.",
    fullDesc: "Criamos soluções web personalizadas do zero ou modernizamos sistemas legados. Utilizamos React, Next.js, Node.js, TypeScript, Python, Go e outras tecnologias modernas para entregar aplicações escaláveis, performáticas e fáceis de manter.",
    features: ["Desenvolvimento full-stack (React/Next.js, Node.js, Python)", "APIs RESTful e GraphQL com documentação OpenAPI", "Arquitetura de microsserviços e serverless", "Modernização de sistemas legados", "Testes automatizados (unit, integration, e2e)", "CI/CD e deploy automatizado"],
    benefits: ["Código limpo e documentado", "Arquitetura escalável", "Performance otimizada", "Segurança by design", "Entrega contínua", "Suporte pós-entrega"],
    technologies: ["React", "Next.js", "Node.js", "TypeScript", "Python", "PostgreSQL", "Docker", "Kubernetes"],
    color: "from-blue-500 to-blue-600",
    bgColor: "bg-blue-50 dark:bg-blue-900/20",
  },
  {
    icon: Shield,
    title: "Segurança da Informação & LGPD",
    slug: "seguranca-lgpd",
    shortDesc: "Proteja seus dados e atenda à legislação. Auditoria, pentest, implementação de controles LGPD e gestão de vulnerabilidades.",
    fullDesc: "Oferecemos serviços completos de segurança da informação para proteger seus ativos de informação e garantir conformidade regulatória. Nossa abordagem inclui avaliações técnicas, implementação de controles e gestão contínua de riscos.",
    features: ["Auditoria de segurança de aplicações e infraestrutura", "Teste de invasão (Pentest) - Black/Gray/White box", "Adequação completa à LGPD (Lei 13.709/2018)", "Gestão de vulnerabilidades contínua", "Implementação de ISO 27001", "Treinamento de conscientização em segurança"],
    benefits: ["Conformidade legal garantida", "Redução de riscos", "Proteção de reputação", "Evita multas e sanções", "Melhora maturidade de segurança", "Relatórios executivos"],
    technologies: ["OWASP", "Burp Suite", "Nessus", "Metasploit", "Vault", "SIEM", "ISO 27001", "LGPD"],
    color: "from-green-500 to-green-600",
    bgColor: "bg-green-50 dark:bg-green-900/20",
  },
  {
    icon: Cloud,
    title: "Cloud Computing & Infraestrutura",
    slug: "cloud-infraestrutura",
    shortDesc: "Migração, gestão e otimização de infraestrutura na nuvem. AWS, Azure, Google Cloud, Kubernetes, Docker e DevOps.",
    fullDesc: "Ajudamos sua empresa a tirar o máximo proveito da nuvem. Desde migração lift-and-shift até arquiteturas cloud-native, passando por otimização de custos (FinOps), implementação de IaC e pipelines de CI/CD.",
    features: ["Migração para nuvem (AWS, Azure, GCP)", "Arquitetura serverless e containers (K8s, ECS)", "Infraestrutura como Código (Terraform, Pulumi)", "CI/CD pipelines (GitHub Actions, GitLab, Jenkins)", "FinOps e otimização de custos", "Disaster Recovery e Backup gerenciado"],
    benefits: ["Escalabilidade elástica", "Redução de custos operacionais", "Alta disponibilidade", "Deploy rápido e seguro", "Observabilidade completa", "Governança e compliance"],
    technologies: ["AWS", "Azure", "GCP", "Kubernetes", "Docker", "Terraform", "Prometheus", "Grafana"],
    color: "from-purple-500 to-purple-600",
    bgColor: "bg-purple-50 dark:bg-purple-900/20",
  },
  {
    icon: Monitor,
    title: "Arquitetura & Consultoria Técnica",
    slug: "arquitetura-software",
    shortDesc: "Tomadas de decisão técnicas estratégicas. Code review, definição de stack, arquitetura de microsserviços, escalabilidade e performance.",
    fullDesc: "Oferecemos consultoria técnica de alto nível para ajudar sua equipe a tomar as melhores decisões arquiteturais. Realizamos code reviews profundos, avaliamos stacks tecnológicas, desenhamos arquiteturas escaláveis e otimizamos performance.",
    features: ["Code review especializado e mentoria", "Arquitetura de microsserviços e sistemas distribuídos", "Avaliação e seleção de stack tecnológica", "Otimização de performance e bottlenecks", "Due diligence técnica para investimentos", "Definição de padrões e guidelines"],
    benefits: ["Decisões técnicas embasadas", "Redução de dívida técnica", "Melhoria de performance", "Escalabilidade planejada", "Transferência de conhecimento", "Redução de riscos"],
    technologies: ["System Design", "Domain-Driven Design", "Event-Driven", "CQRS", "Observabilidade", "Performance"],
    color: "from-orange-500 to-orange-600",
    bgColor: "bg-orange-50 dark:bg-orange-900/20",
  },
  {
    icon: Wrench,
    title: "Suporte & Manutenção Contínua",
    slug: "suporte-manutencao",
    shortDesc: "SLA garantido, monitoramento 24/7, atualizações de segurança, backup gerenciado e suporte especializado.",
    fullDesc: "Mantenha seus sistemas sempre disponíveis e seguros com nosso serviço de suporte gerenciado. Oferecemos monitoramento proativo, resposta a incidentes, aplicação de patches de segurança, gestão de backups e evolução contínua.",
    features: ["Monitoramento 24/7 com alertas inteligentes", "SLA personalizado (tempo de resposta/resolução)", "Gestão de patches e atualizações de segurança", "Backup automatizado e testado (RPO/RTO)", "Gestão de incidentes e problem management", "Relatórios mensais de saúde e performance"],
    benefits: ["Tranquilidade operacional", "Redução de downtime", "Conformidade de segurança", "Custos previsíveis", "Foco no core business", "Escala conforme demanda"],
    technologies: ["Datadog", "New Relic", "PagerDuty", "Veeam", "AWS Backup", "Runbooks", "ITIL"],
    color: "from-cyan-500 to-cyan-600",
    bgColor: "bg-cyan-50 dark:bg-cyan-900/20",
  },
  {
    icon: HeadphonesIcon,
    title: "Outsourcing & Alocação de Profissionais",
    slug: "outsourcing",
    shortDesc: "Equipes técnicas dedicadas ou profissionais alocados para complementar seu time. Desenvolvedores, DevOps, QA e arquitetos.",
    fullDesc: "Complementamos sua equipe com profissionais qualificados sob demanda. Seja para um projeto específico, aumento de capacidade ou skills específicas, fornecemos desenvolvedores, DevOps, QAs, arquitetos e tech leads com gestão de performance inclusa.",
    features: ["Squads ágeis dedicadas (product + tech)", "Alocação individual (staff augmentation)", "Gestão de performance e career path", "Troca de profissionais sem burocracia", "Onboarding técnico acelerado", "Knowledge sharing contínuo"],
    benefits: ["Flexibilidade de escala", "Redução de tempo de contratação", "Acesso a skills especializadas", "Gestão compartilhada", "Custo-benefício otimizado", "Continuidade do conhecimento"],
    technologies: ["React", "Node.js", "Python", "Go", "AWS", "Kubernetes", "QA", "DevOps"],
    color: "from-indigo-500 to-indigo-600",
    bgColor: "bg-indigo-50 dark:bg-indigo-900/20",
  },
];

export default function ServicesPage() {
  return (
    <>
      <Header />
      <main id="main-content" className="min-h-screen pt-16">
        <section className="section-padding bg-gradient-to-br from-primary/5 via-background to-accent/5" aria-labelledby="services-hero-title">
          <div className="container-custom">
            <div className="max-w-3xl mx-auto text-center">
              <h1 id="services-hero-title" className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-foreground mb-6">
                Nossos <span className="text-primary">Serviços</span>
              </h1>
              <p className="text-lg sm:text-xl text-muted-foreground mb-8">
                Soluções completas em tecnologia para impulsionar seu negócio.
                Da estratégia à execução, somos seu parceiro de confiança.
              </p>
            </div>
          </div>
        </section>

        <section className="section-padding" aria-labelledby="services-list-title">
          <div className="container-custom">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
              {services.map((service) => (
                <article
                  key={service.slug}
                  className="group relative rounded-2xl p-6 lg:p-8 border border-gray-100 dark:border-slate-700 bg-white dark:bg-slate-800/50 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 overflow-hidden"
                >
                  <div className="absolute inset-0 bg-gradient-to-br opacity-0 group-hover:opacity-100 transition-opacity duration-300" style={{ background: service.color }} aria-hidden="true" />
                  <div className="relative z-10 space-y-5">
                    <div className={`${service.bgColor} p-3 rounded-xl w-fit`}>
                      <service.icon className="h-7 w-7 text-primary" aria-hidden="true" />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-foreground mb-2">{service.title}</h3>
                      <p className="text-muted-foreground leading-relaxed">{service.shortDesc}</p>
                    </div>
                    <ul className="space-y-2" role="list">
                      {service.features.slice(0, 4).map((feature) => (
                        <li key={feature} className="flex items-center gap-2 text-sm text-muted-foreground group-hover:text-foreground transition-colors">
                          <Check className="h-4 w-4 text-primary flex-shrink-0" aria-hidden="true" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                    <Link
                      href={`/servicos/${service.slug}`}
                      className="inline-flex items-center gap-2 text-sm font-medium text-primary hover:text-primary/80 transition-colors mt-4 group"
                    >
                      Ver detalhes
                      <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
                    </Link>
                  </div>
                </article>
              ))}
            </div>

            <div className="text-center mt-12">
              <Link href="/contato">
                <Button size="lg" className="gap-2">
                  Não encontrou o que procura? Fale conosco
                  <ArrowRight className="h-5 w-5" />
                </Button>
              </Link>
            </div>
          </div>
        </section>

        <section className="section-padding bg-gray-50 dark:bg-slate-900/50" aria-labelledby="process-title">
          <div className="container-custom">
            <div className="text-center max-w-3xl mx-auto mb-12">
              <h2 id="process-title" className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
                Nosso <span className="text-primary">Processo</span>
              </h2>
              <p className="text-lg text-muted-foreground">
                Metodologia comprovada para entregar resultados consistentes e de qualidade.
              </p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { step: "01", title: "Descoberta", desc: "Entendemos seu negócio, desafios e objetivos através de workshops e entrevistas." },
                { step: "02", title: "Planejamento", desc: "Definimos arquitetura, stack, cronograma e métricas de sucesso." },
                { step: "03", title: "Execução", desc: "Desenvolvemos com metodologias ágeis, code review e testes contínuos." },
                { step: "04", title: "Entrega & Evolução", desc: "Deploy, monitoramento, suporte e melhorias contínuas baseadas em dados." },
              ].map((item) => (
                <div key={item.step} className="relative p-6 rounded-2xl bg-white dark:bg-slate-800 border border-gray-100 dark:border-slate-700">
                  <div className="absolute -top-3 left-6 bg-primary text-primary-foreground px-3 py-1 rounded-full text-sm font-bold">
                    {item.step}
                  </div>
                  <div className="pt-6">
                    <h3 className="text-lg font-semibold text-foreground mb-2">{item.title}</h3>
                    <p className="text-muted-foreground">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Code, Shield, Cloud, Monitor, Wrench, HeadphonesIcon, ArrowLeft, Check, ArrowRight } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { Metadata } from "next";
import { notFound } from "next/navigation";

const servicesData = {
  "desenvolvimento-web": {
    icon: Code,
    title: "Desenvolvimento Web & APIs",
    shortDesc: "Sistemas web robustos, APIs RESTful/GraphQL e aplicações modernas com as melhores tecnologias.",
    fullDesc: "Criamos soluções web personalizadas do zero ou modernizamos sistemas legados. Utilizamos React, Next.js, Node.js, TypeScript, Python, Go e outras tecnologias modernas para entregar aplicações escaláveis, performáticas e fáceis de manter. Nossa abordagem inclui arquitetura limpa, testes automatizados, CI/CD e documentação completa.",
    features: ["Desenvolvimento full-stack (React/Next.js, Node.js, Python)", "APIs RESTful e GraphQL com documentação OpenAPI/Swagger", "Arquitetura de microsserviços e serverless", "Modernização de sistemas legados (strangler fig pattern)", "Testes automatizados (unit, integration, e2e, contract)", "CI/CD e deploy automatizado com zero-downtime", "Observabilidade: logs, métricas, tracing distribuído", "Segurança by design: OWASP Top 10, autenticação/autorização"],
    benefits: ["Código limpo, documentado e versionado", "Arquitetura escalável e evolutiva", "Performance otimizada (Core Web Vitals)", "Segurança integrada desde o desenvolvimento", "Entrega contínua e confiável", "Suporte e evolução pós-entrega", "Transferência de conhecimento para sua equipe"],
    technologies: ["React", "Next.js", "Node.js", "TypeScript", "Python", "Go", "PostgreSQL", "MongoDB", "Redis", "Docker", "Kubernetes", "GraphQL", "REST", "Jest", "Playwright", "GitHub Actions"],
    color: "from-blue-500 to-blue-600",
    bgColor: "bg-blue-50 dark:bg-blue-900/20",
    iconColor: "text-blue-600 dark:text-blue-400",
  },
  "seguranca-lgpd": {
    icon: Shield,
    title: "Segurança da Informação & LGPD",
    shortDesc: "Proteja seus dados e atenda à legislação. Auditoria, pentest, implementação de controles LGPD e gestão de vulnerabilidades.",
    fullDesc: "Oferecemos serviços completos de segurança da informação para proteger seus ativos de informação e garantir conformidade regulatória. Nossa abordagem inclui avaliações técnicas profundas, implementação de controles baseados em frameworks reconhecidos e gestão contínua de riscos de segurança.",
    features: ["Auditoria de segurança de aplicações (SAST/DAST/IAST)", "Teste de invasão (Pentest) - Black/Gray/White box", "Adequação completa à LGPD (Lei 13.709/2018) - DPIA, ROPA, DPO", "Gestão de vulnerabilidades contínua (SVM)", "Implementação de ISO 27001 / SOC 2", "Treinamento de conscientização em segurança (phishing, social engineering)", "Resposta a incidentes e forense digital", "DevSecOps: segurança no pipeline de CI/CD"],
    benefits: ["Conformidade legal garantida e auditável", "Redução significativa de riscos de vazamento", "Proteção de reputação e confiança do cliente", "Evita multas e sanções regulatórias (até 2% faturamento)", "Melhora maturidade de segurança da organização", "Relatórios executivos e técnicos detalhados", "Certificações e atestados de conformidade"],
    technologies: ["OWASP ASVS/MASVS", "Burp Suite Pro", "Nessus/OpenVAS", "Metasploit", "HashiCorp Vault", "SIEM (Elastic/Splunk)", "ISO 27001", "LGPD", "NIST CSF", "CIS Controls"],
    color: "from-green-500 to-green-600",
    bgColor: "bg-green-50 dark:bg-green-900/20",
    iconColor: "text-green-600 dark:text-green-400",
  },
  "cloud-infraestrutura": {
    icon: Cloud,
    title: "Cloud Computing & Infraestrutura",
    shortDesc: "Migração, gestão e otimização de infraestrutura na nuvem. AWS, Azure, Google Cloud, Kubernetes, Docker e DevOps.",
    fullDesc: "Ajudamos sua empresa a tirar o máximo proveito da nuvem. Desde migração lift-and-shift até arquiteturas cloud-native, passando por otimização de custos (FinOps), implementação de Infraestrutura como Código (IaC) e pipelines de CI/CD robustos.",
    features: ["Migração para nuvem (AWS, Azure, GCP) - lift-and-shift, re-platform, refactor", "Arquitetura serverless (Lambda, Cloud Functions) e containers (EKS, AKS, GKE, ECS)", "Infraestrutura como Código (Terraform, Pulumi, CloudFormation)", "CI/CD pipelines avançados (GitHub Actions, GitLab CI, ArgoCD)", "FinOps e otimização de custos (rightsizing, reserved instances, savings plans)", "Disaster Recovery e Backup gerenciado (RPO/RTO definidos)", "Service Mesh (Istio, Linkerd) e API Gateway", "Multi-cloud e hybrid cloud management"],
    benefits: ["Escalabilidade elástica sob demanda", "Redução de custos operacionais (CapEx → OpEx)", "Alta disponibilidade e tolerância a falhas (99.99%+)", "Deploy rápido, seguro e reversível", "Observabilidade completa (logs, métricas, traces)", "Governança, compliance e segurança na nuvem", "Inovação acelerada com serviços gerenciados"],
    technologies: ["AWS", "Azure", "GCP", "Kubernetes (EKS/AKS/GKE)", "Docker", "Terraform", "Pulumi", "Prometheus", "Grafana", "Loki", "Tempo", "ArgoCD", "Helm", "Istio", "Vault"],
    color: "from-purple-500 to-purple-600",
    bgColor: "bg-purple-50 dark:bg-purple-900/20",
    iconColor: "text-purple-600 dark:text-purple-400",
  },
  "arquitetura-software": {
    icon: Monitor,
    title: "Arquitetura & Consultoria Técnica",
    shortDesc: "Tomadas de decisão técnicas estratégicas. Code review, definição de stack, arquitetura de microsserviços, escalabilidade e performance.",
    fullDesc: "Oferecemos consultoria técnica de alto nível para ajudar sua equipe a tomar as melhores decisões arquiteturais. Realizamos code reviews profundos, avaliamos stacks tecnológicas, desenhamos arquiteturas escaláveis, otimizamos performance e resolvemos desafios técnicos complexos.",
    features: ["Code review especializado com relatório detalhado", "Arquitetura de microsserviços e sistemas distribuídos (DDD, Event-Driven)", "Avaliação e seleção de stack tecnológica (ADR - Architecture Decision Records)", "Otimização de performance: profiling, bottlenecks, database tuning", "Due diligence técnica para M&A e investimentos", "Definição de padrões, guidelines e governance técnico", "Modernização de arquiteturas legadas (strangler fig, anti-corruption layer)", "Mentoria técnica para tech leads e arquitetos"],
    benefits: ["Decisões técnicas embasadas e documentadas", "Redução drástica de dívida técnica", "Melhoria mensurável de performance (latência, throughput)", "Escalabilidade planejada e testada", "Transferência de conhecimento para equipe interna", "Redução de riscos técnicos e operacionais", "Alinhamento técnico-negócio"],
    technologies: ["System Design", "Domain-Driven Design", "Event-Driven Architecture", "CQRS/Event Sourcing", "Observabilidade (OpenTelemetry)", "Performance Engineering", "Chaos Engineering", "ADR"],
    color: "from-orange-500 to-orange-600",
    bgColor: "bg-orange-50 dark:bg-orange-900/20",
    iconColor: "text-orange-600 dark:text-orange-400",
  },
  "suporte-manutencao": {
    icon: Wrench,
    title: "Suporte & Manutenção Contínua",
    shortDesc: "SLA garantido, monitoramento 24/7, atualizações de segurança, backup gerenciado e suporte especializado.",
    fullDesc: "Mantenha seus sistemas sempre disponíveis, seguros e performáticos com nosso serviço de suporte gerenciado (Managed Services). Oferecemos monitoramento proativo 24/7, resposta a incidentes com SLA definido, aplicação de patches de segurança, gestão de backups testados e evolução contínua da plataforma.",
    features: ["Monitoramento 24/7 com alertas inteligentes (APM, Infrastructure, Logs)", "SLA personalizado: tempo de resposta e resolução por criticidade", "Gestão de patches e atualizações de segurança (OS, runtime, dependências)", "Backup automatizado, criptografado e testado regularmente (RPO/RTO)", "Gestão de incidentes (ITIL) e problem management", "Capacity planning e auto-scaling", "Relatórios mensais executivos de saúde, performance e custos", "Runbooks e playbooks operacionais documentados"],
    benefits: ["Tranquilidade operacional - focamos na infra, você no negócio", "Redução drástica de downtime não planejado", "Conformidade contínua de segurança e compliance", "Custos previsíveis e transparentes (OpEx)", "Foco da equipe interna no core business", "Escala elástica conforme demanda do negócio", "Melhoria contínua baseada em dados e métricas"],
    technologies: ["Datadog", "New Relic", "PagerDuty", "Opsgenie", "Veeam", "AWS Backup", "Terraform", "Ansible", "Runbooks", "ITIL", "SLO/SLI", "Error Budgets"],
    color: "from-cyan-500 to-cyan-600",
    bgColor: "bg-cyan-50 dark:bg-cyan-900/20",
    iconColor: "text-cyan-600 dark:text-cyan-400",
  },
  "outsourcing": {
    icon: HeadphonesIcon,
    title: "Outsourcing & Alocação de Profissionais",
    shortDesc: "Equipes técnicas dedicadas ou profissionais alocados para complementar seu time. Desenvolvedores, DevOps, QA e arquitetos.",
    fullDesc: "Complementamos sua equipe com profissionais qualificados sob demanda. Seja para um projeto específico, aumento de capacidade temporário ou skills especializadas, fornecemos desenvolvedores (front/back/full-stack), DevOps, QAs, arquitetos e tech leads com gestão de performance e career path inclusa.",
    features: ["Squads ágeis dedicadas (Product Owner + Tech Lead + Devs + QA)", "Alocação individual (staff augmentation) - senioridade definida", "Gestão de performance, feedback contínuo e career path", "Troca de profissionais sem burocracia (substituição em até 5 dias)", "Onboarding técnico acelerado (ambiente, processos, codebase)", "Knowledge sharing contínuo (tech talks, code reviews, docs)", "Flexibilidade de escala: ramp-up/ramp-down conforme sprint", "Compliance trabalhista e contratos PJ/CLT conforme necessidade"],
    benefits: ["Flexibilidade total de escala e composição de time", "Redução drástica de tempo de contratação (dias vs meses)", "Acesso imediato a skills especializadas e raras", "Gestão compartilhada: nós cuidamos da parte técnica/HR", "Custo-benefício otimizado vs contratação direta", "Continuidade do conhecimento mesmo com rotatividade", "Foco no delivery: nós gerenciamos pessoas, você gerencia produto"],
    technologies: ["React", "Next.js", "Vue", "Node.js", "Python", "Go", "Java", ".NET", "AWS", "Azure", "Kubernetes", "Terraform", "Jest", "Cypress", "Playwright", "GitLab CI", "GitHub Actions"],
    color: "from-indigo-500 to-indigo-600",
    bgColor: "bg-indigo-50 dark:bg-indigo-900/20",
    iconColor: "text-indigo-600 dark:text-indigo-400",
  },
};

interface ServicePageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: ServicePageProps): Promise<Metadata> {
  const { slug } = await params;
  const service = servicesData[slug as keyof typeof servicesData];
  
  if (!service) return { title: "Serviço não encontrado" };
  
  return {
    title: service.title,
    description: service.shortDesc,
    openGraph: {
      title: service.title,
      description: service.shortDesc,
      type: "website",
    },
  };
}

export default async function ServiceDetailPage({ params }: ServicePageProps) {
  const { slug } = await params;
  const service = servicesData[slug as keyof typeof servicesData];
  
  if (!service) notFound();

  return (
    <>
      <Header />
      <main id="main-content" className="min-h-screen pt-16">
        <section className="section-padding bg-gradient-to-br from-primary/5 via-background to-accent/5" aria-labelledby="service-title">
          <div className="container-custom">
            <Link href="/servicos" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors mb-6">
              <ArrowLeft className="h-4 w-4" aria-hidden="true" />
              Voltar aos Serviços
            </Link>
            <div className="flex items-center gap-3 mb-4">
              <div className={`p-4 rounded-2xl ${service.bgColor}`}>
                <service.icon className={`h-10 w-10 ${service.iconColor}`} aria-hidden="true" />
              </div>
              <div>
                <Badge variant="outline" className="text-sm">{service.title}</Badge>
              </div>
            </div>
            <h1 id="service-title" className="text-4xl sm:text-5xl font-bold text-foreground mb-4">
              {service.title}
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl">{service.fullDesc}</p>
          </div>
        </section>

        <section className="section-padding" aria-labelledby="features-title">
          <div className="container-custom">
            <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
              <div>
                <h2 id="features-title" className="text-3xl font-bold text-foreground mb-6">
                  O que <span className="text-primary">entregamos</span>
                </h2>
                <ul className="space-y-4" role="list">
                  {service.features.map((feature, index) => (
                    <li key={index} className="flex gap-4 p-4 rounded-xl bg-gray-50 dark:bg-slate-800/50 border border-gray-100 dark:border-slate-700">
                      <div className="flex-shrink-0 p-2 rounded-lg bg-primary/10 text-primary">
                        <Check className="h-5 w-5" aria-hidden="true" />
                      </div>
                      <span className="text-foreground leading-relaxed">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h3 className="text-2xl font-bold text-foreground mb-6">Benefícios para seu negócio</h3>
                <ul className="space-y-3" role="list">
                  {service.benefits.map((benefit, index) => (
                    <li key={index} className="flex gap-3">
                      <ArrowRight className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" aria-hidden="true" />
                      <span className="text-muted-foreground">{benefit}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        <section className="section-padding bg-gray-50 dark:bg-slate-900/50" aria-labelledby="tech-title">
          <div className="container-custom">
            <h2 id="tech-title" className="text-3xl font-bold text-foreground mb-6 text-center">
              Tecnologias <span className="text-primary">Utilizadas</span>
            </h2>
            <div className="flex flex-wrap justify-center gap-3">
              {service.technologies.map((tech) => (
                <Badge key={tech} variant="secondary" className="text-sm px-3 py-1.5">
                  {tech}
                </Badge>
              ))}
            </div>
          </div>
        </section>

        <section className="section-padding" aria-labelledby="cta-title">
          <div className="container-custom text-center">
            <h2 id="cta-title" className="text-3xl font-bold text-foreground mb-4">
              Vamos conversar sobre seu projeto?
            </h2>
            <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
              Agende uma consultoria gratuita para discutir como podemos ajudar sua empresa com {service.title.toLowerCase()}.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/contato">
                <Button size="lg" className="gap-2">
                  Solicitar Orçamento
                  <ArrowRight className="h-5 w-5" />
                </Button>
              </Link>
              <Link href="/servicos">
                <Button variant="outline" size="lg">
                  Ver Outros Serviços
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
import { Code, Shield, Cloud, Monitor, Wrench, HeadphonesIcon, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/Button";
import Link from "next/link";
import { cn } from "@/lib/utils";

const services = [
  {
    icon: Code,
    title: "Desenvolvimento Web & APIs",
    description: "Criamos sistemas web robustos, APIs RESTful/GraphQL e aplicações modernas com React, Next.js, Node.js e TypeScript. Do MVP ao enterprise.",
    features: ["Sistemas web personalizados", "APIs RESTful & GraphQL", "Integrações complexas", "Modernização de legados"],
    href: "/servicos/desenvolvimento-web",
    color: "from-blue-500 to-blue-600",
    bgColor: "bg-blue-50 dark:bg-blue-900/20",
  },
  {
    icon: Shield,
    title: "Segurança da Informação & LGPD",
    description: "Proteja seus dados e atenda à legislação. Auditoria de segurança, pentest, implementação de controles LGPD e gestão de vulnerabilidades.",
    features: ["Auditoria de segurança", "Teste de invasão (Pentest)", "Adequação LGPD completa", "Gestão de vulnerabilidades"],
    href: "/servicos/seguranca-lgpd",
    color: "from-green-500 to-green-600",
    bgColor: "bg-green-50 dark:bg-green-900/20",
  },
  {
    icon: Cloud,
    title: "Cloud Computing & Infraestrutura",
    description: "Migração, gestão e otimização de infraestrutura na nuvem. AWS, Azure, Google Cloud, Kubernetes, Docker e práticas DevOps.",
    features: ["Migração para nuvem", "Arquitetura serverless", "Kubernetes & Docker", "CI/CD e automação"],
    href: "/servicos/cloud-infraestrutura",
    color: "from-purple-500 to-purple-600",
    bgColor: "bg-purple-50 dark:bg-purple-900/20",
  },
  {
    icon: Monitor,
    title: "Arquitetura & Consultoria Técnica",
    description: "Tomadas de decisão técnicas estratégicas. Code review, definição de stack, arquitetura de microsserviços, escalabilidade e performance.",
    features: ["Code review especializado", "Arquitetura de microsserviços", "Otimização de performance", "Due diligence técnica"],
    href: "/servicos/arquitetura-software",
    color: "from-orange-500 to-orange-600",
    bgColor: "bg-orange-50 dark:bg-orange-900/20",
  },
  {
    icon: Wrench,
    title: "Suporte & Manutenção Contínua",
    description: "SLA garantido, monitoramento 24/7, atualizações de segurança, backup gerenciado e suporte especializado para sua tranquilidade.",
    features: ["Monitoramento 24/7", "SLA personalizado", "Backup & disaster recovery", "Atualizações contínuas"],
    href: "/servicos/suporte-manutencao",
    color: "from-cyan-500 to-cyan-600",
    bgColor: "bg-cyan-50 dark:bg-cyan-900/20",
  },
  {
    icon: HeadphonesIcon,
    title: "Outsourcing & Alocação de Profissionais",
    description: "Equipes técnicas dedicadas ou profissionais alocados para complementar seu time. Desenvolvedores, DevOps, QA e arquitetos.",
    features: ["Squads dedicadas", "Alocação individual", "Gestão de performance", "Troca sem burocracia"],
    href: "/servicos/outsourcing",
    color: "from-indigo-500 to-indigo-600",
    bgColor: "bg-indigo-50 dark:bg-indigo-900/20",
  },
];

export function Services() {
  return (
    <section id="servicos" className="section-padding bg-gray-50 dark:bg-slate-900/50" aria-labelledby="services-title">
      <div className="container-custom">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 id="services-title" className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
            Nossos <span className="text-primary">Serviços</span>
          </h2>
          <p className="text-lg text-muted-foreground">
            Soluções completas em tecnologia para impulsionar seu negócio. Da estratégia à execução, somos seu parceiro de confiança.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {services.map((service, index) => (
            <article
              key={service.title}
              className={cn(
                "group relative rounded-2xl p-6 lg:p-8 border border-gray-100 dark:border-slate-700 bg-white dark:bg-slate-800/50",
                "hover:shadow-xl hover:-translate-y-1 transition-all duration-300",
                "overflow-hidden"
              )}
            >
              <div className="absolute inset-0 bg-gradient-to-br opacity-0 group-hover:opacity-100 transition-opacity duration-300" style={{ background: service.color }} aria-hidden="true" />
              <div className="relative z-10 space-y-5">
                <div className={cn("p-3 rounded-xl w-fit", service.bgColor)}>
                  <service.icon className="h-7 w-7 text-primary" aria-hidden="true" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-foreground mb-2">{service.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">{service.description}</p>
                </div>
                <ul className="space-y-2" role="list">
                  {service.features.map((feature) => (
                    <li key={feature} className="flex items-center gap-2 text-sm text-muted-foreground group-hover:text-foreground transition-colors">
                      <span className="h-1.5 w-1.5 rounded-full bg-primary/50 group-hover:bg-primary transition-colors" aria-hidden="true" />
                      {feature}
                    </li>
                  ))}
                </ul>
                <Link
                  href={service.href}
                  className="inline-flex items-center gap-2 text-sm font-medium text-primary hover:text-primary/80 transition-colors mt-4 group"
                >
                  Saiba mais
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
                </Link>
              </div>
            </article>
          ))}
        </div>

        <div className="text-center mt-12">
          <Link href="/servicos">
            <Button variant="outline" size="lg" className="gap-2">
              Ver Todos os Serviços
              <ArrowRight className="h-5 w-5" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
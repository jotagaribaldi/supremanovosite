import { Target, Users, Lightbulb, Globe, Award, Heart } from "lucide-react";
import { Button } from "@/components/ui/Button";
import Link from "next/link";

const values = [
  { icon: Target, title: "Foco no Cliente", description: "Entendemos suas necessidades e entregamos soluções que geram valor real para seu negócio." },
  { icon: Lightbulb, title: "Inovação Contínua", description: "Estamos sempre atualizados com as melhores tecnologias e práticas do mercado." },
  { icon: Users, title: "Equipe Especializada", description: "Profissionais certificados e experientes em múltiplas tecnologias e domínios." },
  { icon: Globe, title: "Visão Global", description: "Pensamos além do código: arquitetura, escalabilidade, segurança e negócios." },
  { icon: Award, title: "Qualidade Garantida", description: "Processos rigorosos de QA, code review e testes automatizados em todos os projetos." },
  { icon: Heart, title: "Parceria de Longo Prazo", description: "Não somos apenas fornecedores. Somos seu parceiro tecnológico de confiança." },
];

const team = [
  { name: "Nome do CEO", role: "CEO & Fundador", bio: "Especialista em arquitetura de software e estratégia tecnológica com 15+ anos de experiência." },
  { name: "Nome do CTO", role: "CTO", bio: "Líder técnico com expertise em cloud, DevOps e sistemas distribuídos de alta escala." },
  { name: "Nome do Tech Lead", role: "Tech Lead", bio: "Desenvolvedor full-stack sênior focado em qualidade de código e experiência do desenvolvedor." },
  { name: "Nome do Sec Lead", role: "Security Lead", bio: "Especialista em segurança da informação, LGPD e compliance regulatório." },
];

export function About() {
  return (
    <section id="sobre" className="section-padding" aria-labelledby="about-title">
      <div className="container-custom">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <div>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6">
              <span>Sobre Nós</span>
            </div>
            <h2 id="about-title" className="text-3xl sm:text-4xl font-bold text-foreground mb-6">
              Tecnologia com <span className="text-primary">Propósito</span> e Expertise
            </h2>
            <div className="space-y-4 text-lg text-muted-foreground">
              <p>
                Somos a <strong>Suprema Consultoria em TI</strong>, uma empresa especializada em desenvolvimento de software,
                segurança da informação, cloud computing e infraestrutura de TI.
              </p>
              <p>
                Atendemos empresas de diversos portes e segmentos com soluções sob medida, seguras e modernas.
                Nosso compromisso é transformar desafios tecnológicos em vantagens competitivas para nossos clientes.
              </p>
            </div>
            <Link href="/sobre" className="mt-8 inline-flex">
              <Button variant="outline" size="lg">
                Conheça Nossa História
              </Button>
            </Link>
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            {values.map((value, index) => (
              <div
                key={value.title}
                className="p-5 rounded-xl bg-gray-50 dark:bg-slate-800/50 border border-gray-100 dark:border-slate-700 hover:border-primary/50 transition-colors"
              >
                <div className="p-3 rounded-lg bg-primary/10 text-primary mb-4 w-fit">
                  <value.icon className="h-6 w-6" aria-hidden="true" />
                </div>
                <h3 className="font-semibold text-foreground mb-2">{value.title}</h3>
                <p className="text-sm text-muted-foreground">{value.description}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-20 pt-16 border-t border-gray-100 dark:border-slate-700">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h3 className="text-2xl sm:text-3xl font-bold text-foreground mb-4">Nossa Equipe</h3>
            <p className="text-muted-foreground">Profissionais apaixonados por tecnologia e comprometidos com a excelência.</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {team.map((member) => (
              <div key={member.name} className="text-center">
                <div className="relative w-32 h-32 mx-auto mb-4 rounded-full bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center">
                  <span className="text-3xl font-bold text-primary">
                    {member.name.split(" ").map(n => n[0]).join("")}
                  </span>
                </div>
                <h4 className="font-semibold text-foreground">{member.name}</h4>
                <p className="text-sm text-primary font-medium">{member.role}</p>
                <p className="text-xs text-muted-foreground mt-2">{member.bio}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
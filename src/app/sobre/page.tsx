import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Target, Users, Lightbulb, Globe, Award, Heart, TrendingUp, CheckCircle } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/Button";

const values = [
  { icon: Target, title: "Foco no Cliente", description: "Entendemos suas necessidades e entregamos soluções que geram valor real para seu negócio." },
  { icon: Lightbulb, title: "Inovação Contínua", description: "Estamos sempre atualizados com as melhores tecnologias e práticas do mercado." },
  { icon: Users, title: "Equipe Especializada", description: "Profissionais certificados e experientes em múltiplas tecnologias e domínios." },
  { icon: Globe, title: "Visão Global", description: "Pensamos além do código: arquitetura, escalabilidade, segurança e negócios." },
  { icon: Award, title: "Qualidade Garantida", description: "Processos rigorosos de QA, code review e testes automatizados em todos os projetos." },
  { icon: Heart, title: "Parceria de Longo Prazo", description: "Não somos apenas fornecedores. Somos seu parceiro tecnológico de confiança." },
];

const history = [
  { year: "2024", title: "Expansão de Serviços", description: "Inclusão de segurança da informação, LGPD e cloud computing no portfólio." },
  { year: "2022", title: "Certificações AWS & Azure", description: "Equipe certificada nas principais plataformas de nuvem do mercado." },
  { year: "2020", title: "Metodologias Ágeis", description: "Adoção de Scrum, Kanban e práticas DevOps em todos os projetos." },
  { year: "2018", title: "Fundação da Empresa", description: "Início das atividades com foco em desenvolvimento web personalizado." },
];

const team = [
  { name: "Nome do CEO", role: "CEO & Fundador", bio: "Especialista em arquitetura de software e estratégia tecnológica com 15+ anos de experiência.", initials: "NC" },
  { name: "Nome do CTO", role: "CTO", bio: "Líder técnico com expertise em cloud, DevOps e sistemas distribuídos de alta escala.", initials: "NC" },
  { name: "Nome do Tech Lead", role: "Tech Lead", bio: "Desenvolvedor full-stack sênior focado em qualidade de código e experiência do desenvolvedor.", initials: "NT" },
  { name: "Nome do Sec Lead", role: "Security Lead", bio: "Especialista em segurança da informação, LGPD e compliance regulatório.", initials: "NS" },
];

const stats = [
  { icon: Users, value: "50+", label: "Clientes Atendidos" },
  { icon: TrendingUp, value: "120+", label: "Projetos Entregues" },
  { icon: Award, value: "15+", label: "Anos de Mercado" },
  { icon: CheckCircle, value: "98%", label: "Taxa de Satisfação" },
];

export default function AboutPage() {
  return (
    <>
      <Header />
      <main id="main-content" className="min-h-screen pt-16">
        <section className="section-padding bg-gradient-to-br from-primary/5 via-background to-accent/5" aria-labelledby="about-hero-title">
          <div className="container-custom">
            <div className="max-w-3xl mx-auto text-center">
              <h1 id="about-hero-title" className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-foreground mb-6">
                Sobre a <span className="text-primary">Suprema TI</span>
              </h1>
              <p className="text-lg sm:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
                Consultoria especializada em TI: desenvolvimento, segurança, cloud e infraestrutura.
                Transformamos tecnologia em resultados reais para o seu negócio.
              </p>
            </div>
          </div>
        </section>

        <section className="section-padding" aria-labelledby="history-title">
          <div className="container-custom">
            <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start">
              <div>
                <h2 id="history-title" className="text-3xl sm:text-4xl font-bold text-foreground mb-6">
                  Nossa <span className="text-primary">História</span>
                </h2>
                <p className="text-lg text-muted-foreground mb-8">
                  Fundada com o propósito de entregar excelência técnica e parceria genuína, a Suprema TI
                  nasceu da experiência de profissionais que viram a necessidade de uma consultoria que
                  une conhecimento profundo de tecnologia com visão de negócios.
                </p>
                <div className="space-y-6">
                  {history.map((item) => (
                    <div key={item.year} className="flex gap-4">
                      <div className="flex-shrink-0 w-16 text-right">
                        <span className="text-2xl font-bold text-primary">{item.year}</span>
                      </div>
                      <div className="flex-1 pt-1">
                        <h3 className="font-semibold text-foreground">{item.title}</h3>
                        <p className="text-sm text-muted-foreground">{item.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="grid sm:grid-cols-2 gap-4">
                {stats.map((stat) => (
                  <div key={stat.label} className="p-6 rounded-2xl bg-gray-50 dark:bg-slate-800/50 border border-gray-100 dark:border-slate-700 text-center">
                    <div className="p-3 rounded-xl bg-primary/10 text-primary w-fit mx-auto mb-3">
                      <stat.icon className="h-6 w-6" aria-hidden="true" />
                    </div>
                    <div className="text-3xl font-bold text-foreground">{stat.value}</div>
                    <div className="text-sm text-muted-foreground">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="section-padding bg-gray-50 dark:bg-slate-900/50" aria-labelledby="values-title">
          <div className="container-custom">
            <div className="text-center max-w-3xl mx-auto mb-12">
              <h2 id="values-title" className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
                Nossos <span className="text-primary">Valores</span>
              </h2>
              <p className="text-lg text-muted-foreground">
                Princípios que guiam cada decisão e projeto que entregamos.
              </p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {values.map((value) => (
                <div key={value.title} className="p-6 rounded-2xl bg-white dark:bg-slate-800 border border-gray-100 dark:border-slate-700 hover:border-primary/50 transition-colors">
                  <div className="p-3 rounded-xl bg-primary/10 text-primary mb-4 w-fit">
                    <value.icon className="h-6 w-6" aria-hidden="true" />
                  </div>
                  <h3 className="text-lg font-semibold text-foreground mb-2">{value.title}</h3>
                  <p className="text-muted-foreground">{value.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="section-padding" aria-labelledby="team-title">
          <div className="container-custom">
            <div className="text-center max-w-3xl mx-auto mb-12">
              <h2 id="team-title" className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
                Nossa <span className="text-primary">Equipe</span>
              </h2>
              <p className="text-lg text-muted-foreground">
                Profissionais apaixonados por tecnologia e comprometidos com a excelência.
              </p>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {team.map((member) => (
                <div key={member.name} className="text-center">
                  <div className="relative w-28 h-28 mx-auto mb-4 rounded-full bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center">
                    <span className="text-2xl font-bold text-primary">{member.initials}</span>
                  </div>
                  <h3 className="font-semibold text-foreground">{member.name}</h3>
                  <p className="text-sm text-primary font-medium">{member.role}</p>
                  <p className="text-xs text-muted-foreground mt-2">{member.bio}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="section-padding bg-primary text-primary-foreground" aria-labelledby="cta-title">
          <div className="container-custom text-center">
            <h2 id="cta-title" className="text-3xl sm:text-4xl font-bold mb-4">
              Quer fazer parte da nossa história?
            </h2>
            <p className="text-lg text-primary-foreground/90 mb-8 max-w-2xl mx-auto">
              Estamos sempre em busca de talentos que compartilhem nossa paixão por tecnologia e excelência.
            </p>
            <Link href="/contato">
              <Button size="lg" variant="secondary" className="gap-2">
                Ver Oportunidades
                <TrendingUp className="h-5 w-5" />
              </Button>
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
import { Users, Code, Shield, Award, Clock, TrendingUp } from "lucide-react";
import { cn } from "@/lib/utils";

const stats = [
  { icon: Users, value: "50+", label: "Clientes Ativos", description: "Empresas que confiam em nossa expertise" },
  { icon: Code, value: "120+", label: "Projetos Entregues", description: "Sistemas, APIs e aplicações em produção" },
  { icon: Shield, value: "100%", label: "Conformidade LGPD", description: "Projetos adequados à legislação" },
  { icon: Award, value: "15+", label: "Anos de Experiência", description: "Mercado de tecnologia e inovação" },
  { icon: Clock, value: "24/7", label: "Monitoramento", description: "Infraestrutura sempre observada" },
  { icon: TrendingUp, value: "98%", label: "Satisfação", description: "Clientes que recomendam nossos serviços" },
];

export function Stats() {
  return (
    <section className="section-padding bg-primary text-primary-foreground" aria-labelledby="stats-title">
      <div className="container-custom">
        <h2 id="stats-title" className="sr-only">Nossos Números</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6 lg:gap-8">
          {stats.map((stat, index) => (
            <div
              key={stat.label}
              className={cn(
                "text-center p-6 rounded-xl",
                "hover:bg-primary/90 transition-colors",
                index % 2 === 0 && "bg-primary/95"
              )}
            >
              <div className="p-3 rounded-xl bg-primary-foreground/10 w-fit mx-auto mb-4">
                <stat.icon className="h-8 w-8" aria-hidden="true" />
              </div>
              <div className="text-4xl sm:text-5xl font-bold tracking-tight mb-1">{stat.value}</div>
              <div className="text-lg font-medium mb-1">{stat.label}</div>
              <div className="text-sm opacity-80">{stat.description}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
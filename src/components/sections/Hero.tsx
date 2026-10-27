"use client";

import { ArrowRight, CheckCircle, TrendingUp, Users, Code, Shield, Clock } from "lucide-react";
import { Button } from "@/components/ui/Button";
import Link from "next/link";

export function Hero() {
  const stats = [
    { icon: Users, value: "50+", label: "Clientes Atendidos" },
    { icon: Code, value: "100+", label: "Projetos Entregues" },
    { icon: Shield, value: "99.9%", label: "Uptime Garantido" },
    { icon: Clock, value: "24/7", label: "Suporte Disponível" },
  ];

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16" aria-labelledby="hero-title">
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-accent/5" aria-hidden="true" />
      <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-5" aria-hidden="true" />
      
      <div className="container-custom relative py-20 lg:py-32">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6 animate-in">
              <TrendingUp className="h-4 w-4" aria-hidden="true" />
              <span>Consultoria Especializada em TI</span>
            </div>
            
            <h1 id="hero-title" className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-foreground leading-[1.1] mb-6 animate-in">
              Transformamos tecnologia em{" "}
              <span className="text-primary">resultados reais</span>
              <br />
              para o seu negócio
            </h1>
            
            <p className="text-lg sm:text-xl text-muted-foreground mb-8 max-w-xl animate-in">
              Desenvolvimento de sistemas, segurança da informação, cloud computing e infraestrutura.
              Parceiro tecnológico para empresas que buscam excelência e inovação.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 mb-12 animate-in">
              <Link href="/contato">
                <Button size="lg" className="gap-2">
                  Solicitar Orçamento
                  <ArrowRight className="h-5 w-5" />
                </Button>
              </Link>
              <Link href="/servicos">
                <Button variant="outline" size="lg">
                  Conhecer Serviços
                </Button>
              </Link>
            </div>

            <div className="flex flex-wrap items-center gap-6 text-sm text-muted-foreground animate-in">
              <div className="flex items-center gap-2">
                <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0" aria-hidden="true" />
                <span>Metodologias ágeis</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0" aria-hidden="true" />
                <span>Equipe certificada</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0" aria-hidden="true" />
                <span>SLA garantido</span>
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="relative rounded-2xl bg-gradient-to-br from-primary/10 to-accent/10 p-1">
              <div className="rounded-xl bg-background p-8 border border-gray-100 shadow-2xl">
                <div className="space-y-6">
                  {stats.map((stat, index) => (
                    <div key={stat.label} className="flex items-center gap-4 p-4 rounded-xl bg-white border border-gray-100 hover:shadow-lg transition-shadow">
                      <div className="p-3 rounded-lg bg-primary/10 text-primary">
                        <stat.icon className="h-6 w-6" aria-hidden="true" />
                      </div>
                      <div>
                        <p className="text-2xl font-bold text-foreground">{stat.value}</p>
                        <p className="text-sm text-muted-foreground">{stat.label}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            
            <div className="absolute -bottom-6 -right-6 w-72 h-72 bg-primary/20 rounded-full blur-3xl" aria-hidden="true" />
            <div className="absolute -top-6 -left-6 w-72 h-72 bg-accent/20 rounded-full blur-3xl" aria-hidden="true" />
          </div>
        </div>
      </div>
    </section>
  );
}
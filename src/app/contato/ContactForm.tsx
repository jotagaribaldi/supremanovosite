"use client";

import { useState } from "react";
import { Mail, Phone, MapPin, MessageSquare, Send, Loader2, CheckCircle, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Textarea } from "@/components/ui/Textarea";
import { Label } from "@/components/ui/Label";
import { cn } from "@/lib/utils";

interface ContactFormProps {
  settings: {
    contactEmail: string;
    contactPhone: string;
    contactAddress: string;
    whatsappNumber: string;
  };
}

export function ContactForm({ settings }: ContactFormProps) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    subject: "",
    message: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.name.trim()) newErrors.name = "Nome é obrigatório";
    if (!formData.email.trim()) newErrors.email = "E-mail é obrigatório";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) newErrors.email = "E-mail inválido";
    if (!formData.subject.trim()) newErrors.subject = "Assunto é obrigatório";
    if (!formData.message.trim()) newErrors.message = "Mensagem é obrigatória";
    else if (formData.message.trim().length < 20) newErrors.message = "Mensagem deve ter pelo menos 20 caracteres";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setStatus("submitting");
    setErrorMessage("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.message || "Erro ao enviar mensagem");

      setStatus("success");
      setFormData({ name: "", email: "", phone: "", company: "", subject: "", message: "" });
    } catch (err) {
      setStatus("error");
      setErrorMessage(err instanceof Error ? err.message : "Erro ao enviar. Tente novamente.");
    }
  };

  const contactMethods = [
    { icon: Mail, title: "E-mail", value: settings.contactEmail, href: `mailto:${settings.contactEmail}`, description: "Respondemos em até 2h úteis" },
    { icon: Phone, title: "Telefone", value: settings.contactPhone, href: `tel:${settings.contactPhone}`, description: "Seg a Sex, 9h às 18h" },
    { icon: MapPin, title: "Endereço", value: settings.contactAddress, href: "#", description: "Visite nosso escritório" },
    { icon: MessageSquare, title: "WhatsApp", value: "Conversar agora", href: `https://wa.me/${settings.whatsappNumber}`, description: "Atendimento rápido pelo WhatsApp" },
  ];

  return (
    <>
      <section className="section-padding bg-gradient-to-br from-primary/5 via-background to-accent/5" aria-labelledby="contact-hero-title">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto text-center">
            <h1 id="contact-hero-title" className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-foreground mb-6">
              Entre em <span className="text-primary">Contato</span>
            </h1>
            <p className="text-lg sm:text-xl text-muted-foreground mb-8">
              Tem um projeto em mente? Dúvidas sobre nossos serviços?
              Preencha o formulário ou use um dos canais abaixo. Retornamos em até 2h úteis.
            </p>
          </div>
        </div>
      </section>

      <section className="section-padding" aria-labelledby="contact-form-title">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
            <div>
              <h2 id="contact-form-title" className="text-2xl sm:text-3xl font-bold text-foreground mb-6">
                Envie uma mensagem
              </h2>
              
              {status === "success" && (
                <div className="mb-6 p-4 rounded-lg bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 flex items-center gap-3" role="alert">
                  <CheckCircle className="h-6 w-6 text-green-600 dark:text-green-400 flex-shrink-0" aria-hidden="true" />
                  <div>
                    <p className="font-medium text-green-800 dark:text-green-200">Mensagem enviada com sucesso!</p>
                    <p className="text-sm text-green-700 dark:text-green-300">Entraremos em contato em breve.</p>
                  </div>
                </div>
              )}

              {status === "error" && (
                <div className="mb-6 p-4 rounded-lg bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 flex items-center gap-3" role="alert">
                  <AlertCircle className="h-6 w-6 text-red-600 dark:text-red-400 flex-shrink-0" aria-hidden="true" />
                  <p className="text-red-800 dark:text-red-200">{errorMessage}</p>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-5" noValidate>
                <div className="grid sm:grid-cols-2 gap-5">
                  <div>
                    <Label htmlFor="name">Nome completo *</Label>
                    <Input
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="Seu nome"
                      error={errors.name}
                      disabled={status === "submitting"}
                    />
                  </div>
                  <div>
                    <Label htmlFor="email">E-mail corporativo *</Label>
                    <Input
                      id="email"
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="seu@email.com"
                      error={errors.email}
                      disabled={status === "submitting"}
                    />
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-5">
                  <div>
                    <Label htmlFor="phone">Telefone/WhatsApp</Label>
                    <Input
                      id="phone"
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="(XX) XXXXX-XXXX"
                      disabled={status === "submitting"}
                    />
                  </div>
                  <div>
                    <Label htmlFor="company">Empresa</Label>
                    <Input
                      id="company"
                      name="company"
                      value={formData.company}
                      onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                      placeholder="Nome da empresa"
                      disabled={status === "submitting"}
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="subject">Assunto *</Label>
                  <select
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    className={cn(
                      "input-field",
                      errors.subject && "border-destructive focus-visible:ring-destructive"
                    )}
                    disabled={status === "submitting"}
                    required
                  >
                    <option value="">Selecione um assunto</option>
                    <option value="orcamento">Solicitar Orçamento</option>
                    <option value="desenvolvimento">Desenvolvimento Web/APIs</option>
                    <option value="seguranca">Segurança & LGPD</option>
                    <option value="cloud">Cloud & Infraestrutura</option>
                    <option value="arquitetura">Arquitetura & Consultoria</option>
                    <option value="suporte">Suporte & Manutenção</option>
                    <option value="outsourcing">Outsourcing & Alocação</option>
                    <option value="parceria">Parceria Comercial</option>
                    <option value="outros">Outros</option>
                  </select>
                  {errors.subject && <p className="mt-1.5 text-sm text-destructive" role="alert">{errors.subject}</p>}
                </div>

                <div>
                  <Label htmlFor="message">Mensagem *</Label>
                  <Textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Descreva seu projeto, necessidades ou dúvidas..."
                    rows={5}
                    error={errors.message}
                    disabled={status === "submitting"}
                  />
                </div>

                <Button type="submit" size="lg" className="w-full sm:w-auto gap-2" loading={status === "submitting"}>
                  {status === "submitting" ? (
                    <>
                      <Loader2 className="h-5 w-5 animate-spin" />
                      Enviando...
                    </>
                  ) : (
                    <>
                      <Send className="h-5 w-5" />
                      Enviar Mensagem
                    </>
                  )}
                </Button>

                <p className="text-xs text-muted-foreground text-center sm:text-left">
                  Ao enviar, você concorda com nossa <a href="/politica-privacidade" className="text-primary hover:underline">Política de Privacidade</a> e com o armazenamento dos seus dados para fins de contato.
                </p>
              </form>
            </div>

            <div className="space-y-6">
              <h3 className="text-xl font-semibold text-foreground">Outras formas de contato</h3>
              <div className="space-y-4">
                {contactMethods.map((method) => (
                  <a
                    key={method.title}
                    href={method.href}
                    target={method.href.startsWith("http") ? "_blank" : undefined}
                    rel={method.href.startsWith("http") ? "noopener noreferrer" : undefined}
                    className="flex items-center gap-4 p-5 rounded-xl bg-gray-50 dark:bg-slate-800/50 border border-gray-100 dark:border-slate-700 hover:border-primary/50 hover:bg-primary/5 transition-all"
                  >
                    <div className="p-3 rounded-xl bg-primary/10 text-primary flex-shrink-0">
                      <method.icon className="h-6 w-6" aria-hidden="true" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-foreground">{method.title}</p>
                      <p className="text-sm text-muted-foreground truncate">{method.value}</p>
                      <p className="text-xs text-muted-foreground">{method.description}</p>
                    </div>
                  </a>
                ))}
              </div>

              <div className="pt-6 border-t border-gray-100 dark:border-slate-700">
                <h4 className="font-medium text-foreground mb-4">Horário de Atendimento</h4>
                <div className="space-y-2 text-sm text-muted-foreground">
                  <div className="flex justify-between">
                    <span>Segunda a Sexta</span>
                    <span className="text-foreground font-medium">9h às 18h</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Sábado</span>
                    <span className="text-foreground font-medium">Fechado</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Domingo</span>
                    <span className="text-foreground font-medium">Fechado</span>
                  </div>
                  <p className="text-xs pt-2">Plantão 24/7 para clientes com SLA ativo</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section-padding bg-primary text-primary-foreground" aria-labelledby="faq-title">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto text-center">
            <h2 id="faq-title" className="text-3xl sm:text-4xl font-bold mb-6">Dúvidas Frequentes</h2>
            <div className="space-y-4 text-left">
              {[
                { q: "Qual o tempo de resposta para orçamentos?", a: "Enviamos orçamentos preliminares em até 2 horas úteis. Para projetos complexos, agendamos uma call de descoberta em até 24h." },
                { q: "Vocês assinam NDA?", a: "Sim, assinamos NDA (Acordo de Confidencialidade) antes de qualquer discussão técnica detalhada. Enviamos nosso modelo ou aceitamos o do cliente." },
                { q: "Como funciona o suporte 24/7?", a: "Disponível para clientes com contrato de SLA ativo. Inclui monitoramento proativo, resposta a incidentes críticos em 15min e resolução em 4h." },
                { q: "Atendem empresas de fora da cidade/estado?", a: "Sim, atendemos remotamente todo o Brasil e também presencialmente conforme necessidade. A maioria dos projetos é 100% remota." },
              ].map((faq, i) => (
                <details key={i} className="group bg-primary-foreground/5 rounded-xl p-5 border border-primary-foreground/10">
                  <summary className="flex items-center justify-between cursor-pointer font-medium list-none">
                    {faq.q}
                    <span className="transition-transform group-open:rotate-180">▼</span>
                  </summary>
                  <p className="mt-3 text-primary-foreground/80">{faq.a}</p>
                </details>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
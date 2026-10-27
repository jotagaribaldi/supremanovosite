const technologies = [
  { category: "Backend & Linguagens", items: ["Node.js", "TypeScript", "Python", "Go", "PHP 8/Laravel", "Java/Spring", ".NET/C#"] },
  { category: "Frontend & Mobile", items: ["React/Next.js", "Vue/Nuxt", "TypeScript", "Tailwind CSS", "React Native", "Flutter"] },
  { category: "Banco de Dados", items: ["PostgreSQL", "MySQL", "MongoDB", "Redis", "Prisma ORM", "Drizzle ORM"] },
  { category: "Cloud & DevOps", items: ["AWS", "Azure", "Google Cloud", "Docker", "Kubernetes", "Terraform", "GitHub Actions", "GitLab CI"] },
  { category: "Ferramentas & Qualidade", items: ["Git", "ESLint/Prettier", "Jest/Vitest", "Playwright", "SonarQube", "Sentry"] },
  { category: "Segurança & Monitoramento", items: ["OWASP", "Burp Suite", "Vault", "Prometheus", "Grafana", "Datadog", "ELK Stack"] },
];

const certifications = [
  { name: "AWS Solutions Architect", issuer: "Amazon Web Services" },
  { name: "Azure Administrator", issuer: "Microsoft" },
  { name: "CKA - Kubernetes Admin", issuer: "CNCF" },
  { name: "ISO 27001 Lead Implementer", issuer: "PECB" },
  { name: "LGPD Practitioner", issuer: "EXIN" },
  { name: "Scrum Master (PSM I)", issuer: "Scrum.org" },
];

export function TechStack() {
  return (
    <section id="tecnologias" className="section-padding" aria-labelledby="tech-title">
      <div className="container-custom">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 id="tech-title" className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
            Tecnologias que <span className="text-primary">Dominamos</span>
          </h2>
          <p className="text-lg text-muted-foreground">
            Trabalhamos com as melhores ferramentas do mercado para entregar soluções robustas, escaláveis e seguras.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {technologies.map((tech) => (
            <div key={tech.category} className="p-6 rounded-2xl bg-gray-50 dark:bg-slate-800/50 border border-gray-100 dark:border-slate-700">
              <h3 className="font-semibold text-foreground mb-4 flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-primary" aria-hidden="true" />
                {tech.category}
              </h3>
              <div className="flex flex-wrap gap-2">
                {tech.items.map((item) => (
                  <span
                    key={item}
                    className="px-3 py-1 text-sm rounded-lg bg-white dark:bg-slate-700 border border-gray-100 dark:border-slate-600 text-muted-foreground"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="rounded-2xl bg-gradient-to-r from-primary to-secondary p-8 md:p-12 text-center">
          <h3 className="text-2xl sm:text-3xl font-bold text-primary-foreground mb-4">
            Certificações & Competências
          </h3>
          <p className="text-primary-foreground/80 mb-8 max-w-2xl mx-auto">
            Nossa equipe mantém certificações atualizadas nas principais plataformas e metodologias do mercado.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            {certifications.map((cert) => (
              <span
                key={cert.name}
                className="px-4 py-2 text-sm font-medium rounded-full bg-primary-foreground/10 text-primary-foreground border border-primary-foreground/20"
              >
                {cert.name}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
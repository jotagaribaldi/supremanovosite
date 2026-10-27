import { PrismaClient, PostStatus } from "@prisma/client";
import { PrismaPg } from '@prisma/adapter-pg'
import { Pool } from 'pg'
import * as dotenv from 'dotenv'
import bcrypt from "bcryptjs";

// Força o carregamento das variáveis de ambiente no script de seed
dotenv.config()

const pool = new Pool({ connectionString: process.env.DATABASE_URL })
const adapter = new PrismaPg(pool)

const prisma = new PrismaClient({ adapter })


async function main() {

  // Create admin user
  const hashedPassword = await bcrypt.hash("admin123", 12);
  
  const admin = await prisma.user.upsert({
    where: { email: "admin@suprema-ti.com.br" },
    update: {},
    create: {
      email: "admin@suprema-ti.com.br",
      name: "Administrador",
      password: hashedPassword,
      role: "ADMIN",
    },
  });
  console.log("✅ Usuário admin criado:", admin.email);

  // Create editor user
  const editorPassword = await bcrypt.hash("editor123", 12);
  
  const editor = await prisma.user.upsert({
    where: { email: "editor@suprema-ti.com.br" },
    update: {},
    create: {
      email: "editor@suprema-ti.com.br",
      name: "Editor",
      password: editorPassword,
      role: "EDITOR",
    },
  });
  console.log("✅ Usuário editor criado:", editor.email);

  // Create categories
  const categories = await Promise.all([
    prisma.category.upsert({
      where: { slug: "desenvolvimento" },
      update: {},
      create: { name: "Desenvolvimento", slug: "desenvolvimento", description: "Artigos sobre desenvolvimento de software", color: "#3B82F6" },
    }),
    prisma.category.upsert({
      where: { slug: "seguranca" },
      update: {},
      create: { name: "Segurança", slug: "seguranca", description: "Segurança da informação e LGPD", color: "#10B981" },
    }),
    prisma.category.upsert({
      where: { slug: "cloud" },
      update: {},
      create: { name: "Cloud & DevOps", slug: "cloud", description: "Cloud computing, Kubernetes, DevOps", color: "#8B5CF6" },
    }),
    prisma.category.upsert({
      where: { slug: "arquitetura" },
      update: {},
      create: { name: "Arquitetura", slug: "arquitetura", description: "Arquitetura de software e sistemas", color: "#F59E0B" },
    }),
    prisma.category.upsert({
      where: { slug: "carreira" },
      update: {},
      create: { name: "Carreira & Dicas", slug: "carreira", description: "Dicas de carreira e mercado de TI", color: "#EC4899" },
    }),
    prisma.category.upsert({
      where: { slug: "novidades" },
      update: {},
      create: { name: "Novidades", slug: "novidades", description: "Novidades da empresa e do mercado", color: "#06B6D4" },
    }),
  ]);
  console.log("✅ Categorias criadas:", categories.length);

  // Create tags
  const tags = await Promise.all([
    "React", "Next.js", "Node.js", "TypeScript", "Python", "Go", "PostgreSQL", "MongoDB", "Redis",
    "AWS", "Azure", "Docker", "Kubernetes", "Terraform", "CI/CD", "LGPD", "ISO 27001",
    "Pentest", "Microsserviços", "Serverless", "GraphQL", "REST API", "Clean Code", "TDD"
  ].map((name) => 
    prisma.tag.upsert({
      where: { slug: name.toLowerCase().replace(/[^a-z0-9]+/g, "-") },
      update: {},
      create: { name, slug: name.toLowerCase().replace(/[^a-z0-9]+/g, "-") },
    })
  ));
  console.log("✅ Tags criadas:", tags.length);

  // Create services
  const servicesData = [
    {
      title: "Desenvolvimento Web & APIs",
      slug: "desenvolvimento-web",
      shortDesc: "Sistemas web robustos, APIs RESTful/GraphQL e aplicações modernas com as melhores tecnologias.",
      fullDesc: "Criamos soluções web personalizadas do zero ou modernizamos sistemas legados. Utilizamos React, Next.js, Node.js, TypeScript, Python, Go e outras tecnologias modernas para entregar aplicações escaláveis, performáticas e fáceis de manter.",
      icon: "Code",
      features: ["Desenvolvimento full-stack", "APIs RESTful e GraphQL", "Arquitetura de microsserviços", "Modernização de legados", "Testes automatizados", "CI/CD e deploy automatizado"],
      order: 1,
    },
    {
      title: "Segurança da Informação & LGPD",
      slug: "seguranca-lgpd",
      shortDesc: "Proteja seus dados e atenda à legislação. Auditoria, pentest, implementação de controles LGPD.",
      fullDesc: "Oferecemos serviços completos de segurança da informação para proteger seus ativos de informação e garantir conformidade regulatória.",
      icon: "Shield",
      features: ["Auditoria de segurança", "Teste de invasão (Pentest)", "Adequação completa à LGPD", "Gestão de vulnerabilidades", "Implementação ISO 27001", "Treinamento de conscientização"],
      order: 2,
    },
    {
      title: "Cloud Computing & Infraestrutura",
      slug: "cloud-infraestrutura",
      shortDesc: "Migração, gestão e otimização de infraestrutura na nuvem. AWS, Azure, Google Cloud, Kubernetes, Docker e DevOps.",
      fullDesc: "Ajudamos sua empresa a tirar o máximo proveito da nuvem. Desde migração lift-and-shift até arquiteturas cloud-native.",
      icon: "Cloud",
      features: ["Migração para nuvem", "Arquitetura serverless e containers", "Infraestrutura como Código", "CI/CD pipelines", "FinOps e otimização de custos", "Disaster Recovery"],
      order: 3,
    },
    {
      title: "Arquitetura & Consultoria Técnica",
      slug: "arquitetura-software",
      shortDesc: "Tomadas de decisão técnicas estratégicas. Code review, definição de stack, arquitetura de microsserviços.",
      fullDesc: "Oferecemos consultoria técnica de alto nível para ajudar sua equipe a tomar as melhores decisões arquiteturais.",
      icon: "Monitor",
      features: ["Code review especializado", "Arquitetura de microsserviços", "Avaliação de stack tecnológica", "Otimização de performance", "Due diligence técnica", "Definição de padrões"],
      order: 4,
    },
    {
      title: "Suporte & Manutenção Contínua",
      slug: "suporte-manutencao",
      shortDesc: "SLA garantido, monitoramento 24/7, atualizações de segurança, backup gerenciado.",
      fullDesc: "Mantenha seus sistemas sempre disponíveis, seguros e performáticos com nosso serviço de suporte gerenciado.",
      icon: "Wrench",
      features: ["Monitoramento 24/7", "SLA personalizado", "Gestão de patches", "Backup automatizado", "Gestão de incidentes", "Relatórios mensais"],
      order: 5,
    },
    {
      title: "Outsourcing & Alocação de Profissionais",
      slug: "outsourcing",
      shortDesc: "Equipes técnicas dedicadas ou profissionais alocados para complementar seu time.",
      fullDesc: "Complementamos sua equipe com profissionais qualificados sob demanda.",
      icon: "HeadphonesIcon",
      features: ["Squads ágeis dedicadas", "Alocação individual", "Gestão de performance", "Troca sem burocracia", "Onboarding acelerado", "Knowledge sharing"],
      order: 6,
    },
  ];

  for (const svc of servicesData) {
    await prisma.service.upsert({
      where: { slug: svc.slug },
      update: {},
      create: svc,
    });
  }
  console.log("✅ Serviços criados:", servicesData.length);

  // Create sample portfolio items
  const portfolioData = [
    {
      title: "Portal do Cliente - Fintech",
      slug: "portal-cliente-fintech",
      client: "Financeira XYZ",
      description: "Portal completo para gestão de empréstimos, investimentos e conta digital com 50k+ usuários ativos.",
      shortDesc: "Portal web full-stack para fintech de crédito pessoal.",
      image: "/placeholder-portfolio-1.jpg",
      gallery: ["/placeholder-portfolio-1.jpg"],
      technologies: ["React", "Next.js", "Node.js", "TypeScript", "PostgreSQL", "Redis", "Kubernetes", "AWS"],
      category: "Sistema Web",
      projectUrl: "https://exemplo.com",
      isFeatured: true,
      order: 1,
    },
    {
      title: "Plataforma E-commerce B2B",
      slug: "ecommerce-b2b-distribuidora",
      client: "Distribuidora ABC",
      description: "E-commerce B2B com gestão de pedidos, cotações, tabelas de preço por cliente e integração ERP.",
      shortDesc: "Plataforma de comércio eletrônico B2B com integração ERP.",
      image: "/placeholder-portfolio-2.jpg",
      gallery: ["/placeholder-portfolio-2.jpg"],
      technologies: ["Next.js", "NestJS", "PostgreSQL", "Docker", "RabbitMQ", "AWS"],
      category: "E-commerce",
      projectUrl: "https://exemplo.com",
      isFeatured: true,
      order: 2,
    },
    {
      title: "Adequação LGPD - Rede Hospitalar",
      slug: "adequacao-lgpd-hospitalar",
      client: "Rede Hospitalar",
      description: "Projeto completo de adequação à LGPD para rede hospitalar com 10 unidades e 2M+ pacientes.",
      shortDesc: "Mapeamento de dados sensíveis, DPIA, implementação de controles, nomeação de DPO.",
      image: "/placeholder-portfolio-3.jpg",
      gallery: ["/placeholder-portfolio-3.jpg"],
      technologies: ["LGPD", "ISO 27001", "DPIA", "OneTrust", "Varonis", "SIEM", "DLP"],
      category: "Segurança & LGPD",
      projectUrl: "https://exemplo.com",
      isFeatured: false,
      order: 3,
    },
  ];

  for (const proj of portfolioData) {
    await prisma.portfolio.upsert({
      where: { slug: proj.slug },
      update: {},
      create: proj,
    });
  }
  console.log("✅ Portfólio criado:", portfolioData.length);

  // Create sample blog posts
  const devCategory = categories.find((c) => c.slug === "desenvolvimento");
  const secCategory = categories.find((c) => c.slug === "seguranca");
  const cloudCategory = categories.find((c) => c.slug === "cloud");

  const postsData = [
    {
      title: "Como migrar sistemas legados para arquitetura moderna sem parar o negócio",
      slug: "migrar-sistemas-legados-arquitetura-moderna",
      excerpt: "Estratégias comprovadas de Strangler Fig Pattern, Domain-Driven Design e migração incremental para modernizar seu legado com risco zero.",
      content: `# Como migrar sistemas legados para arquitetura moderna sem parar o negócio

A migração de sistemas legados é um dos maiores desafios técnicos que empresas enfrentam. Neste artigo, compartilhamos nossa experiência e metodologia comprovada.

## O problema dos legados

Sistemas legados acumulam dívida técnica, tornam-se difíceis de manter e impedem a inovação. Porém, reescrever do zero (Big Bang) é extremamente arriscado.

## Estrangulador Fig Pattern

O padrão **Strangler Fig** permite migração incremental:

1. **Identifique** funcionalidades críticas
2. **Crie** novos serviços ao lado do legado
3. **Redirecione** tráfego gradualmente
4. **Desative** o código antigo

## Domain-Driven Design

DDD ajuda a modelar o domínio corretamente:
- **Bounded Contexts** bem definidos
- **Ubiquitous Language** compartilhada
- **Aggregates** consistentes

## Resultados reais

Em um projeto recente, migramos um sistema de 15 anos em 6 meses com **zero downtime**.`,
      coverImage: "/placeholder-blog-1.jpg",
      status: PostStatus.PUBLISHED,
      publishedAt: new Date("2024-01-15"),
      authorId: admin.id,
      categoryId: devCategory?.id,
    },
    {
      title: "LGPD na prática: guia completo para adequação da sua empresa",
      slug: "lgpd-pratica-guia-completo-adequacao",
      excerpt: "Passo a passo para implementar LGPD: mapeamento de dados, DPIA, políticas de privacidade, direitos do titular e nomeação de DPO.",
      content: `# LGPD na prática: guia completo para adequação da sua empresa

A Lei Geral de Proteção de Dados (LGPD) entrou em vigor em 2020 e multas já estão sendo aplicadas. Veja como se adequar.

## 1. Mapeamento de Dados (ROPA)

Crie o Registro de Operações de Tratamento de Dados Pessoais identificando:
- Quais dados coleta
- Finalidade do tratamento
- Base legal
- Compartilhamentos
- Retenção

## 2. Análise de Impacto (DPIA)

Obrigatória para tratamentos de alto risco. Avalie:
- Necessidade e proporcionalidade
- Riscos aos titulares
- Medidas mitigadoras

## 3. Políticas e Documentos

- Política de Privacidade clara e acessível
- Termos de Consentimento específicos
- Procedimento de direitos do titular
- Plano de resposta a incidentes

## 4. Nomeação de DPO

O Encarregado de Dados deve:
- Ser independente
- Ter conhecimento jurídico/técnico
- Ser ponto de contato com ANPD e titulares

## Conclusão

A adequação não é um projeto, é um processo contínuo de governança de dados.`,
      coverImage: "/placeholder-blog-2.jpg",
      status: PostStatus.PUBLISHED,
      publishedAt: new Date("2024-02-20"),
      authorId: admin.id,
      categoryId: secCategory?.id,
    },
    {
      title: "Kubernetes na prática: do zero à produção em 30 dias",
      slug: "kubernetes-pratica-zero-producao-30-dias",
      excerpt: "Roteiro prático para implementar Kubernetes em produção: cluster setup, Helm, ArgoCD, observabilidade, security e FinOps.",
      content: `# Kubernetes na prática: do zero à produção em 30 dias

Kubernetes é o padrão da indústria para orquestração de containers. Aqui está nosso playbook de 30 dias.

## Semana 1: Fundamentos e Cluster

- **Dia 1-2**: Conceitos core (Pods, Services, Deployments, ConfigMaps, Secrets)
- **Dia 3-4**: Provisionamento de cluster (EKS, GKE, AKS ou kubeadm)
- **Dia 5**: Networking (CNI, Ingress, Service Mesh)
- **Dia 6-7**: Storage (CSI, PersistentVolumes, Backup)

## Semana 2: GitOps e Deploy

- ArgoCD / Flux para GitOps
- Helm charts para aplicações
- Kustomize para overlays de ambiente
- Progressive delivery (Canary, Blue/Green)

## Semana 3: Observabilidade

- **Logs**: Loki + Promtail
- **Métricas**: Prometheus + Grafana
- **Traces**: Tempo / Jaeger
- **Alertas**: Alertmanager + PagerDuty

## Semana 4: Segurança e FinOps

- RBAC, Network Policies, Pod Security Standards
- Kyverno / OPA para policy enforcement
- Kubecost para otimização de custos
- Rightsizing e Cluster Autoscaler

## Checklist de Go-Live

- [ ] Runbooks documentados
- [ ] Disaster Recovery testado
- [ ] Capacity planning aprovado
- [ ] Team treinado`,
      coverImage: "/placeholder-blog-3.jpg",
      status: PostStatus.PUBLISHED,
      publishedAt: new Date("2024-03-10"),
      authorId: admin.id,
      categoryId: cloudCategory?.id,
    },
  ];

  // Create posts without tags first
  for (const post of postsData) {
    await prisma.post.upsert({
      where: { slug: post.slug },
      update: {},
      create: post,
    });
  }
  console.log("✅ Posts do blog criados:", postsData.length);

  // Connect tags to posts
  const postTagConnections = [
    { slug: "migrar-sistemas-legados-arquitetura-moderna", tagNames: ["React", "Next.js", "TypeScript", "Microsserviços"] },
    { slug: "lgpd-pratica-guia-completo-adequacao", tagNames: ["LGPD", "ISO 27001", "Segurança"] },
    { slug: "kubernetes-pratica-zero-producao-30-dias", tagNames: ["Kubernetes", "Docker", "AWS", "DevOps", "Terraform"] },
  ];

  for (const conn of postTagConnections) {
    const post = await prisma.post.findUnique({ where: { slug: conn.slug } });
    const tagIds = tags.filter((t) => conn.tagNames.includes(t.name)).map((t) => t.id);
    
    if (post && tagIds.length > 0) {
      await prisma.postTag.createMany({
        data: tagIds.map((tagId) => ({
          postId: post.id,
          tagId,
        })),
        skipDuplicates: true,
      });
    }
  }
  console.log("✅ Tags dos posts conectadas");

  // Create site settings
  await prisma.siteSettings.upsert({
    where: { id: "singleton" },
    update: {},
    create: {
      id: "singleton",
      siteName: "Suprema Consultoria em TI",
      siteDescription: "Consultoria especializada em TI: desenvolvimento, segurança, cloud e infraestrutura.",
      siteUrl: "https://suprema-ti.com.br",
      logo: "/logo.png",
      primaryColor: "#1E3A5F",
      secondaryColor: "#0077B6",
      accentColor: "#00B4D8",
      contactEmail: "contato@suprema-ti.com.br",
      contactPhone: "(XX) XXXX-XXXX",
      contactAddress: "Sua Cidade, Estado",
      whatsappNumber: "55XXXXXXXXXXX",
    },
  });
  console.log("✅ Configurações do site criadas");

  console.log("🎉 Seed concluído com sucesso!");
}

main()
  .catch((e) => {
    console.error("❌ Erro no seed:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
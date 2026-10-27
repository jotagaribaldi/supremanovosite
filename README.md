<<<<<<< HEAD
# Suprema Consultoria em TI - Site Institucional com CMS

Site profissional desenvolvido com **Next.js 14+ (App Router)**, **TypeScript**, **Tailwind CSS**, **Prisma ORM** e **PostgreSQL**, com painel administrativo completo para gerenciamento de conteúdo (CMS).

## 🚀 Tecnologias

### Frontend
- **Next.js 14+** - App Router, Server Components, Server Actions
- **React 19** - Componentes modernos
- **TypeScript** - Tipagem estática
- **Tailwind CSS** - Estilização utilitária moderna
- **Lucide React** - Ícones

### Backend & Database
- **Prisma ORM** - Type-safe database access
- **PostgreSQL** - Banco de dados relacional robusto
- **NextAuth.js v5** - Autenticação segura (Credentials provider)
- **bcryptjs** - Hash de senhas

### CMS Features
- 📝 **Blog completo** - Posts, categorias, tags, SEO, rascunhos/publicados
- 🛠 **Gerenciamento de Serviços** - CRUD completo com reordenação
- 🖼 **Portfólio** - Cases de sucesso com galeria
- 📬 **Contatos** - Recebimento e gestão de mensagens
- 👥 **Usuários e Roles** - Admin/Editor com permissões
- ⚙️ **Configurações do Site** - Cores, contatos, SEO, redes sociais

## 📋 Pré-requisitos

- Node.js 20+
- PostgreSQL 15+ (ou Docker)
- npm/yarn/pnpm

## 🛠 Instalação

### 1. Clone e instale dependências

```bash
cd suprema-ti
npm install
```

### 2. Configure o banco de dados

#### Opção A: Docker (Recomendado para desenvolvimento)

```bash
docker-compose up -d
```

#### Opção B: PostgreSQL local

Crie o banco e usuário:
```sql
CREATE DATABASE suprema_ti;
CREATE USER suprema_user WITH ENCRYPTED PASSWORD 'sua_senha';
GRANT ALL PRIVILEGES ON DATABASE suprema_ti TO suprema_user;
```

### 3. Configure variáveis de ambiente

```bash
cp .env.example .env
# Edite .env com suas credenciais
```

### 4. Inicialize o banco de dados

```bash
# Gerar cliente Prisma
npm run db:generate

# Criar tabelas (desenvolvimento)
npm run db:push

# Ou criar migrações (produção)
npm run db:migrate

# Popular com dados iniciais
npm run db:seed
```

### 5. Inicie o servidor de desenvolvimento

```bash
npm run dev
```

Acesse: http://localhost:3000
Admin: http://localhost:3000/admin/login

**Credenciais padrão:**
- Admin: `admin@suprema-ti.com.br` / `admin123`
- Editor: `editor@suprema-ti.com.br` / `editor123`

## 📁 Estrutura do Projeto

```
src/
├── app/                    # Next.js App Router
│   ├── (dashboard)/        # Admin layout group
│   │   ├── posts/          # Blog management
│   │   ├── services/       # Services management
│   │   ├── portfolio/      # Portfolio management
│   │   ├── contacts/       # Contact messages
│   │   ├── users/          # User management
│   │   └── settings/       # Site settings
│   ├── api/                # API Routes
│   ├── blog/               # Blog pages
│   ├── servicos/           # Services pages
│   ├── portfolio/          # Portfolio pages
│   ├── sobre/              # About page
│   └── contato/            # Contact page
├── components/
│   ├── ui/                 # Base components (Button, Input, Card, etc.)
│   ├── layout/             # Header, Footer
│   └── sections/           # Page sections (Hero, Services, etc.)
├── lib/
│   ├── auth.ts             # NextAuth config
│   ├── prisma.ts           # Prisma client
│   ├── settings.ts         # Site settings cache
│   └── utils.ts            # Helper functions
├── types/                  # TypeScript types
└── middleware.ts           # Auth protection
prisma/
├── schema.prisma           # Database schema
└── seed.ts                 # Seed data
```

## 🌐 Deploy na VPS

### 1. Prepare o servidor

```bash
# Instale Docker e Docker Compose
curl -fsSL https://get.docker.com | sh
sudo usermod -aG docker $USER

# Instale Node.js 20
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt-get install -y nodejs
```

### 2. Configure variáveis de produção

```bash
# .env.production
DATABASE_URL="postgresql://user:senha@localhost:5432/suprema_ti"
NEXTAUTH_URL="https://seudominio.com.br"
NEXTAUTH_SECRET="gere-uma-chave-segura-com-openssl-rand-base64-32"
NEXT_PUBLIC_SITE_URL="https://seudominio.com.br"
```

### 3. Build e deploy

```bash
# Build da aplicação
npm run build

# Execute migrações de produção
npm run db:migrate deploy

# Inicie com PM2
npm install -g pm2
pm2 start npm --name "suprema-ti" -- start
pm2 save
pm2 startup
```

### 4. Nginx Reverse Proxy

```nginx
server {
    listen 80;
    server_name seudominio.com.br www.seudominio.com.br;
    
    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    }
}
```

### 5. SSL com Let's Encrypt

```bash
sudo apt install certbot python3-certbot-nginx
sudo certbot --nginx -d seudominio.com.br -d www.seudominio.com.br
```

## 🔧 Scripts Disponíveis

| Comando | Descrição |
|---------|-----------|
| `npm run dev` | Servidor de desenvolvimento |
| `npm run build` | Build de produção |
| `npm run start` | Servidor de produção |
| `npm run lint` | Linting com ESLint |
| `npm run format` | Formatar com Prettier |
| `npm run db:generate` | Gerar Prisma Client |
| `npm run db:push` | Push schema (dev) |
| `npm run db:migrate` | Criar migração |
| `npm run db:migrate deploy` | Aplicar migrações (prod) |
| `npm run db:studio` | Abrir Prisma Studio |
| `npm run db:seed` | Popular banco com dados |
| `npm run db:reset` | Reset completo do banco |

## 🔐 Segurança

- ✅ Senhas hasheadas com bcrypt (cost 12)
- ✅ NextAuth.js com JWT strategy
- ✅ Middleware de proteção de rotas admin
- ✅ Validação com Zod em todas as APIs
- ✅ Rate limiting recomendado (implementar com Upstash/Redis)
- ✅ Headers de segurança (configurar no Nginx/Next.js)
- ✅ HTTPS obrigatório em produção
- ✅ Variáveis sensíveis apenas no servidor

## 📝 Licença

Projeto desenvolvido para a **Suprema Consultoria em TI**.

---

**Suprema Consultoria em TI** - Transformando tecnologia em resultados reais.
=======
# supremanovosite
>>>>>>> afab1c2ade68d276533a264182d3ff377cace618

# Deploy via Docker no aaPanel - Guia Completo

## 🎯 Por que Docker no aaPanel?
- ✅ Isolamento total da aplicação
- ✅ Fácil rollback (basta trocar imagem)
- ✅ Banco e Redis versionados no compose
- ✅ aaPanel gerencia apenas o proxy reverso (nginx)
- ✅ Zero conflito com PHP/outros sites do painel

---

## 📋 Pré-requisitos no Servidor

```bash
# 1. Instalar Docker e Docker Compose (se não tiver)
curl -fsSL https://get.docker.com | sh
sudo usermod -aG docker $USER
# SAIA E ENTRE NO SSH NOVAMENTE

# 2. Verificar instalação
docker --version
docker compose version
```

---

## 🚀 Passo a Passo no aaPanel

### 1. Preparar o Projeto no Servidor

```bash
# No servidor, na pasta do usuário
cd /home/ubuntu  # ou /root, /www/wwwroot

# Clonar repositório (ou subir arquivos via SFTP)
git clone https://github.com/seu-usuario/suprema-ti.git
cd suprema-ti

# OU se for subir via SFTP:
# - Suba TODOS os arquivos exceto node_modules, .next, .git
```

### 2. Configurar Variáveis de Ambiente

```bash
# Copiar template
cp .env.production .env

# EDITAR com seus valores REAIS
nano .env
```

**Campos OBRIGATÓRIOS para editar:**
```env
DB_PASSWORD=senha_super_forte_aqui
NEXTAUTH_SECRET=gere_com_openssl_rand_base64_32
NEXTAUTH_URL=https://suprema.eti.br
```

```bash
# Gerar NEXTAUTH_SECRET seguro
openssl rand -base64 32
# Copie a saída para NEXTAUTH_SECRET
```

### 3. Build e Subida dos Containers

```bash
# Primeira vez (builda a imagem)
docker compose build --no-cache

# Subir containers
docker compose up -d

# Ver logs
docker compose logs -f app

# Ver status
docker compose ps
```

### 4. Inicializar Banco de Dados

```bash
# Aguardar PostgreSQL ficar saudável (uns 10-15s)
docker compose exec app npx prisma migrate deploy
docker compose exec app npx prisma db seed
```

### 5. Configurar Proxy Reverso no aaPanel (NGINX)

> **IMPORTANTE**: O aaPanel usa **NGINX** por padrão para proxy. Não use Apache.

#### No Painel aaPanel:
1. **Site** → **Adicionar Site**
   - Domínio: `suprema.eti.br` + `www.suprema.eti.br`
   - PHP: **Puro Estático** (ou "Nenhum")
   - Criar

2. **Configuração do Site** → **Configuração** → **Proxy Reverso**
   - Adicionar regra:
     - **Url**: `/`
     - **Destino**: `http://127.0.0.1:3000`
     - **Cache**: Desativado
   - Salvar

3. **SSL** → **Let's Encrypt**
   - Marcar `suprema.eti.br` e `www.suprema.eti.br`
   - Aplicar (aaPanel configura HTTPS automaticamente)

4. **Configuração Avançada** (no arquivo de config do nginx):
   ```nginx
   # Adicione dentro do location / { ... }
   proxy_http_version 1.1;
   proxy_set_header Upgrade $http_upgrade;
   proxy_set_header Connection "upgrade";
   proxy_set_header Host $host;
   proxy_set_header X-Real-IP $remote_addr;
   proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
   proxy_set_header X-Forwarded-Proto $scheme;
   proxy_read_timeout 300s;
   proxy_send_timeout 300s;
   ```

---

## 🔄 Atualizações Futuras

```bash
# 1. Pull novo código
git pull origin main

# 2. Rebuild apenas a app (cache layers)
docker compose build app

# 3. Deploy zero-downtime
docker compose up -d --no-deps app

# 4. Migrações (se houver)
docker compose exec app npx prisma migrate deploy
```

---

## 📊 Comandos Úteis

| Ação | Comando |
|------|---------|
| Ver logs app | `docker compose logs -f app` |
| Ver logs DB | `docker compose logs -f postgres` |
| Status containers | `docker compose ps` |
| Reiniciar app | `docker compose restart app` |
| Backup DB | `docker compose exec postgres pg_dump -U suprema suprema_ti > backup_$(date +%F).sql` |
| Entrar no container app | `docker compose exec app sh` |
| Limpar imagens antigas | `docker image prune -f` |

---

## 🛡️ Segurança

### Firewall (ufw)
```bash
# Apenas portas necessárias
sudo ufw allow 22/tcp    # SSH
sudo ufw allow 80/tcp    # HTTP (aaPanel)
sudo ufw allow 443/tcp   # HTTPS (aaPanel)
# NÃO abra 3000, 5432, 6379 externamente!
sudo ufw enable
```

### aaPanel Security
- Painel em porta não-padrão (ex: 8888)
- Fail2Ban ativo
- Acesso SSH apenas por chave

---

## 🆘 Troubleshooting

### App não inicia (porta 3000)
```bash
docker compose logs app
# Verifique: DATABASE_URL, NEXTAUTH_SECRET, portas
```

### Erro de migração
```bash
docker compose exec app npx prisma migrate status
docker compose exec app npx prisma migrate resolve --applied "nome_migration"
```

### SSL não funciona
- Verifique se o proxy reverso no aaPanel aponta para `http://127.0.0.1:3000`
- Force HTTPS no Next.js: `NEXTAUTH_URL=https://suprema.eti.br`

### Permissão de arquivos (uploads, logs)
```bash
# Se usar volumes para uploads
sudo chown -R 1001:1001 ./public/uploads
```

---

## 📁 Estrutura de Volumes Persistentes

```bash
# Volumes Docker (gerenciados pelo Docker)
/var/lib/docker/volumes/suprema-ti_postgres_data/_data  # PostgreSQL
/var/lib/docker/volumes/suprema-ti_redis_data/_data    # Redis
```

**Backup completo:**
```bash
# Backup DB
docker compose exec -T postgres pg_dump -U suprema suprema_ti > backup_db_$(date +%F).sql

# Backup volumes (opcional)
docker run --rm -v suprema-ti_postgres_data:/data -v $(pwd):/backup alpine tar czf /backup/postgres_backup.tar.gz -C /data .
```

---

## ✅ Checklist Final

- [ ] Docker e Compose instalados
- [ ] `.env` configurado com valores reais
- [ ] `docker compose up -d` rodando sem erros
- [ ] `prisma migrate deploy` executado
- [ ] `prisma db seed` executado
- [ ] Site criado no aaPanel (Pure Static)
- [ ] Proxy reverso: `/` → `http://127.0.0.1:3000`
- [ ] SSL Let's Encrypt ativo
- [ ] Headers WebSocket configurados no nginx
- [ ] Firewall: apenas 80/443/22 abertas
- [ ] Teste: `https://suprema.eti.br` carrega
- [ ] Teste: `/admin/login` funciona
- [ ] Teste: Formulário de contato envia email

---

## 🎉 Pronto!

Seu site está no ar com:
- **Next.js 16** em container isolado
- **PostgreSQL 16** persistente
- **Redis 7** para cache
- **NGINX (aaPanel)** como proxy reverso + SSL
- **Zero configuração manual de servidor web**
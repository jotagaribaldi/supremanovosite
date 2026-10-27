import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import Link from "next/link";
import { FileText, Box, Briefcase, Mail, Users, TrendingUp, Clock, CheckCircle, AlertCircle, Plus, Eye, Edit, Trash2 } from "lucide-react";
import { prisma } from "@/lib/prisma";
import { formatDate, formatDateShort } from "@/lib/utils";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

export const dynamic = "force-dynamic";

export default async function AdminDashboardPage() {
  const session = await auth();
  if (!session?.user || (session.user.role !== "ADMIN" && session.user.role !== "EDITOR")) {
    redirect("/admin/login");
  }

  const [
    postsCount,
    publishedPostsCount,
    servicesCount,
    portfolioCount,
    contactsCount,
    newContactsCount,
    recentPosts,
    recentContacts,
  ] = await Promise.all([
    prisma.post.count(),
    prisma.post.count({ where: { status: "PUBLISHED" } }),
    prisma.service.count(),
    prisma.portfolio.count(),
    prisma.contact.count(),
    prisma.contact.count({ where: { status: "NEW" } }),
    prisma.post.findMany({
      take: 5,
      orderBy: { createdAt: "desc" },
      include: { category: true, author: { select: { name: true } } },
    }),
    prisma.contact.findMany({
      take: 5,
      orderBy: { createdAt: "desc" },
    }),
  ]);

  const stats = [
    { name: "Total de Posts", value: postsCount, icon: FileText, color: "text-blue-600", bg: "bg-blue-100 dark:bg-blue-900/30", href: "/admin/posts" },
    { name: "Publicados", value: publishedPostsCount, icon: CheckCircle, color: "text-green-600", bg: "bg-green-100 dark:bg-green-900/30", href: "/admin/posts?status=PUBLISHED" },
    { name: "Serviços", value: servicesCount, icon: Box, color: "text-purple-600", bg: "bg-purple-100 dark:bg-purple-900/30", href: "/admin/services" },
    { name: "Portfólio", value: portfolioCount, icon: Briefcase, color: "text-orange-600", bg: "bg-orange-100 dark:bg-orange-900/30", href: "/admin/portfolio" },
    { name: "Contatos", value: contactsCount, icon: Mail, color: "text-cyan-600", bg: "bg-cyan-100 dark:bg-cyan-900/30", href: "/admin/contacts" },
    { name: "Novos Contatos", value: newContactsCount, icon: AlertCircle, color: "text-red-600", bg: "bg-red-100 dark:bg-red-900/30", href: "/admin/contacts?status=NEW" },
  ];

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Dashboard</h1>
          <p className="text-muted-foreground mt-1">Visão geral do painel administrativo</p>
        </div>
        <div className="flex gap-2">
          <Link href="/admin/posts/new">
            <Button size="sm" className="gap-2">
              <Plus className="h-4 w-4" />
              Novo Post
            </Button>
          </Link>
          <Link href="/admin/contacts">
            <Button variant="outline" size="sm" className="gap-2">
              <Mail className="h-4 w-4" />
              Ver Contatos
            </Button>
          </Link>
        </div>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
        {stats.map((stat) => (
          <Link key={stat.name} href={stat.href} className="p-5 rounded-xl bg-white dark:bg-slate-800 border border-gray-100 dark:border-slate-700 hover:shadow-lg transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">{stat.name}</p>
                <p className="text-3xl font-bold text-foreground mt-1">{stat.value}</p>
              </div>
              <div className={`p-3 rounded-xl ${stat.bg}`}>
                <stat.icon className={`h-6 w-6 ${stat.color}`} aria-hidden="true" />
              </div>
            </div>
          </Link>
        ))}
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        <section className="bg-white dark:bg-slate-800 rounded-2xl border border-gray-100 dark:border-slate-700 overflow-hidden">
          <div className="p-5 border-b border-gray-100 dark:border-slate-700 flex items-center justify-between">
            <h2 className="text-lg font-semibold text-foreground flex items-center gap-2">
              <FileText className="h-5 w-5 text-primary" aria-hidden="true" />
              Posts Recentes
            </h2>
            <Link href="/admin/posts" className="text-sm text-primary hover:underline">Ver todos</Link>
          </div>
          <div className="divide-y divide-gray-100 dark:divide-slate-700">
            {recentPosts.length > 0 ? (
              recentPosts.map((post) => (
                <div key={post.id} className="p-5 flex items-center justify-between hover:bg-gray-50 dark:hover:bg-slate-700/50 transition-colors">
                  <div className="flex-1 min-w-0">
                    <Link href={`/admin/posts/${post.id}/edit`} className="font-medium text-foreground hover:text-primary transition-colors line-clamp-1 block mb-1">
                      {post.title}
                    </Link>
                    <div className="flex items-center gap-3 text-sm text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <Clock className="h-3.5 w-3.5" aria-hidden="true" />
                        {formatDateShort(post.createdAt)}
                      </span>
                      {post.category && (
                        <Badge variant="secondary" className="text-xs">{post.category.name}</Badge>
                      )}
                      <Badge variant={post.status === "PUBLISHED" ? "success" : post.status === "DRAFT" ? "secondary" : "warning"}>
                        {post.status === "PUBLISHED" ? "Publicado" : post.status === "DRAFT" ? "Rascunho" : "Arquivado"}
                      </Badge>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 ml-4">
                    <Link href={`/blog/${post.slug}`} target="_blank" className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-slate-700" aria-label="Visualizar">
                      <Eye className="h-4 w-4" />
                    </Link>
                    <Link href={`/admin/posts/${post.id}/edit`} className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-slate-700" aria-label="Editar">
                      <Edit className="h-4 w-4" />
                    </Link>
                  </div>
                </div>
              ))
            ) : (
              <div className="p-8 text-center text-muted-foreground">
                <FileText className="h-12 w-12 mx-auto mb-3 opacity-50" />
                <p>Nenhum post criado ainda</p>
                <Link href="/admin/posts/new" className="mt-3 inline-block text-primary hover:underline">
                  Criar primeiro post
                </Link>
              </div>
            )}
          </div>
        </section>

        <section className="bg-white dark:bg-slate-800 rounded-2xl border border-gray-100 dark:border-slate-700 overflow-hidden">
          <div className="p-5 border-b border-gray-100 dark:border-slate-700 flex items-center justify-between">
            <h2 className="text-lg font-semibold text-foreground flex items-center gap-2">
              <Mail className="h-5 w-5 text-primary" aria-hidden="true" />
              Contatos Recentes
            </h2>
            <Link href="/admin/contacts" className="text-sm text-primary hover:underline">Ver todos</Link>
          </div>
          <div className="divide-y divide-gray-100 dark:divide-slate-700">
            {recentContacts.length > 0 ? (
              recentContacts.map((contact) => (
                <div key={contact.id} className="p-5 flex items-center justify-between hover:bg-gray-50 dark:hover:bg-slate-700/50 transition-colors">
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-foreground">{contact.name}</p>
                    <p className="text-sm text-muted-foreground truncate">{contact.email}</p>
                    <div className="flex items-center gap-3 text-sm text-muted-foreground mt-1">
                      <span className="flex items-center gap-1">
                        <Clock className="h-3.5 w-3.5" aria-hidden="true" />
                        {formatDateShort(contact.createdAt)}
                      </span>
                      <Badge variant={contact.status === "NEW" ? "default" : contact.status === "READ" ? "secondary" : contact.status === "REPLIED" ? "success" : "destructive"}>
                        {contact.status === "NEW" ? "Novo" : contact.status === "READ" ? "Lido" : contact.status === "REPLIED" ? "Respondido" : "Spam"}
                      </Badge>
                    </div>
                  </div>
                  <Link href={`/admin/contacts/${contact.id}`} className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-slate-700 ml-4" aria-label="Ver detalhes">
                    <Eye className="h-4 w-4" />
                  </Link>
                </div>
              ))
            ) : (
              <div className="p-8 text-center text-muted-foreground">
                <Mail className="h-12 w-12 mx-auto mb-3 opacity-50" />
                <p>Nenhum contato recebido ainda</p>
              </div>
            )}
          </div>
        </section>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        <Link href="/admin/posts/new" className="col-span-1 lg:col-span-2 bg-gradient-to-br from-primary to-secondary rounded-2xl p-8 text-primary-foreground">
          <div className="max-w-md">
            <h3 className="text-2xl font-bold mb-2">Pronto para publicar?</h3>
            <p className="text-primary-foreground/80 mb-6">Crie seu próximo artigo do blog com nosso editor rico em recursos.</p>
            <Button size="lg" variant="secondary" className="gap-2">
              <Plus className="h-5 w-5" />
              Criar Novo Post
            </Button>
          </div>
        </Link>
        <Link href="/admin/services/new" className="bg-white dark:bg-slate-800 rounded-2xl border border-gray-100 dark:border-slate-700 p-6 hover:shadow-lg transition-shadow">
          <div className="flex items-center gap-3 mb-3">
            <div className="p-3 rounded-xl bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400">
              <Box className="h-6 w-6" aria-hidden="true" />
            </div>
            <div>
              <h3 className="font-semibold text-foreground">Gerenciar Serviços</h3>
              <p className="text-sm text-muted-foreground">Adicionar, editar ou reordenar</p>
            </div>
          </div>
          <Button variant="outline" className="w-full gap-2">
            Gerenciar
            <TrendingUp className="h-4 w-4" />
          </Button>
        </Link>
      </div>
    </div>
  );
}
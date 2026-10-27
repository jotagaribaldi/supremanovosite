import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Calendar, Tag, ArrowRight, Search, Filter } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { Input } from "@/components/ui/Input";
import { formatDate } from "@/lib/utils";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

async function getCategories() {
  return prisma.category.findMany({
    where: { posts: { some: { status: "PUBLISHED" } } },
    include: { _count: { select: { posts: { where: { status: "PUBLISHED" } } } } },
    orderBy: { name: "asc" },
  });
}

async function getTags() {
  return prisma.tag.findMany({
    where: { posts: { some: { post: { status: "PUBLISHED" } } } },
    include: { _count: { select: { posts: { where: { post: { status: "PUBLISHED" } } } } } },
    orderBy: { name: "asc" },
    take: 20,
  });
}

async function getPosts(searchParams: { page?: string; category?: string; tag?: string; search?: string }) {
  const page = parseInt(searchParams.page || "1");
  const perPage = 9;
  
  const where: any = { status: "PUBLISHED" };
  
  if (searchParams.category) {
    where.category = { slug: searchParams.category };
  }
  if (searchParams.tag) {
    where.tags = { some: { tag: { slug: searchParams.tag } } };
  }
  if (searchParams.search) {
    where.OR = [
      { title: { contains: searchParams.search, mode: "insensitive" } },
      { excerpt: { contains: searchParams.search, mode: "insensitive" } },
      { content: { contains: searchParams.search, mode: "insensitive" } },
    ];
  }

  const [posts, total] = await Promise.all([
    prisma.post.findMany({
      where,
      orderBy: { publishedAt: "desc" },
      skip: (page - 1) * perPage,
      take: perPage,
      include: {
        author: { select: { name: true, image: true } },
        category: true,
        tags: { include: { tag: true } },
      },
    }),
    prisma.post.count({ where }),
  ]);

  return { posts, total, totalPages: Math.ceil(total / perPage), currentPage: page };
}

interface BlogPageProps {
  searchParams: Promise<{ page?: string; category?: string; tag?: string; search?: string }>;
}

export default async function BlogPage({ searchParams }: BlogPageProps) {
  const params = await searchParams;
  const { posts, totalPages, currentPage } = await getPosts(params);
  const [categories, tags, totalPosts] = await Promise.all([
    getCategories(), 
    getTags(),
    prisma.post.count({ where: { status: "PUBLISHED" } })
  ]);

  const buildUrl = (newParams: Record<string, string | undefined>) => {
    const urlParams = new URLSearchParams();
    Object.entries({ ...params, ...newParams }).forEach(([key, value]) => {
      if (value) urlParams.set(key, value);
    });
    return `/blog?${urlParams.toString()}`;
  };

  return (
    <>
      <Header />
      <main id="main-content" className="min-h-screen pt-16">
        <section className="section-padding bg-gradient-to-br from-primary/5 via-background to-accent/5" aria-labelledby="blog-hero-title">
          <div className="container-custom">
            <div className="max-w-3xl mx-auto text-center">
              <h1 id="blog-hero-title" className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-foreground mb-6">
                Blog da <span className="text-primary">Suprema TI</span>
              </h1>
              <p className="text-lg sm:text-xl text-muted-foreground mb-8">
                Artigos, tutoriais, cases, novidades e insights sobre tecnologia,
                desenvolvimento, segurança, cloud e muito mais.
              </p>
              
              <form action="/blog" method="GET" className="max-w-md mx-auto" role="search">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" aria-hidden="true" />
                  <input
                    type="search"
                    name="search"
                    placeholder="Buscar artigos..."
                    defaultValue={params.search}
                    className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-200 dark:border-slate-600 bg-white dark:bg-slate-800 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                    aria-label="Buscar artigos"
                  />
                </div>
              </form>
            </div>
          </div>
        </section>

        <section className="section-padding" aria-labelledby="posts-title">
          <div className="container-custom">
            <div className="grid lg:grid-cols-4 gap-8">
              <aside className="lg:col-span-1 space-y-8">
                {params.category || params.tag || params.search ? (
                  <div className="p-4 rounded-lg bg-primary/5 border border-primary/10">
                    <p className="text-sm font-medium text-primary mb-2">Filtros ativos:</p>
                    <div className="flex flex-wrap gap-2">
                      {params.category && (
                        <Link
                          href={buildUrl({ category: undefined, page: undefined })}
                          className="inline-flex items-center gap-1 px-2 py-1 text-xs rounded bg-primary/10 text-primary hover:bg-primary/20"
                        >
                          Categoria: {params.category}
                          <span className="text-primary-foreground">✕</span>
                        </Link>
                      )}
                      {params.tag && (
                        <Link
                          href={buildUrl({ tag: undefined, page: undefined })}
                          className="inline-flex items-center gap-1 px-2 py-1 text-xs rounded bg-primary/10 text-primary hover:bg-primary/20"
                        >
                          Tag: {params.tag}
                          <span className="text-primary-foreground">✕</span>
                        </Link>
                      )}
                      {params.search && (
                        <Link
                          href={buildUrl({ search: undefined, page: undefined })}
                          className="inline-flex items-center gap-1 px-2 py-1 text-xs rounded bg-primary/10 text-primary hover:bg-primary/20"
                        >
                          Busca: "{params.search}"
                          <span className="text-primary-foreground">✕</span>
                        </Link>
                      )}
                      <Link
                        href="/blog"
                        className="inline-flex items-center gap-1 px-2 py-1 text-xs rounded bg-gray-100 dark:bg-slate-700 text-muted-foreground hover:text-foreground"
                      >
                        Limpar todos
                      </Link>
                    </div>
                  </div>
                ) : null}

                <div>
                  <h3 className="font-semibold text-foreground mb-4 flex items-center gap-2">
                    <Filter className="h-5 w-5" aria-hidden="true" />
                    Categorias
                  </h3>
                  <nav aria-label="Categorias do blog">
                    <ul className="space-y-2">
                      <li>
                        <Link
                          href="/blog"
                          className={`block px-3 py-2 rounded-lg text-sm transition-colors ${
                            !params.category
                              ? "bg-primary/10 text-primary font-medium"
                              : "text-muted-foreground hover:bg-gray-100 dark:hover:bg-slate-700"
                          }`}
                        >
                          Todas ({posts.length > 0 ? totalPosts : 0})
                        </Link>
                      </li>
                      {categories.map((cat) => (
                        <li key={cat.slug}>
                          <Link
                            href={buildUrl({ category: cat.slug, page: undefined })}
                            className={`block px-3 py-2 rounded-lg text-sm transition-colors ${
                              params.category === cat.slug
                                ? "bg-primary/10 text-primary font-medium"
                                : "text-muted-foreground hover:bg-gray-100 dark:hover:bg-slate-700"
                            }`}
                          >
                            {cat.name} ({cat._count.posts})
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </nav>
                </div>

                <div>
                  <h3 className="font-semibold text-foreground mb-4 flex items-center gap-2">
                    <Tag className="h-5 w-5" aria-hidden="true" />
                    Tags Populares
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {tags.map((tag) => (
                      <Link
                        key={tag.slug}
                        href={buildUrl({ tag: tag.slug, page: undefined })}
                        className="px-3 py-1 text-xs rounded-full bg-gray-100 dark:bg-slate-700 text-muted-foreground hover:bg-primary/10 hover:text-primary transition-colors"
                      >
                        {tag.name}
                      </Link>
                    ))}
                  </div>
                </div>
              </aside>

              <div className="lg:col-span-3">
                <div className="flex items-center justify-between mb-6">
                  <h2 id="posts-title" className="text-2xl font-bold text-foreground">
                    {params.search ? `Resultados para "${params.search}"` : "Últimos Artigos"}
                  </h2>
                  <span className="text-sm text-muted-foreground">{posts.length} de {totalPosts} artigos</span>
                </div>

                {posts.length > 0 ? (
                  <>
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {posts.map((post) => (
                        <article
                          key={post.id}
                          className="group bg-white dark:bg-slate-800 rounded-2xl overflow-hidden border border-gray-100 dark:border-slate-700 hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
                        >
                          {post.coverImage && (
                            <Link href={`/blog/${post.slug}`} className="block aspect-video overflow-hidden" aria-label={`Ler: ${post.title}`}>
                              <img
                                src={post.coverImage}
                                alt=""
                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                loading="lazy"
                              />
                            </Link>
                          )}
                          <div className="p-6 space-y-4">
                            <div className="flex items-center gap-2 flex-wrap">
                              {post.category && (
                                <Link
                                  href={buildUrl({ category: post.category.slug })}
                                  className="px-2 py-1 text-xs font-medium rounded-full bg-primary/10 text-primary hover:bg-primary/20 transition-colors"
                                >
                                  {post.category.name}
                                </Link>
                              )}
                              <time dateTime={post.publishedAt?.toISOString() || post.createdAt.toISOString()} className="flex items-center gap-1 text-xs text-muted-foreground">
                                <Calendar className="h-3 w-3" aria-hidden="true" />
                                {formatDate(post.publishedAt || post.createdAt)}
                              </time>
                            </div>
                            <Link href={`/blog/${post.slug}`}>
                              <h3 className="text-lg font-semibold text-foreground group-hover:text-primary transition-colors line-clamp-2">
                                {post.title}
                              </h3>
                            </Link>
                            {post.excerpt && (
                              <p className="text-sm text-muted-foreground line-clamp-3">{post.excerpt}</p>
                            )}
                            <div className="flex items-center justify-between pt-2 border-t border-gray-100 dark:border-slate-700">
                              <div className="flex items-center gap-2">
                                {post.author.image && (
                                  <img src={post.author.image} alt="" className="h-6 w-6 rounded-full" />
                                )}
                                <span className="text-sm font-medium text-foreground">{post.author.name || "Suprema TI"}</span>
                              </div>
                              <Link
                                href={`/blog/${post.slug}`}
                                className="text-sm font-medium text-primary hover:text-primary/80 flex items-center gap-1 transition-colors"
                              >
                                Ler mais
                                <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
                              </Link>
                            </div>
                          </div>
                        </article>
                      ))}
                    </div>

                    {totalPages > 1 && (
                      <nav className="mt-10 flex items-center justify-center gap-2" aria-label="Paginação">
                        {currentPage > 1 && (
                          <Link
                            href={buildUrl({ page: String(currentPage - 1) })}
                            className="px-4 py-2 rounded-lg border border-gray-200 dark:border-slate-600 text-sm font-medium text-muted-foreground hover:bg-gray-100 dark:hover:bg-slate-700 transition-colors"
                          >
                            Anterior
                          </Link>
                        )}
                        {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                          let pageNum: number;
                          if (totalPages <= 5) pageNum = i + 1;
                          else if (currentPage <= 3) pageNum = i + 1;
                          else if (currentPage >= totalPages - 2) pageNum = totalPages - 4 + i;
                          else pageNum = currentPage - 2 + i;
                          
                          return (
                            <Link
                              key={pageNum}
                              href={buildUrl({ page: String(pageNum) })}
                              className={`w-10 h-10 flex items-center justify-center rounded-lg text-sm font-medium transition-colors ${
                                currentPage === pageNum
                                  ? "bg-primary text-primary-foreground"
                                  : "text-muted-foreground hover:bg-gray-100 dark:hover:bg-slate-700"
                              }`}
                            >
                              {pageNum}
                            </Link>
                          );
                        })}
                        {currentPage < totalPages && (
                          <Link
                            href={buildUrl({ page: String(currentPage + 1) })}
                            className="px-4 py-2 rounded-lg border border-gray-200 dark:border-slate-600 text-sm font-medium text-muted-foreground hover:bg-gray-100 dark:hover:bg-slate-700 transition-colors"
                          >
                            Próximo
                          </Link>
                        )}
                      </nav>
                    )}
                  </>
                ) : (
                  <div className="text-center py-16">
                    <p className="text-muted-foreground mb-6">Nenhum artigo encontrado.</p>
                    <Link href="/blog">
                      <Button variant="outline">Ver todos os artigos</Button>
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
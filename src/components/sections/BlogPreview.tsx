import { Calendar, Tag, ArrowRight, Clock } from "lucide-react";
import { Button } from "@/components/ui/Button";
import Link from "next/link";
import { formatDate } from "@/lib/utils";
import { prisma } from "@/lib/prisma";

async function getLatestPosts() {
  try {
    return await prisma.post.findMany({
      where: { status: "PUBLISHED" },
      orderBy: { publishedAt: "desc" },
      take: 3,
      include: {
        author: { select: { name: true, image: true } },
        category: true,
        tags: { include: { tag: true } },
      },
    });
  } catch {
    return [];
  }
}

export async function BlogPreview() {
  const posts = await getLatestPosts();

  if (posts.length === 0) {
    return (
      <section id="blog" className="section-padding bg-gray-50 dark:bg-slate-900/50" aria-labelledby="blog-title">
        <div className="container-custom">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h2 id="blog-title" className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
              Últimos Artigos do <span className="text-primary">Blog</span>
            </h2>
            <p className="text-lg text-muted-foreground">
              Acompanhe nossas novidades, tutoriais, cases e insights sobre tecnologia.
            </p>
          </div>
          <div className="text-center py-12">
            <p className="text-muted-foreground mb-6">Nenhum artigo publicado ainda.</p>
            <Link href="/blog">
              <Button variant="outline">Ver Blog</Button>
            </Link>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="blog" className="section-padding bg-gray-50 dark:bg-slate-900/50" aria-labelledby="blog-title">
      <div className="container-custom">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-12">
          <div>
            <h2 id="blog-title" className="text-3xl sm:text-4xl font-bold text-foreground mb-2">
              Últimos Artigos do <span className="text-primary">Blog</span>
            </h2>
            <p className="text-lg text-muted-foreground">
              Acompanhe nossas novidades, tutoriais, cases e insights sobre tecnologia.
            </p>
          </div>
          <Link href="/blog">
            <Button variant="outline" className="gap-2">
              Ver Todos os Artigos
              <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
        </div>

        <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
          {posts.map((post) => (
            <article
              key={post.id}
              className="group bg-white dark:bg-slate-800 rounded-2xl overflow-hidden border border-gray-100 dark:border-slate-700 hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
            >
              {post.coverImage && (
                <Link href={`/blog/${post.slug}`} className="block aspect-video overflow-hidden" aria-label={`Ler artigo: ${post.title}`}>
                  <img
                    src={post.coverImage}
                    alt=""
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                </Link>
              )}
              <div className="p-6 space-y-4">
                <div className="flex items-center gap-3 flex-wrap">
                  {post.category && (
                    <Link
                      href={`/blog/categoria/${post.category.slug}`}
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
                  <h3 className="text-xl font-semibold text-foreground group-hover:text-primary transition-colors line-clamp-2">
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
      </div>
    </section>
  );
}
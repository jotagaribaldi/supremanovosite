import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Calendar, Tag, ArrowLeft, Share2, Clock, Eye } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { formatDate } from "@/lib/utils";
import { prisma } from "@/lib/prisma";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import { MarkdownContent } from "@/components/ui/MarkdownContent";

export const dynamic = "force-dynamic";

interface PostPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await prisma.post.findUnique({
    where: { slug, status: "PUBLISHED" },
    include: { 
      category: true, 
      tags: { include: { tag: true } },
      author: { select: { name: true } }
    },
  });

  if (!post) return { title: "Artigo não encontrado" };

  return {
    title: post.seoTitle || post.title,
    description: post.seoDesc || post.excerpt || post.content.slice(0, 160),
    openGraph: {
      title: post.seoTitle || post.title,
      description: post.seoDesc || post.excerpt || post.content.slice(0, 160),
      type: "article",
      publishedTime: post.publishedAt?.toISOString(),
      modifiedTime: post.updatedAt.toISOString(),
      authors: [post.author?.name || "Suprema TI"],
      tags: post.tags.map((t) => t.tag.name),
      images: post.coverImage ? [{ url: post.coverImage }] : [],
    },
    twitter: {
      card: "summary_large_image",
      title: post.seoTitle || post.title,
      description: post.seoDesc || post.excerpt || post.content.slice(0, 160),
      images: post.coverImage ? [post.coverImage] : [],
    },
  };
}

export default async function PostPage({ params }: PostPageProps) {
  const { slug } = await params;
  
  const post = await prisma.post.findUnique({
    where: { slug, status: "PUBLISHED" },
    include: {
      author: { select: { name: true, image: true } },
      category: true,
      tags: { include: { tag: true } },
    },
  });

  if (!post) notFound();

  // Increment views
  await prisma.post.update({
    where: { id: post.id },
    data: { views: { increment: 1 } },
  });

  // Get related posts
  const relatedPosts = await prisma.post.findMany({
    where: {
      status: "PUBLISHED",
      id: { not: post.id },
      OR: [
        { categoryId: post.categoryId },
        { tags: { some: { tagId: { in: post.tags.map((t) => t.tagId) } } } },
      ],
    },
    orderBy: { publishedAt: "desc" },
    take: 3,
    include: { category: true },
  });

  return (
    <>
      <Header />
      <main id="main-content" className="min-h-screen pt-16">
        <article className="section-padding">
          <div className="container-custom max-w-4xl">
            <Link href="/blog" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors mb-8">
              <ArrowLeft className="h-4 w-4" aria-hidden="true" />
              Voltar ao Blog
            </Link>

            <header className="mb-8">
              <div className="flex items-center gap-2 flex-wrap mb-4">
                {post.category && (
                  <Link
                    href={`/blog/categoria/${post.category.slug}`}
                    className="px-3 py-1 text-sm font-medium rounded-full bg-primary/10 text-primary hover:bg-primary/20 transition-colors"
                  >
                    {post.category.name}
                  </Link>
                )}
                <time dateTime={post.publishedAt?.toISOString() || post.createdAt.toISOString()} className="flex items-center gap-1 text-sm text-muted-foreground">
                  <Calendar className="h-4 w-4" aria-hidden="true" />
                  {formatDate(post.publishedAt || post.createdAt)}
                </time>
                <span className="flex items-center gap-1 text-sm text-muted-foreground">
                  <Clock className="h-4 w-4" aria-hidden="true" />
                  {Math.ceil(post.content.length / 1000)} min de leitura
                </span>
              </div>

              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-4">{post.title}</h1>

              {post.excerpt && (
                <p className="text-lg text-muted-foreground mb-6 border-l-4 border-primary/20 pl-4 italic">
                  {post.excerpt}
                </p>
              )}

              <div className="flex items-center gap-4 flex-wrap">
                <div className="flex items-center gap-2">
                  {post.author.image && (
                    <img src={post.author.image} alt="" className="h-10 w-10 rounded-full" />
                  )}
                  <div>
                    <p className="font-medium text-foreground">{post.author.name || "Suprema TI"}</p>
                    <p className="text-sm text-muted-foreground">Especialista em TI</p>
                  </div>
                </div>
                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <Eye className="h-4 w-4" aria-hidden="true" />
                    {post.views + 1} visualizações
                  </span>
                  <div className="flex items-center gap-1">
                    <Share2 className="h-4 w-4" aria-hidden="true" />
                    <Button variant="ghost" size="sm" onClick={async () => {
                      if (navigator.share) {
                        await navigator.share({ title: post.title, url: window.location.href });
                      } else {
                        await navigator.clipboard.writeText(window.location.href);
                        alert("Link copiado!");
                      }
                    }}>
                      Compartilhar
                    </Button>
                  </div>
                </div>
              </div>
            </header>

            {post.coverImage && (
              <div className="relative aspect-video rounded-2xl overflow-hidden mb-10">
                <img
                  src={post.coverImage}
                  alt={post.title}
                  className="w-full h-full object-cover"
                />
              </div>
            )}

            <div className="prose prose-lg dark:prose-invert max-w-none">
              <MarkdownContent content={post.content} />
            </div>

            {post.tags.length > 0 && (
              <footer className="mt-12 pt-8 border-t border-gray-100 dark:border-slate-700">
                <div className="flex flex-wrap items-center gap-2">
                  <Tag className="h-4 w-4 text-muted-foreground" aria-hidden="true" />
                  <span className="text-sm font-medium text-muted-foreground">Tags:</span>
                  {post.tags.map((t) => (
                    <Link
                      key={t.tag.slug}
                      href={`/blog/tag/${t.tag.slug}`}
                      className="px-2 py-1 text-xs rounded-full bg-gray-100 dark:bg-slate-700 text-muted-foreground hover:bg-primary/10 hover:text-primary transition-colors"
                    >
                      {t.tag.name}
                    </Link>
                  ))}
                </div>
              </footer>
            )}

            {relatedPosts.length > 0 && (
              <section className="mt-16" aria-labelledby="related-title">
                <h2 id="related-title" className="text-2xl font-bold text-foreground mb-6">Artigos Relacionados</h2>
                <div className="grid md:grid-cols-3 gap-6">
                  {relatedPosts.map((related) => (
                    <Link key={related.id} href={`/blog/${related.slug}`} className="group bg-white dark:bg-slate-800 rounded-xl overflow-hidden border border-gray-100 dark:border-slate-700 hover:shadow-lg transition-shadow">
                      {related.coverImage && (
                        <div className="aspect-video overflow-hidden">
                          <img src={related.coverImage} alt="" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" loading="lazy" />
                        </div>
                      )}
                      <div className="p-4 space-y-2">
                        {related.category && (
                          <Badge variant="outline" className="text-xs">{related.category.name}</Badge>
                        )}
                        <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors line-clamp-2">
                          {related.title}
                        </h3>
                        <time className="text-xs text-muted-foreground">{formatDate(related.publishedAt || related.createdAt)}</time>
                      </div>
                    </Link>
                  ))}
                </div>
              </section>
            )}

            <div className="mt-16 pt-8 border-t border-gray-100 dark:border-slate-700 text-center">
              <p className="text-muted-foreground mb-4">Gostou do artigo? Compartilhe com sua rede!</p>
              <div className="flex items-center justify-center gap-4">
                <Button variant="outline" size="sm" onClick={async () => {
                  if (navigator.share) await navigator.share({ title: post.title, url: window.location.href });
                  else { await navigator.clipboard.writeText(window.location.href); alert("Link copiado!"); }
                }}>
                  <Share2 className="h-4 w-4 mr-2" />
                  Compartilhar
                </Button>
                <a href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(window.location.href)}`} target="_blank" rel="noopener noreferrer" className="px-4 py-2 rounded-lg border border-gray-200 dark:border-slate-600 text-sm font-medium text-muted-foreground hover:bg-gray-100 dark:hover:bg-slate-700 transition-colors flex items-center gap-2">
                  <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003zm-.792 22.59H2.56V1.73h18.87v20.86z"/></svg>
                  LinkedIn
                </a>
                <a href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(post.title)}&url=${encodeURIComponent(window.location.href)}`} target="_blank" rel="noopener noreferrer" className="px-4 py-2 rounded-lg border border-gray-200 dark:border-slate-600 text-sm font-medium text-muted-foreground hover:bg-gray-100 dark:hover:bg-slate-700 transition-colors flex items-center gap-2">
                  <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 9.243h-3.308l-7.227-8.26-8.502-9.243h3.308l7.227 8.26-8.502 9.243h3.308l7.227-8.26 8.502-9.243h-3.308l-7.227 8.26 8.502-9.243h-3.308l-7.227-8.26 8.502 9.243h3.308Z"/></svg>
                  Twitter
                </a>
              </div>
            </div>
          </div>
        </article>
      </main>
      <Footer />
    </>
  );
}
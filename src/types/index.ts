export type PostStatus = "DRAFT" | "PUBLISHED" | "ARCHIVED";
export type ContactStatus = "NEW" | "READ" | "REPLIED" | "SPAM";
export type UserRole = "ADMIN" | "EDITOR";

export interface Service {
  id: string;
  title: string;
  slug: string;
  shortDesc: string;
  fullDesc: string;
  icon: string;
  features: string[];
  order: number;
  isActive: boolean;
}

export interface Portfolio {
  id: string;
  title: string;
  slug: string;
  client: string;
  description: string;
  shortDesc: string;
  image: string;
  gallery: string[];
  technologies: string[];
  category: string;
  projectUrl?: string;
  isFeatured: boolean;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  description?: string;
  color: string;
  _count?: { posts: number };
}

export interface Tag {
  id: string;
  name: string;
  slug: string;
  color: string;
}

export interface Post {
  id: string;
  title: string;
  slug: string;
  excerpt?: string;
  content: string;
  coverImage?: string;
  status: PostStatus;
  publishedAt?: Date;
  authorId: string;
  author: { name?: string; image?: string };
  categoryId?: string;
  category?: Category;
  tags: Tag[];
  seoTitle?: string;
  seoDesc?: string;
  views: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface SiteSettings {
  siteName: string;
  siteDescription: string;
  siteUrl: string;
  logo: string;
  primaryColor: string;
  secondaryColor: string;
  accentColor: string;
  contactEmail: string;
  contactPhone: string;
  contactAddress: string;
  whatsappNumber: string;
  linkedinUrl?: string;
  githubUrl?: string;
  instagramUrl?: string;
  facebookUrl?: string;
  twitterUrl?: string;
}
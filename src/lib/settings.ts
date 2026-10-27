import { prisma } from "./prisma";

let settingsCache: any = null;
let cacheTime = 0;
const CACHE_TTL = 60000; // 1 minute

export async function getSiteSettings() {
  const now = Date.now();
  if (settingsCache && now - cacheTime < CACHE_TTL) {
    return settingsCache;
  }

  try {
    let settings = await prisma.siteSettings.findUnique({ where: { id: "singleton" } });

    if (!settings) {
      settings = await prisma.siteSettings.create({ data: { id: "singleton" } });
    }

    settingsCache = settings;
    cacheTime = now;
    return settings;
  } catch {
    // Return default settings if database is not available
    return {
      id: "singleton",
      siteName: "Suprema Consultoria em TI",
      siteDescription: "Consultoria especializada em TI: desenvolvimento, segurança, cloud e infraestrutura.",
      siteUrl: "https://suprema-ti.com.br",
      logo: "/logo.png",
      favicon: "/favicon.ico",
      primaryColor: "#1E3A5F",
      secondaryColor: "#0077B6",
      accentColor: "#00B4D8",
      contactEmail: "contato@suprema-ti.com.br",
      contactPhone: "(XX) XXXX-XXXX",
      contactAddress: "Sua Cidade, Estado",
      whatsappNumber: "55XXXXXXXXXXX",
      linkedinUrl: null,
      githubUrl: null,
      instagramUrl: null,
      facebookUrl: null,
      twitterUrl: null,
      googleAnalyticsId: null,
      metaPixelId: null,
      maintenanceMode: false,
      updatedAt: new Date(),
    };
  }
}

export function clearSettingsCache() {
  settingsCache = null;
  cacheTime = 0;
}
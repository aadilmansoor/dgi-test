// Public site URL, shared by metadata, the sitemap, robots.txt and llms.txt.
export const SITE_URL = (process.env.NEXT_PUBLIC_BASE_URL || "https://www.decographinteriors.com").replace(/\/$/, "");

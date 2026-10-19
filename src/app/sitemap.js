import { getCollection, queryDocuments } from "@/lib/firestore";
import { groupProjectsByCategory } from "@/lib/categories";
import { SITE_URL } from "@/lib/site";

// Rebuild hourly so newly published works are listed without a redeploy.
export const revalidate = 3600;

const toDate = (timestamp) =>
  timestamp?.seconds ? new Date(timestamp.seconds * 1000) : new Date();

async function loadWorks() {
  try {
    const [projects, categories] = await Promise.all([
      queryDocuments("projects", [{ field: "status", operator: "==", value: "published" }]),
      getCollection("categories"),
    ]);
    return { projects, categories };
  } catch (error) {
    // Still serve the static pages if Firestore is unreachable.
    console.error("sitemap: failed to load works", error);
    return { projects: [], categories: [] };
  }
}

export default async function sitemap() {
  const { projects, categories } = await loadWorks();

  const projectUrls = projects
    .filter((project) => project.slug)
    .map((project) => ({
      url: `${SITE_URL}/works/${project.slug}`,
      lastModified: toDate(project.updatedAt || project.createdAt),
      changeFrequency: "monthly",
      priority: 0.7,
    }));

  const categoryUrls = groupProjectsByCategory(projects, categories).map((category) => ({
    url: `${SITE_URL}/works/category/${category.slug}`,
    // A category changes whenever one of its works does.
    lastModified: new Date(Math.max(...category.projects.map((p) => toDate(p.updatedAt || p.createdAt).getTime()))),
    changeFrequency: "weekly",
    priority: 0.8,
  }));

  const staticPages = [
    { path: "", changeFrequency: "monthly", priority: 1 },
    { path: "/about", changeFrequency: "monthly", priority: 0.9 },
    { path: "/works", changeFrequency: "weekly", priority: 0.9 },
    { path: "/contact", changeFrequency: "yearly", priority: 0.7 },
    { path: "/privacy-policy", changeFrequency: "yearly", priority: 0.2 },
    { path: "/terms-conditions", changeFrequency: "yearly", priority: 0.2 },
  ].map(({ path, ...rest }) => ({ url: `${SITE_URL}${path}`, lastModified: new Date(), ...rest }));

  return [...staticPages, ...categoryUrls, ...projectUrls];
}

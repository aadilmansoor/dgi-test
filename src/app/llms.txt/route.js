import { getCollection, queryDocuments } from "@/lib/firestore";
import { groupProjectsByCategory } from "@/lib/categories";
import { SITE_URL } from "@/lib/site";

// llms.txt (https://llmstxt.org): a plain-markdown guide to the site for AI
// assistants. Company facts come from the company profile; works are live.
export const revalidate = 3600;

const projectSummary = (project) => {
  const text = (project.sections?.[0]?.description || project.description || "")
    .replace(/\s+/g, " ")
    .trim();
  return text.length > 180 ? `${text.slice(0, 177).trimEnd()}...` : text;
};

async function loadCategories() {
  try {
    const [projects, categories] = await Promise.all([
      queryDocuments("projects", [{ field: "status", operator: "==", value: "published" }]),
      getCollection("categories"),
    ]);
    return groupProjectsByCategory(projects.filter((p) => p.slug), categories);
  } catch (error) {
    console.error("llms.txt: failed to load works", error);
    return [];
  }
}

export async function GET() {
  const categories = await loadCategories();

  const works = categories
    .map((category) => {
      const items = category.projects.map((project) => {
        const summary = projectSummary(project);
        return `- [${project.title}](${SITE_URL}/works/${project.slug})${summary ? `: ${summary}` : ""}`;
      });
      return `### [${category.name}](${SITE_URL}/works/category/${category.slug})\n\n${items.join("\n")}`;
    })
    .join("\n\n");

  const body = `# Decograph Interiors

> Decograph Interiors is a full-service interior design and fit-out company based in Dubai, United Arab Emirates. It designs and builds corporate offices, restaurants and cafes, residences and villas, retail stores, wellness spaces, kids' rooms and entertainment venues, taking projects from concept and design through turnkey construction and handover.

- Location: Dubai, United Arab Emirates
- Team: 28+ engineers and interior designers, and 105+ skilled craftsmen
- Sectors: corporate, food & beverage, residential, retail, wellness, kids' rooms, entertainment
- Contact: info@decographinteriors.com, +971 52 676 5631, +971 56 397 0724

## Services

- Space planning for commercial and residential units
- Design concept development and consultation
- Turnkey fit-out and construction
- Bespoke joinery and carpentry design
- MEP: HVAC, plumbing and electrical
- Civil works: partitions, ceilings and flooring
- Renovation and refurbishment
- Project management consulting

## How they work

1. Pre-design: initial consultation, information gathering, site visit and measurements.
2. Design: concept development, design presentation and refinement.
3. Construction and delivery: material selection and procurement, project execution with regular updates, installation and styling, final walkthrough and handover, and post-project support.

## Pages

- [Home](${SITE_URL}/): overview of the studio and featured work
- [About](${SITE_URL}/about): company story, vision and mission, team, services, process and clientele
- [Portfolio](${SITE_URL}/works): all completed works, grouped by category
- [Contact](${SITE_URL}/contact): enquiry form, phone and email
${works ? `\n## Works\n\n${works}\n` : ""}
## Optional

- [Privacy Policy](${SITE_URL}/privacy-policy)
- [Terms & Conditions](${SITE_URL}/terms-conditions)
- [Sitemap](${SITE_URL}/sitemap.xml)
`;

  return new Response(body, {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}

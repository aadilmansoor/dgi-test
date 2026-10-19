// Must stay in sync with CategoryModel.slugify in the DGI_dashboard repo.
export function slugify(value = "") {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");
}

export function categoryHref(categoryName) {
  return `/works/category/${slugify(categoryName)}`;
}

const toMillis = (timestamp) => {
  if (!timestamp) return 0;
  if (typeof timestamp.seconds === "number") return timestamp.seconds * 1000;
  const date = new Date(timestamp);
  return Number.isNaN(date.getTime()) ? 0 : date.getTime();
};

/**
 * Groups published projects by their category name and joins each group with
 * its category document (icon) from the `categories` collection.
 * Categories without published works are left out; works whose category has
 * no document still get a group, so nothing disappears from the site.
 */
export function groupProjectsByCategory(projects = [], categories = []) {
  const categoryByName = new Map(
    categories.map((category) => [category.name?.trim().toLowerCase(), category])
  );
  const groups = new Map();

  const sortedProjects = [...projects].sort(
    (a, b) => toMillis(b.createdAt) - toMillis(a.createdAt)
  );

  for (const project of sortedProjects) {
    const name = project.category?.trim() || "Interior Design";
    const key = name.toLowerCase();

    if (!groups.has(key)) {
      const category = categoryByName.get(key);
      groups.set(key, {
        name: category?.name || name,
        slug: category?.slug || slugify(name),
        iconSvg: category?.iconSvg || "",
        iconUrl: category?.iconUrl || "",
        coverImage: project.coverImage || "",
        projects: [],
      });
    }

    const group = groups.get(key);
    if (!group.coverImage && project.coverImage) group.coverImage = project.coverImage;
    group.projects.push(project);
  }

  return [...groups.values()];
}

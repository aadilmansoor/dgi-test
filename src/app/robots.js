import { SITE_URL } from "@/lib/site";

// AI crawlers are named explicitly so it is clear they are welcome: the site
// should be readable and citable by AI search and assistants, not just search
// engines. To opt out of AI *training* only, move GPTBot, ClaudeBot,
// Google-Extended, Applebot-Extended, Meta-ExternalAgent and CCBot to a
// `disallow: "/"` rule; the search/user agents can stay allowed.
const AI_CRAWLERS = [
  // OpenAI
  "GPTBot", "OAI-SearchBot", "ChatGPT-User",
  // Anthropic
  "ClaudeBot", "Claude-SearchBot", "Claude-User",
  // Perplexity
  "PerplexityBot", "Perplexity-User",
  // Google Gemini / AI Overviews, Apple Intelligence
  "Google-Extended", "Applebot", "Applebot-Extended",
  // Microsoft Copilot (Bing index), Meta AI, Amazon, Common Crawl
  "Bingbot", "Meta-ExternalAgent", "Amazonbot", "CCBot",
];

export default function robots() {
  return {
    rules: [
      { userAgent: "*", allow: "/" },
      { userAgent: AI_CRAWLERS, allow: "/" },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}

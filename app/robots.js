import { site } from '@/content/site';

// Open to all crawlers, including AI search bots (GPTBot, ClaudeBot, PerplexityBot,
// Google-Extended) — the site is marketing content we want cited.
export default function robots() {
  return { rules: [{ userAgent: '*', allow: '/' }], sitemap: `${site.url}/sitemap.xml`, host: site.url };
}

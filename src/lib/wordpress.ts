/**
 * WordPress Headless CMS Integration
 *
 * Enable this module by:
 * 1. Setting WORDPRESS_URL in your environment or .env file
 * 2. Uncommenting the WordPress imports in your page files
 *
 * Supports both REST API (default) and WPGraphQL.
 * REST API requires no plugins. GraphQL requires WPGraphQL plugin.
 */

// Configuration
const WP_URL = import.meta.env.WORDPRESS_URL || 'https://your-wordpress-site.com';
const WP_REST = `${WP_URL}/wp-json/wp/v2`;
const WP_GRAPHQL = `${WP_URL}/graphql`; // Requires WPGraphQL plugin

// ---------- REST API (no plugins required) ----------

export interface WPPost {
  id: number;
  slug: string;
  title: { rendered: string };
  excerpt: { rendered: string };
  content: { rendered: string };
  date: string;
  featured_media: number;
  _embedded?: {
    'wp:featuredmedia'?: Array<{ source_url: string; alt_text: string }>;
  };
}

/**
 * Fetch posts via REST API.
 * Add `?_embed` to include featured images inline.
 */
export async function fetchPosts(page = 1, perPage = 10): Promise<WPPost[]> {
  const res = await fetch(
    `${WP_REST}/posts?_embed&_fields=id,slug,title,excerpt,date,featured_media,_links&per_page=${perPage}&page=${page}`
  );
  if (!res.ok) throw new Error(`WordPress API error: ${res.status}`);
  return res.json();
}

/**
 * Fetch a single post by slug via REST API.
 */
export async function fetchPostBySlug(slug: string): Promise<WPPost | null> {
  const res = await fetch(
    `${WP_REST}/posts?_embed&slug=${slug}`
  );
  if (!res.ok) throw new Error(`WordPress API error: ${res.status}`);
  const posts = await res.json();
  return posts[0] || null;
}

/**
 * Fetch all post slugs for static path generation.
 */
export async function fetchAllSlugs(): Promise<string[]> {
  const slugs: string[] = [];
  let page = 1;
  let hasMore = true;

  while (hasMore) {
    const res = await fetch(
      `${WP_REST}/posts?_fields=slug&per_page=100&page=${page}`
    );
    if (!res.ok) break;
    const posts: Array<{ slug: string }> = await res.json();
    slugs.push(...posts.map((p) => p.slug));
    hasMore = posts.length === 100;
    page++;
  }

  return slugs;
}

/**
 * Fetch pages via REST API.
 */
export async function fetchPages(): Promise<WPPost[]> {
  const res = await fetch(
    `${WP_REST}/pages?_embed&_fields=id,slug,title,content,date`
  );
  if (!res.ok) throw new Error(`WordPress API error: ${res.status}`);
  return res.json();
}

// ---------- GraphQL (requires WPGraphQL plugin) ----------

/**
 * Generic GraphQL query helper.
 */
export async function graphqlQuery<T>(query: string, variables?: Record<string, unknown>): Promise<T> {
  const res = await fetch(WP_GRAPHQL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ query, variables }),
  });

  if (!res.ok) throw new Error(`WPGraphQL error: ${res.status}`);
  const json = await res.json();
  if (json.errors) throw new Error(`WPGraphQL: ${json.errors[0].message}`);
  return json.data;
}

/**
 * Fetch posts via GraphQL (more efficient, single request).
 */
export async function fetchPostsGraphQL(first = 10, after?: string) {
  return graphqlQuery<{
    posts: {
      nodes: Array<{
        id: string;
        slug: string;
        title: string;
        excerpt: string;
        content: string;
        date: string;
        featuredImage: { node: { sourceUrl: string; altText: string } } | null;
      }>;
      pageInfo: { hasNextPage: boolean; endCursor: string };
    };
  }>(
    `query GetPosts($first: Int!, $after: String) {
      posts(first: $first, after: $after) {
        nodes {
          id
          slug
          title
          excerpt
          content
          date
          featuredImage {
            node { sourceUrl altText }
          }
        }
        pageInfo { hasNextPage endCursor }
      }
    }`,
    { first, after }
  );
}

// ---------- Helpers ----------

/**
 * Strip HTML tags from WordPress content (useful for excerpts).
 */
export function stripHtml(html: string): string {
  return html.replace(/<[^>]*>/g, '').trim();
}

/**
 * Format WordPress date for display.
 */
export function formatDate(dateStr: string, locale = 'he-IL'): string {
  return new Date(dateStr).toLocaleDateString(locale, {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

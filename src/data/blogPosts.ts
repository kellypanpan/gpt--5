import rawPosts from './blogPosts.json';

export interface BlogPostMeta {
  id: string;
  title: string;
  description: string;
  category: string;
  readTime: string;
  datePublished: string; // ISO date
  dateModified: string; // ISO date
  path: string;
  coverImage?: string;
  featured?: boolean;
}

export const blogPosts: BlogPostMeta[] = rawPosts as BlogPostMeta[];

export const getPostById = (id: string): BlogPostMeta | undefined =>
  blogPosts.find((p) => p.id === id);

export const getPrevNext = (
  id: string
): { prev?: BlogPostMeta; next?: BlogPostMeta } => {
  const index = blogPosts.findIndex((p) => p.id === id);
  if (index === -1) return {};
  const prev = index > 0 ? blogPosts[index - 1] : undefined;
  const next = index < blogPosts.length - 1 ? blogPosts[index + 1] : undefined;
  return { prev, next };
}; 
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';

export interface Category {
  id: number;
  name: string;
  slug: string;
  createdAt: string;
  updatedAt: string;
}

export interface Rule {
  id: number;
  categoryId: number;
  title: string;
  slug: string;
  url: string;
  content: string;
  contentPreview: string | null;
  category?: Category;
  createdAt: string;
  updatedAt: string;
}

export interface McpServer {
  id: number;
  name: string;
  slug: string;
  classification: string | null;
  releaseDate: string | null;
  provider: string | null;
  githubRepo: string | null;
  description: string | null;
  url: string;
  createdAt: string;
  updatedAt: string;
}

export async function getCategories(): Promise<Category[]> {
  const res = await fetch(`${API_BASE_URL}/categories`, {
    cache: 'no-store', // SSR - always fresh
  });
  if (!res.ok) {
    throw new Error('Failed to fetch categories');
  }
  return res.json();
}

export async function getCategoriesPaginated(page: number = 1, limit: number = 5): Promise<PaginatedResponse<Category>> {
  const res = await fetch(`${API_BASE_URL}/categories?page=${page}&limit=${limit}`, {
    cache: 'no-store',
  });
  if (!res.ok) {
    throw new Error('Failed to fetch categories');
  }
  return res.json();
}

export async function getCategoryBySlug(slug: string): Promise<Category | undefined> {
  const categories = await getCategories();
  return categories.find((cat) => cat.slug === slug);
}

export async function getRulesByCategory(categoryId: number): Promise<Rule[]> {
  const res = await fetch(`${API_BASE_URL}/categories/${categoryId}/rules`, {
    cache: 'no-store',
  });
  if (!res.ok) {
    throw new Error('Failed to fetch rules');
  }
  return res.json();
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export async function getMcpServers(page: number = 1, limit: number = 12): Promise<PaginatedResponse<McpServer>> {
  const res = await fetch(`${API_BASE_URL}/mcp-servers?page=${page}&limit=${limit}`, {
    cache: 'no-store',
  });
  if (!res.ok) {
    throw new Error('Failed to fetch MCP servers');
  }
  return res.json();
}

export async function getMcpServerBySlug(slug: string): Promise<McpServer> {
  const res = await fetch(`${API_BASE_URL}/mcp-servers/slug/${slug}`, {
    cache: 'no-store',
  });
  if (!res.ok) {
    throw new Error('Failed to fetch MCP server');
  }
  return res.json();
}

export async function getRuleBySlug(slug: string): Promise<Rule> {
  const res = await fetch(`${API_BASE_URL}/rules/slug/${slug}`, {
    cache: 'no-store',
  });
  if (!res.ok) {
    throw new Error('Failed to fetch rule');
  }
  return res.json();
}

export async function searchRules(query: string): Promise<Rule[]> {
  const res = await fetch(`${API_BASE_URL}/rules/search?q=${encodeURIComponent(query)}`, {
    cache: 'no-store',
  });
  if (!res.ok) {
    throw new Error('Failed to search rules');
  }
  return res.json();
}


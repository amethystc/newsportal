import { Article } from "@/types";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";

export async function getArticleBySlug(slug: string): Promise<Article | null> {
  try {
    const response = await fetch(`${BASE_URL}/api/articles/${slug}`, {
      next: { revalidate: 300 }, // Revalidate every 5 minutes
    });

    if (!response.ok) {
      if (response.status === 404) {
        return null;
      }
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const result = await response.json();

    if (!result.success) {
      throw new Error(result.message || "API request failed");
    }

    return result.data;
  } catch (error) {
    console.error("Error fetching article:", error);
    return null;
  }
}

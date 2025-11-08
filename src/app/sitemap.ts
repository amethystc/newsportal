import { MetadataRoute } from 'next'
import { client } from '@/sanity/client'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'
  
  // Static pages
  const staticPages = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 1,
    },
    {
      url: `${baseUrl}/article/`,
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 0.9,
    },
  ]

  try {
    // Fetch all articles from Sanity
    const articlesQuery = `
      *[_type == "article"] {
        slug,
        publishedAt,
        _updatedAt
      } | order(publishedAt desc)
    `
    
    const articles = await client.fetch(articlesQuery)

    // Dynamic article pages
    const articlePages = articles.map((article: any) => ({
      url: `${baseUrl}/article/${article.slug.current}`,
      lastModified: new Date(article._updatedAt || article.publishedAt),
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    }))

    return [...staticPages, ...articlePages]
  } catch (error) {
    console.error('Error generating sitemap:', error)
    return staticPages
  }
}
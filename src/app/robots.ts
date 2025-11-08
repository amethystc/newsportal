import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'
  
  return {
    rules: [
      // Default rule for all bots
      {
        userAgent: '*',
        allow: [
          '/',
          '/article/',
          '/api/news',
          '/_next/static/',
          '/images/',
        ],
        disallow: [
          '/api/articles/',
          '/admin/',
          '/_next/api/',
          '/api/articles/[slug]/',
          '/*?*',
          '/*.json$',
          '/404',
          '/_error',
          '/test/',
          '/dev/',
          '/staging/',
          '/preview/',
          // Block search and filter parameters
          '/*?search=*',
          '/*?filter=*',
          '/*?category=*',
          '/*?tag=*',
          '/*?page=*',
          '/*?sort=*',
          '/*?date=*',
          // Block pagination beyond limits
          '/*?page=10*',
          '/*?p=10*',
          // Block tracking parameters
          '/*?utm_*',
          '/*?fbclid*',
          '/*?gclid*',
          '/*?msclkid*',
        ],
        crawlDelay: 1,
      },
      
      // Google - Enhanced crawling for news
      {
        userAgent: 'Googlebot',
        allow: ['/', '/article/', '/api/news'],
        crawlDelay: 1,
      },
      
      // Google News - Priority for news content
      {
        userAgent: 'Googlebot-News',
        allow: ['/article/', '/'],
        disallow: ['/api/', '/admin/'],
        crawlDelay: 0,
      },
      
      // Google Images
      {
        userAgent: 'Googlebot-Image',
        allow: ['/images/', '/_next/static/', '/api/news'],
      },
      
      // Bing
      {
        userAgent: 'Bingbot',
        allow: ['/', '/article/'],
        crawlDelay: 2,
      },
      
      // Yahoo (powered by Bing)
      {
        userAgent: 'Slurp',
        allow: ['/', '/article/'],
        crawlDelay: 2,
      },
      
      // DuckDuckGo
      {
        userAgent: 'DuckDuckBot',
        allow: ['/', '/article/'],
        crawlDelay: 1,
      },
      
      // Social media crawlers - Important for news sharing
      {
        userAgent: 'facebookexternalhit',
        allow: ['/article/', '/'],
      },
      
      {
        userAgent: 'Twitterbot',
        allow: ['/article/', '/'],
      },
      
      {
        userAgent: 'LinkedInBot',
        allow: ['/article/', '/'],
      },
      
      // Apple News
      {
        userAgent: 'Applebot',
        allow: ['/article/', '/'],
      },
      
      // Baidu (Chinese search engine)
      {
        userAgent: 'Baiduspider',
        allow: ['/', '/article/'],
        crawlDelay: 3,
      },
      
      // Block unwanted bots
      {
        userAgent: ['AhrefsBot', 'MJ12bot', 'DotBot', 'BLEXBot', 'BacklinkCrawler'],
        disallow: ['/'],
      },
    ],
    
    sitemap: [
      `${baseUrl}/sitemap.xml`,
      `${baseUrl}/sitemap-articles.xml`,
      `${baseUrl}/sitemap-news.xml`,
      `${baseUrl}/sitemap-images.xml`,
    ],
    
    host: baseUrl.replace(/^https?:\/\//, ''), // Remove protocol for Host directive
  }
}
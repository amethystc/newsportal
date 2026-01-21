# 🚀 Quick Start Guide - Implementing Phase 2 Features

## Getting Started with Week 1 Tasks

This guide helps you implement the highest priority features from the Phase 2 roadmap.

---

## 🔍 Task 1: Search Functionality

### Step 1: Create Search Query in Sanity

Add to `/src/sanity/queries.ts`:

```typescript
export const searchArticlesQuery = `
  *[_type == "article" && (
    title match $searchTerm + "*" ||
    excerpt match $searchTerm + "*" ||
    pt::text(body) match $searchTerm + "*"
  )] | order(publishedAt desc) [0...$limit] {
    title,
    slug,
    excerpt,
    mainImage {
      asset-> {
        url,
        metadata {
          dimensions
        }
      },
      alt
    },
    author-> {
      name,
      slug
    },
    publishedAt,
    region-> {
      title,
      slug
    },
    tags[]-> {
      title,
      slug
    }
  }
`;
```

### Step 2: Create Search API Route

Create `/src/app/api/search/route.ts`:

```typescript
import { NextRequest, NextResponse } from 'next/server';
import { client } from '@/sanity/client';
import { searchArticlesQuery } from '@/sanity/queries';

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const query = searchParams.get('q') || '';
    const limit = parseInt(searchParams.get('limit') || '20');
    
    if (!query || query.length < 2) {
      return NextResponse.json({
        success: false,
        message: 'Search query must be at least 2 characters',
      }, { status: 400 });
    }

    const results = await client.fetch(
      searchArticlesQuery,
      { searchTerm: query, limit }
    );

    return NextResponse.json({
      success: true,
      data: {
        query,
        results,
        count: results.length,
      },
    });
  } catch (error) {
    console.error('Search API Error:', error);
    return NextResponse.json({
      success: false,
      message: 'Search failed',
    }, { status: 500 });
  }
}
```

### Step 3: Create Search Component

Create `/src/components/ui/SearchBar.tsx`:

```typescript
'use client';

import { useState, useRef, useEffect } from 'react';
import { Search, X } from 'lucide-react';
import { useRouter } from 'next/navigation';

export function SearchBar() {
  const [query, setQuery] = useState('');
  const [isExpanded, setIsExpanded] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  useEffect(() => {
    if (isExpanded && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isExpanded]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim().length >= 2) {
      router.push(`/search?q=${encodeURIComponent(query)}`);
      setIsExpanded(false);
      setQuery('');
    }
  };

  const handleClose = () => {
    setIsExpanded(false);
    setQuery('');
  };

  return (
    <div className="relative">
      {!isExpanded ? (
        <button
          onClick={() => setIsExpanded(true)}
          className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          aria-label="Search"
        >
          <Search className="w-5 h-5 text-gray-700" />
        </button>
      ) : (
        <form onSubmit={handleSubmit} className="flex items-center gap-2">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              ref={inputRef}
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search articles..."
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-full w-64 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
            />
          </div>
          <button
            type="button"
            onClick={handleClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            aria-label="Close search"
          >
            <X className="w-5 h-5 text-gray-700" />
          </button>
        </form>
      )}
    </div>
  );
}
```

### Step 4: Create Search Results Page

Create `/src/app/search/page.tsx`:

```typescript
import { Metadata } from 'next';
import Header from '@/components/layout/Header';
import { Footer } from '@/components/section/Footer';
import { ArticleCard } from '@/components/article/ArticleCard';
import { client } from '@/sanity/client';
import { searchArticlesQuery } from '@/sanity/queries';

interface SearchPageProps {
  searchParams: { q?: string };
}

export async function generateMetadata({ searchParams }: SearchPageProps): Promise<Metadata> {
  const query = searchParams.q || '';
  return {
    title: `Search Results for "${query}" | Conflict Wire`,
    description: `Search results for ${query} on Conflict Wire News Portal`,
  };
}

async function searchArticles(query: string) {
  if (!query || query.length < 2) {
    return [];
  }

  try {
    const results = await client.fetch(searchArticlesQuery, {
      searchTerm: query,
      limit: 50,
    });
    return results;
  } catch (error) {
    console.error('Search error:', error);
    return [];
  }
}

export default async function SearchPage({ searchParams }: SearchPageProps) {
  const query = searchParams.q || '';
  const results = await searchArticles(query);

  return (
    <>
      <Header />
      <main className="min-h-screen bg-white">
        <div className="container mx-auto px-4 py-12">
          {/* Search Header */}
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-gray-900 mb-2">
              Search Results
            </h1>
            {query && (
              <p className="text-lg text-gray-600">
                {results.length > 0
                  ? `Found ${results.length} ${results.length === 1 ? 'article' : 'articles'} for "${query}"`
                  : `No results found for "${query}"`}
              </p>
            )}
          </div>

          {/* Results Grid */}
          {results.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {results.map((article: any) => (
                <ArticleCard key={article.slug.current} article={article} />
              ))}
            </div>
          ) : query ? (
            <div className="text-center py-16">
              <p className="text-xl text-gray-600 mb-4">
                No articles found matching your search.
              </p>
              <p className="text-gray-500">
                Try different keywords or browse our{' '}
                <a href="/" className="text-red-600 hover:underline">
                  latest articles
                </a>
                .
              </p>
            </div>
          ) : (
            <div className="text-center py-16">
              <p className="text-xl text-gray-600">
                Enter a search term to find articles.
              </p>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}
```

### Step 5: Add Search to Header

Update `/src/components/layout/Header.tsx`:

```typescript
// Add import at top
import { SearchBar } from '@/components/ui/SearchBar';

// Add SearchBar component in the header, near the utility nav
<div className="flex items-center gap-4">
  <SearchBar />
  {/* Existing utility nav items */}
</div>
```

---

## 👤 Task 2: Author Profile Pages

### Step 1: Create Author Queries

Add to `/src/sanity/queries.ts`:

```typescript
export const authorBySlugQuery = `
  *[_type == "author" && slug.current == $slug][0] {
    name,
    slug,
    bio,
    image {
      asset-> {
        url,
        metadata {
          dimensions
        }
      },
      alt
    },
    social {
      twitter,
      linkedin,
      email
    }
  }
`;

export const authorArticlesQuery = `
  *[_type == "article" && author->slug.current == $authorSlug] | order(publishedAt desc) [0...50] {
    title,
    slug,
    excerpt,
    mainImage {
      asset-> {
        url,
        metadata {
          dimensions
        }
      },
      alt
    },
    publishedAt,
    region-> {
      title,
      slug
    },
    tags[]-> {
      title,
      slug
    }
  }
`;
```

### Step 2: Create Author Page

Create `/src/app/author/[slug]/page.tsx`:

```typescript
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import Header from '@/components/layout/Header';
import { Footer } from '@/components/section/Footer';
import { ArticleCard } from '@/components/article/ArticleCard';
import { client } from '@/sanity/client';
import { authorBySlugQuery, authorArticlesQuery } from '@/sanity/queries';
import { Twitter, Linkedin, Mail } from 'lucide-react';

interface AuthorPageProps {
  params: { slug: string };
}

export async function generateMetadata({ params }: AuthorPageProps): Promise<Metadata> {
  const { slug } = await params;
  const author = await client.fetch(authorBySlugQuery, { slug });

  if (!author) {
    return {
      title: 'Author Not Found',
    };
  }

  return {
    title: `${author.name} - Journalist at Conflict Wire`,
    description: author.bio || `Articles by ${author.name}`,
  };
}

export default async function AuthorPage({ params }: AuthorPageProps) {
  const { slug } = await params;
  
  const [author, articles] = await Promise.all([
    client.fetch(authorBySlugQuery, { slug }),
    client.fetch(authorArticlesQuery, { authorSlug: slug }),
  ]);

  if (!author) {
    notFound();
  }

  return (
    <>
      <Header />
      <main className="min-h-screen bg-white">
        {/* Author Hero */}
        <div className="bg-gradient-to-r from-red-50 to-gray-50 py-16">
          <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row items-center gap-8 max-w-4xl mx-auto">
              {/* Author Image */}
              {author.image?.asset?.url && (
                <div className="flex-shrink-0">
                  <Image
                    src={author.image.asset.url}
                    alt={author.image.alt || author.name}
                    width={200}
                    height={200}
                    className="rounded-full object-cover border-4 border-white shadow-lg"
                  />
                </div>
              )}

              {/* Author Info */}
              <div className="flex-1 text-center md:text-left">
                <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                  {author.name}
                </h1>
                {author.bio && (
                  <p className="text-lg text-gray-700 mb-6 leading-relaxed">
                    {author.bio}
                  </p>
                )}

                {/* Social Links */}
                {author.social && (
                  <div className="flex gap-4 justify-center md:justify-start">
                    {author.social.twitter && (
                      <a
                        href={`https://twitter.com/${author.social.twitter}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 hover:bg-white rounded-full transition-colors"
                        aria-label="Twitter"
                      >
                        <Twitter className="w-5 h-5 text-gray-700" />
                      </a>
                    )}
                    {author.social.linkedin && (
                      <a
                        href={author.social.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 hover:bg-white rounded-full transition-colors"
                        aria-label="LinkedIn"
                      >
                        <Linkedin className="w-5 h-5 text-gray-700" />
                      </a>
                    )}
                    {author.social.email && (
                      <a
                        href={`mailto:${author.social.email}`}
                        className="p-2 hover:bg-white rounded-full transition-colors"
                        aria-label="Email"
                      >
                        <Mail className="w-5 h-5 text-gray-700" />
                      </a>
                    )}
                  </div>
                )}

                {/* Article Count */}
                <p className="text-sm text-gray-600 mt-4">
                  {articles.length} {articles.length === 1 ? 'Article' : 'Articles'} Published
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Articles Grid */}
        <div className="container mx-auto px-4 py-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">
            Articles by {author.name}
          </h2>

          {articles.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {articles.map((article: any) => (
                <ArticleCard key={article.slug.current} article={article} />
              ))}
            </div>
          ) : (
            <p className="text-center text-gray-600 py-12">
              No articles yet.
            </p>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}
```

### Step 3: Make Author Names Clickable

Update author display in articles to link to author pages:

```typescript
// In your article components, change author name from:
<p className="text-gray-700">{article.author.name}</p>

// To:
<Link
  href={`/author/${article.author.slug.current}`}
  className="text-gray-700 hover:text-red-600 transition-colors"
>
  {article.author.name}
</Link>
```

---

## 📊 Quick Win: Reading Time Estimator

Create `/src/components/article/ReadingTime.tsx`:

```typescript
import { Clock } from 'lucide-react';

interface ReadingTimeProps {
  text: string; // Article body text
  wordsPerMinute?: number;
}

export function ReadingTime({ text, wordsPerMinute = 200 }: ReadingTimeProps) {
  // Calculate word count
  const wordCount = text.trim().split(/\s+/).length;
  
  // Calculate reading time in minutes
  const readingTime = Math.ceil(wordCount / wordsPerMinute);

  return (
    <div className="flex items-center gap-1 text-sm text-gray-600">
      <Clock className="w-4 h-4" />
      <span>{readingTime} min read</span>
    </div>
  );
}
```

Usage in article cards:

```typescript
<ReadingTime text={article.excerpt || ''} />
```

---

## 🔗 Quick Win: Social Share Buttons

Create `/src/components/article/ShareButtons.tsx`:

```typescript
'use client';

import { Facebook, Twitter, Linkedin, Mail, Link as LinkIcon } from 'lucide-react';
import { useState } from 'react';

interface ShareButtonsProps {
  url: string;
  title: string;
  description?: string;
}

export function ShareButtons({ url, title, description }: ShareButtonsProps) {
  const [copied, setCopied] = useState(false);

  const shareLinks = {
    twitter: `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`,
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
    linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`,
    email: `mailto:?subject=${encodeURIComponent(title)}&body=${encodeURIComponent(description || '')}%0A%0A${encodeURIComponent(url)}`,
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  return (
    <div className="flex items-center gap-2">
      <span className="text-sm text-gray-600 font-medium">Share:</span>
      
      <a
        href={shareLinks.twitter}
        target="_blank"
        rel="noopener noreferrer"
        className="p-2 hover:bg-gray-100 rounded-full transition-colors"
        aria-label="Share on Twitter"
      >
        <Twitter className="w-5 h-5 text-gray-700" />
      </a>

      <a
        href={shareLinks.facebook}
        target="_blank"
        rel="noopener noreferrer"
        className="p-2 hover:bg-gray-100 rounded-full transition-colors"
        aria-label="Share on Facebook"
      >
        <Facebook className="w-5 h-5 text-gray-700" />
      </a>

      <a
        href={shareLinks.linkedin}
        target="_blank"
        rel="noopener noreferrer"
        className="p-2 hover:bg-gray-100 rounded-full transition-colors"
        aria-label="Share on LinkedIn"
      >
        <Linkedin className="w-5 h-5 text-gray-700" />
      </a>

      <a
        href={shareLinks.email}
        className="p-2 hover:bg-gray-100 rounded-full transition-colors"
        aria-label="Share via Email"
      >
        <Mail className="w-5 h-5 text-gray-700" />
      </a>

      <button
        onClick={copyToClipboard}
        className="p-2 hover:bg-gray-100 rounded-full transition-colors relative"
        aria-label="Copy link"
      >
        <LinkIcon className="w-5 h-5 text-gray-700" />
        {copied && (
          <span className="absolute -top-8 left-1/2 -translate-x-1/2 bg-gray-900 text-white text-xs px-2 py-1 rounded whitespace-nowrap">
            Copied!
          </span>
        )}
      </button>
    </div>
  );
}
```

---

## ✅ Testing Checklist

After implementing each feature:

### Search Testing
- [ ] Search with valid terms returns results
- [ ] Search with < 2 characters shows error
- [ ] Empty search handled gracefully
- [ ] Mobile search UI works properly
- [ ] Search results page is SEO-friendly
- [ ] Back button works from search results

### Author Pages Testing
- [ ] All author pages load correctly
- [ ] Author images display properly
- [ ] Author articles grid works
- [ ] Social links open correctly
- [ ] Mobile responsive layout
- [ ] Clicking author name navigates to profile

### Component Testing
- [ ] Reading time calculates correctly
- [ ] Share buttons work on all platforms
- [ ] Copy link shows success message
- [ ] All icons render properly

---

## 🚀 Deployment

After implementing features:

```bash
# 1. Test locally
npm run build
npm run start

# 2. Commit changes
git add .
git commit -m "feat: add search and author pages"

# 3. Push to GitHub
git push origin main

# 4. Vercel will auto-deploy
# Monitor at: https://vercel.com/dashboard
```

---

## 📚 Next Steps

Once Week 1 features are complete:
1. Review the Phase 2 Roadmap
2. Start Week 3 tasks (Comments & Newsletter)
3. Monitor analytics for search usage
4. Gather user feedback

---

**Happy Coding! 🎉**

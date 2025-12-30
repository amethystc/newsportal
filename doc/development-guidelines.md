# 📋 Development Guidelines

> **Context-Aware AI Agent Documentation** - Complete coding standards, best practices, and development workflow for Conflict News Portal.

## 🎯 **Development Philosophy**

### **Core Principles**
- **Code Quality First**: Clean, maintainable, and readable code
- **Type Safety**: Comprehensive TypeScript usage
- **Performance**: Optimized for user experience and Core Web Vitals
- **Accessibility**: WCAG 2.1 AA compliance
- **SEO Excellence**: Search engine optimization at every level
- **Mobile First**: Responsive design with mobile priority

---

## 🛠️ **Coding Standards**

### **1. TypeScript Guidelines**

#### **Type Safety**
```typescript
// ✅ Good: Explicit typing
interface ArticleProps {
  article: Article;
  onReadMore?: (slug: string) => void;
}

export function ArticleCard({ article, onReadMore }: ArticleProps) {
  // Component implementation
}

// ✅ Good: Utility types for common patterns
type ApiResult<T> = {
  success: boolean;
  data?: T;
  error?: string;
};

// ❌ Avoid: 'any' type
function processData(data: any) { /* ... */ }

// ✅ Better: Use unknown with type guards
function processData(data: unknown) {
  if (!isValidData(data)) {
    throw new Error('Invalid data');
  }
  // Now TypeScript knows the shape
}
```

#### **Interface Naming Conventions**
```typescript
// Component Props: PascalCase + 'Props' suffix
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary';
  size?: 'sm' | 'md' | 'lg';
}

// API Types: Descriptive names
interface ArticleResponse {
  success: boolean;
  data: Article[];
}

// Sanity Types: Direct mapping to schema
interface SanityArticle {
  _type: 'article';
  title: string;
  slug: { current: string };
}
```

---

### **2. React Component Guidelines**

#### **Component Structure**
```typescript
// ✅ Good: Clear component organization
import React, { useState, useEffect, useCallback } from 'react';
import { Article } from '@/types';
import { formatDate } from '@/lib/utils';

interface ArticleCardProps {
  article: Article;
  onRead?: (slug: string) => void;
  className?: string;
}

export function ArticleCard({ article, onRead, className }: ArticleCardProps) {
  // 1. State hooks
  const [isHovered, setIsHovered] = useState(false);
  
  // 2. Effect hooks
  useEffect(() => {
    // Side effects here
  }, []);
  
  // 3. Memoized callbacks
  const handleClick = useCallback(() => {
    if (onRead) {
      onRead(article.slug.current);
    }
  }, [onRead, article.slug.current]);
  
  // 4. Computed values
  const formattedDate = formatDate(article.publishedAt);
  
  // 5. Render
  return (
    <article 
      className={className}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={handleClick}
    >
      <h2>{article.title}</h2>
      <time dateTime={article.publishedAt}>{formattedDate}</time>
      <p>By {article.author.name}</p>
    </article>
  );
}
```

#### **Custom Hooks**
```typescript
// ✅ Good: Reusable logic extraction
import { useState, useEffect } from 'react';
import { Article } from '@/types';

interface UseBreakingNewsOptions {
  refreshInterval?: number;
  enabled?: boolean;
}

export function useBreakingNews(options: UseBreakingNewsOptions = {}) {
  const { refreshInterval = 30000, enabled = true } = options;
  const [news, setNews] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!enabled) return;

    const fetchNews = async () => {
      try {
        setLoading(true);
        const response = await fetch('/api/news/breaking');
        const data = await response.json();
        if (data.success) {
          setNews(data.data);
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Unknown error');
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
    const interval = setInterval(fetchNews, refreshInterval);
    return () => clearInterval(interval);
  }, [refreshInterval, enabled]);

  return { news, loading, error };
}
```

---

### **3. Styling Guidelines**

#### **Tailwind CSS Patterns**
```typescript
// ✅ Good: Responsive, semantic classes
<div className="w-full px-4 py-6 md:px-6 lg:px-8">
  <h2 className="text-xl font-bold text-gray-900 mb-4">
    Article Title
  </h2>
  <p className="text-gray-600 leading-relaxed">
    Article content with proper spacing and readability
  </p>
</div>

// ✅ Good: Component variants with class-variance-authority
import { cva } from 'class-variance-authority';

const buttonVariants = cva(
  'inline-flex items-center justify-center rounded-md font-medium transition-colors',
  {
    variants: {
      variant: {
        default: 'bg-blue-600 text-white hover:bg-blue-700',
        destructive: 'bg-red-600 text-white hover:bg-red-700',
        outline: 'border border-gray-300 bg-white hover:bg-gray-50',
      },
      size: {
        sm: 'h-9 px-3 text-sm',
        md: 'h-10 px-4',
        lg: 'h-11 px-8',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'md',
    },
  }
);
```

#### **CSS-in-JS for Dynamic Styles**
```typescript
// ✅ Good: Dynamic styles with Tailwind + inline styles
<div 
  className="relative overflow-hidden rounded-lg"
  style={{
    height: `${aspectRatio * 100}%`,
    backgroundColor: dominantColor,
  }}
>
  <Image 
    src={imageUrl}
    alt={alt}
    fill
    className="object-cover"
  />
</div>
```

---

## 🏗️ **Project Structure Guidelines**

### **1. File Organization**
```typescript
// ✅ Good: Feature-based organization
src/components/article/
├── ArticleCard.tsx          # Main component
├── ArticleCard.test.tsx     # Tests
├── ArticleCard.stories.tsx  # Storybook stories
└── index.ts                 # Barrel exports

// ✅ Good: Consistent export patterns
// src/components/article/index.ts
export { ArticleCard } from './ArticleCard';
export { ArticleHeader } from './ArticleHeader';
export { ArticleMetadata } from './ArticleMetadata';

// Usage
import { ArticleCard, ArticleHeader } from '@/components/article';
```

### **2. Import/Export Patterns**
```typescript
// ✅ Good: Explicit imports
import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Article } from '@/types';
import { formatDate } from '@/lib/utils';
import { Button } from '@/components/ui/button';

// ✅ Good: Barrel exports for clean imports
// src/lib/utils/index.ts
export { formatDate } from './date';
export { truncateText } from './text';
export { generateSlug } from './url';

// Usage
import { formatDate, truncateText, generateSlug } from '@/lib/utils';
```

---

## 🚀 **Performance Guidelines**

### **1. Code Splitting**
```typescript
// ✅ Good: Dynamic imports for heavy components
import dynamic from 'next/dynamic';

const EditorChoise = dynamic(() => import('@/components/section/EditorChoise'), {
  loading: () => <div className="h-64 bg-gray-200 animate-pulse" />,
  ssr: false // Client-side only for interactive components
});

// ✅ Good: Route-based code splitting is automatic in Next.js
// Pages are automatically split into separate bundles
```

### **2. Image Optimization**
```typescript
// ✅ Good: Next.js Image with optimization
function ArticleImage({ article }: { article: Article }) {
  const { mainImage } = article;
  
  if (!mainImage) return null;
  
  return (
    <div className="relative aspect-video">
      <Image
        src={mainImage.asset.url}
        alt={mainImage.alt || article.title}
        fill
        priority // For above-the-fold images
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        className="object-cover rounded-lg"
        placeholder={mainImage.asset.metadata.lqip ? 'blur' : 'empty'}
        blurDataURL={mainImage.asset.metadata.lqip}
      />
    </div>
  );
}
```

### **3. State Management Optimization**
```typescript
// ✅ Good: useMemo for expensive calculations
import { useMemo } from 'react';

function ArticleList({ articles, searchTerm }: { 
  articles: Article[]; 
  searchTerm: string; 
}) {
  const filteredArticles = useMemo(() => {
    if (!searchTerm) return articles;
    
    return articles.filter(article =>
      article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      article.excerpt.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [articles, searchTerm]);

  return (
    <div>
      {filteredArticles.map(article => (
        <ArticleCard key={article.slug.current} article={article} />
      ))}
    </div>
  );
}
```

---

## 🔍 **SEO Guidelines**

### **1. Metadata Implementation**
```typescript
// ✅ Good: Comprehensive metadata
import { Metadata } from 'next';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const article = await getArticleBySlug(slug);
  
  if (!article) {
    return {
      title: 'Article Not Found',
      description: 'The article you are looking for does not exist.',
    };
  }

  return {
    title: `${article.title} - Conflict News Portal`,
    description: article.excerpt,
    keywords: article.tags.map(tag => tag.title).join(', '),
    authors: [{ name: article.author.name }],
    openGraph: {
      title: article.title,
      description: article.excerpt,
      type: 'article',
      publishedTime: article.publishedAt,
      authors: [article.author.name],
      images: article.mainImage?.asset?.url ? [{
        url: article.mainImage.asset.url,
        width: article.mainImage.asset.metadata.dimensions.width,
        height: article.mainImage.asset.metadata.dimensions.height,
        alt: article.mainImage.alt || article.title,
      }] : [],
    },
    twitter: {
      card: 'summary_large_image',
      title: article.title,
      description: article.excerpt,
      images: article.mainImage?.asset?.url ? [article.mainImage.asset.url] : [],
    },
  };
}
```

### **2. Structured Data**
```typescript
// ✅ Good: JSON-LD structured data
function ArticleStructuredData({ article }: { article: Article }) {
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'NewsArticle',
    headline: article.title,
    description: article.excerpt,
    image: article.mainImage?.asset?.url,
    datePublished: article.publishedAt,
    dateModified: article.publishedAt,
    author: {
      '@type': 'Person',
      name: article.author.name,
      url: `${process.env.NEXT_PUBLIC_BASE_URL}/author/${article.author.slug.current}`,
    },
    publisher: {
      '@type': 'Organization',
      name: 'Conflict News Portal',
      logo: {
        '@type': 'ImageObject',
        url: `${process.env.NEXT_PUBLIC_BASE_URL}/logo.png`,
      },
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `${process.env.NEXT_PUBLIC_BASE_URL}/article/${article.slug.current}`,
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  );
}
```

---

## ♿ **Accessibility Guidelines**

### **1. Semantic HTML**
```typescript
// ✅ Good: Semantic structure with ARIA labels
function Article({ article }: { article: Article }) {
  return (
    <article aria-labelledby="article-title">
      <header>
        <h1 id="article-title">{article.title}</h1>
        <div className="article-meta">
          <time dateTime={article.publishedAt}>
            {formatDate(article.publishedAt)}
          </time>
          <address className="author">
            By <span>{article.author.name}</span>
          </address>
        </div>
      </header>
      
      {article.mainImage && (
        <figure>
          <Image
            src={article.mainImage.asset.url}
            alt={article.mainImage.alt || ''}
            className="article-image"
          />
          {article.mainImage.caption && (
            <figcaption>{article.mainImage.caption}</figcaption>
          )}
        </figure>
      )}
      
      <div className="article-content">
        <PortableText value={article.body} />
      </div>
    </article>
  );
}
```

### **2. Keyboard Navigation**
```typescript
// ✅ Good: Keyboard-accessible navigation
function NavigationMenu({ items }: { items: NavItem[] }) {
  return (
    <nav role="navigation" aria-label="Main navigation">
      <ul>
        {items.map((item) => (
          <li key={item.slug}>
            <Link
              href={item.href}
              className="nav-link"
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  window.location.href = item.href;
                }
              }}
            >
              {item.title}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
```

---

## 🧪 **Testing Guidelines**

### **1. Unit Testing**
```typescript
// ✅ Good: Comprehensive component testing
import { render, screen, fireEvent } from '@testing-library/react';
import { ArticleCard } from './ArticleCard';
import { mockArticle } from '@/__mocks__/article';

describe('ArticleCard', () => {
  it('renders article information correctly', () => {
    render(<ArticleCard article={mockArticle} />);
    
    expect(screen.getByText(mockArticle.title)).toBeInTheDocument();
    expect(screen.getByText(mockArticle.author.name)).toBeInTheDocument();
    expect(screen.getByText(mockArticle.excerpt)).toBeInTheDocument();
  });

  it('calls onRead when clicked', () => {
    const onRead = jest.fn();
    render(<ArticleCard article={mockArticle} onRead={onRead} />);
    
    fireEvent.click(screen.getByRole('article'));
    expect(onRead).toHaveBeenCalledWith(mockArticle.slug.current);
  });

  it('applies custom className', () => {
    const { container } = render(
      <ArticleCard article={mockArticle} className="custom-class" />
    );
    
    expect(container.firstChild).toHaveClass('custom-class');
  });
});
```

### **2. Integration Testing**
```typescript
// ✅ Good: API route testing
import { createMocks } from 'node-mocks-http';
import { GET } from '@/app/api/news/route';

describe('/api/news', () => {
  it('returns news data successfully', async () => {
    const { req } = createMocks({ method: 'GET' });
    
    const response = await GET(req);
    const data = await response.json();
    
    expect(response.status).toBe(200);
    expect(data.success).toBe(true);
    expect(data.data).toHaveProperty('hero');
    expect(data.data).toHaveProperty('editoChoice');
  });

  it('handles errors gracefully', async () => {
    // Mock Sanity client to throw error
    jest.mock('@/sanity/client', () => ({
      fetch: jest.fn().mockRejectedValue(new Error('Sanity error'))
    }));

    const { req } = createMocks({ method: 'GET' });
    const response = await GET(req);
    const data = await response.json();
    
    expect(response.status).toBe(500);
    expect(data.success).toBe(false);
  });
});
```

---

## 📦 **Build & Deployment Guidelines**

### **1. Environment Configuration**
```typescript
// ✅ Good: Environment variable validation
const envSchema = z.object({
  NEXT_PUBLIC_SANITY_PROJECT_ID: z.string().min(1),
  NEXT_PUBLIC_SANITY_DATASET: z.string().min(1),
  NEXT_PUBLIC_SANITY_API_VERSION: z.string().min(1),
  NEXT_PUBLIC_BASE_URL: z.string().url(),
});

function validateEnv() {
  try {
    envSchema.parse(process.env);
  } catch (error) {
    console.error('Invalid environment variables:', error);
    process.exit(1);
  }
}

validateEnv();
```

### **2. Build Optimization**
```typescript
// ✅ Good: next.config.ts optimizations
const nextConfig: NextConfig = {
  // Image optimization
  images: {
    remotePatterns: [{
      protocol: 'https',
      hostname: 'cdn.sanity.io',
      pathname: '/images/**',
    }],
    formats: ['image/webp', 'image/avif'],
  },

  // Performance optimizations
  reactCompiler: true,
  poweredByHeader: false,
  compress: true,

  // Package optimization
  experimental: {
    optimizePackageImports: [
      'lucide-react',
      '@portabletext/react',
    ],
  },

  // Conditional optimizations
  ...(process.env.NODE_ENV === 'production' && {
    compiler: {
      removeConsole: true,
    },
  }),
};
```

---

## 🔧 **Development Workflow**

### **1. Git Workflow**
```bash
# Feature branch naming
feature/article-detail-page
bugfix/header-navigation-issue
hotfix/critical-security-patch

# Commit message format
feat: add article detail page component
fix: resolve mobile navigation overflow
docs: update API documentation
refactor: optimize image loading performance
test: add unit tests for article components
```

### **2. Code Review Checklist**
- [ ] TypeScript types are correctly defined
- [ ] Components are properly typed
- [ ] Accessibility guidelines are followed
- [ ] SEO metadata is implemented
- [ ] Performance optimizations are in place
- [ ] Tests are written and passing
- [ ] Documentation is updated
- [ ] Responsive design is tested
- [ ] Error handling is implemented

---

## 📚 **Learning Resources**

### **Required Reading**
- [Next.js Documentation](https://nextjs.org/docs)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [Sanity CMS Documentation](https://www.sanity.io/docs)
- [React Accessibility Guide](https://react.dev/learn/accessibility)

### **Best Practices**
- [Web.dev Core Web Vitals](https://web.dev/vitals/)
- [Google SEO Starter Guide](https://developers.google.com/search/docs/fundamentals/seo-starter-guide)
- [WCAG 2.1 Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)

---

**💡 AI Agent Note**: Follow these guidelines consistently to maintain code quality, performance, and developer experience. When in doubt, prioritize type safety and user experience.
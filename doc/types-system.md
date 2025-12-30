# 📝 Type System Documentation

> **Context-Aware AI Agent Documentation** - Complete TypeScript interface definitions, type safety patterns, and data transformation mapping.

## 🏛️ **Type System Overview**

### **Design Principles**
- **Type Safety**: Comprehensive coverage of all data structures
- **Developer Experience**: IntelliSense support and error prevention
- **Maintainability**: Clear, documented type definitions
- **Extensibility**: Easy to extend with new properties
- **Sanity Integration**: Direct mapping from Sanity schemas

### **Type Organization**
```
src/types/
└── 📄 index.ts              # Central type definitions
```

---

## 🔧 **Core Type Definitions**

### **1. Asset & Image Types**

#### **Sanity Asset Reference**
```typescript
export interface SanityAsset {
  _ref: string;              // Sanity reference string
  _type: "reference";        // Type discriminator
}
```

**Purpose**: Reference to Sanity CMS assets
**Usage**: Image references, file references in Sanity schemas

#### **Sanity Image Asset**
```typescript
export interface SanityImageAsset {
  url: string;               // CDN URL of the image
  altText?: string;          // Alt text for accessibility
  metadata: {
    dimensions: {
      width: number;          // Image width in pixels
      height: number;         // Image height in pixels
      aspectRatio: number;    // Width/height ratio
    };
    lqip?: string;            // Low Quality Image Placeholder (base64)
    palette?: {               // Color palette extracted from image
      dominant: {
        background: string;   // Dominant background color
        foreground: string;   // Dominant foreground color
      };
    };
  };
}
```

**Purpose**: Complete image metadata from Sanity
**Features**:
- Dimension information for responsive images
- LQIP for progressive loading
- Color palette for UI theming
- Alt text for accessibility

---

### **2. Content Types**

#### **Author Type**
```typescript
export interface Author {
  name: string;              // Display name of the author
  slug: {
    current: string;         // URL-friendly identifier
    _type: "slug";          // Type discriminator
  };
  image?: {                  // Optional author photo
    asset: SanityImageAsset;
    alt?: string;           // Alt text for author image
  };
  bio?: string;              // Professional biography
}
```

**Usage Examples**:
```typescript
// In article component
const ArticleHeader = ({ article }: { article: Article }) => (
  <div>
    <h1>{article.title}</h1>
    <p>By {article.author.name}</p>
    {article.author.bio && <p>{article.author.bio}</p>}
  </div>
);

// Type-safe slug usage
const authorUrl = `/author/${article.author.slug.current}`;
```

#### **Region Type**
```typescript
export interface Region {
  title: string;             // Region display name
  slug: {
    current: string;         // URL-friendly identifier
    _type: "slug";
  };
  description?: string;      // Region description for SEO
}
```

**Purpose**: Geographic categorization of content
**Examples**: "Middle East", "Asia Pacific", "Europe"

#### **Tag Type**
```typescript
export interface Tag {
  title: string;             // Tag display name
  slug: {
    current: string;         // URL-friendly identifier
    _type: "slug";
  };
  description?: string;      // Tag description for SEO
}
```

**Purpose**: Topic-based categorization
**Examples**: "Conflict", "Humanitarian", "Trade", "Geopolitics", "Space"

---

### **3. Article Types**

#### **Main Image Type**
```typescript
export interface MainImage {
  asset: SanityImageAsset;    // Complete image asset data
  alt?: string;              // Alt text for accessibility
  caption?: string;           // Image caption/credit
}
```

#### **Complete Article Type**
```typescript
export interface Article {
  title: string;             // Article headline
  slug: {
    current: string;         // URL identifier
    _type: "slug";
  };
  excerpt: string;           // Article summary/preview
  mainImage?: MainImage;     // Optional featured image
  author: Author;            // Article author (required)
  publishedAt: string;       // ISO publication timestamp
  region: Region;            // Geographic region (required)
  tags: Tag[];               // Topic tags array
  body?: any[];              // Portable Text rich content
  featured?: boolean;        // Editor's selection flag
  estimatedReadTime?: number; // Calculated reading time in minutes
  relatedArticles?: Article[]; // Related content
}
```

**Key Properties Explained**:
- `publishedAt`: ISO string for consistent date handling
- `body`: Portable Text array from Sanity rich text editor
- `estimatedReadTime`: Calculated as `wordCount / 180` (average reading speed)
- `relatedArticles`: Auto-generated based on region and tag overlap

---

## 🌐 **API Response Types**

### **News Response Type**
```typescript
export interface NewsResponse {
  message: string;           // Response message
  success: boolean;          // Operation success flag
  data: {
    hero: Article[];         // Latest 9 articles
    editoChoice: Article[];  // Featured articles
    spaces: Article[];       // Space category articles
    geopolitics: Article[];   // Geopolitics category articles
    trade: Article[];        // Trade category articles
    humanitarian: Article[];  // Humanitarian category articles
    conflict: Article[];      // Conflict category articles
    regionSpotlight: Article[]; // Regional spotlight articles
  };
}
```

**Usage in API Routes**:
```typescript
// src/app/api/news/route.ts
export async function GET(): Promise<Response> {
  try {
    const [hero, editoChoice, spaces, geopolitics, trade, humanitarian, conflict, regionSpotlight] = await Promise.all([
      client.fetch(heroQuery),
      client.fetch(EditoChoiceQuery),
      client.fetch(spacesQuery, { tag: "Space" }),
      // ... other queries
    ]);

    const response: NewsResponse = {
      message: "Success Get News Homepage",
      success: true,
      data: { hero, editoChoice, spaces, geopolitics, trade, humanitarian, conflict, regionSpotlight }
    };

    return Response.json(response);
  } catch (err) {
    const errorResponse: ErrorResponse = {
      message: "Error fetching news data",
      success: false,
      error: err instanceof Error ? err.message : "Unknown error"
    };
    return Response.json(errorResponse, { status: 500 });
  }
}
```

### **Error Response Type**
```typescript
export interface ErrorResponse {
  message: string;           // Error message
  success: false;            // Always false for errors
  error: string | Record<string, unknown>; // Error details
}
```

### **Homepage Data Type**
```typescript
export interface HomepageData {
  hero: Article[];           // Same structure as NewsResponse.data
  editoChoice: Article[];
  spaces: Article[];
  geopolitics: Article[];
  trade: Article[];
  humanitarian: Article[];
  conflict: Article[];
  regionSpotlight: Article[];
}
```

**Purpose**: Type for frontend data consumption
**Usage**: In page components consuming API data

---

## 🔄 **Type Transformation Patterns**

### **1. Sanity to Frontend Mapping**

#### **Slug Type Transformation**
```typescript
// Sanity response
sanityResponse: {
  slug: { current: "article-title", _type: "slug" }
}

// Frontend usage
const articleUrl = `/article/${sanityResponse.slug.current}`;

// Type helper function
function getSlugUrl(slug: { current: string }): string {
  return `/article/${slug.current}`;
}
```

#### **Date Handling**
```typescript
// ISO string from Sanity/API
const publishedAt: string = "2025-01-08T10:00:00Z";

// Type-safe date formatting
function formatDate(dateString: string): string {
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
}

// Usage in components
const formattedDate = formatDate(article.publishedAt);
// Returns: "January 8, 2025"
```

#### **Image URL Processing**
```typescript
// Sanity image asset
const imageAsset: SanityImageAsset = {
  url: "https://cdn.sanity.io/images/...",
  metadata: {
    dimensions: { width: 1200, height: 800, aspectRatio: 1.5 }
  }
};

// Type-safe image component
interface OptimizedImageProps {
  image: SanityImageAsset;
  alt?: string;
  priority?: boolean;
}

function OptimizedImage({ image, alt, priority }: OptimizedImageProps) {
  return (
    <Image
      src={image.url}
      alt={alt || image.altText || ''}
      width={image.metadata.dimensions.width}
      height={image.metadata.dimensions.height}
      priority={priority}
      placeholder={image.metadata.lqip ? 'blur' : 'empty'}
      blurDataURL={image.metadata.lqip}
    />
  );
}
```

---

### **2. Generic Type Patterns**

#### **API Response Wrapper**
```typescript
interface ApiResponse<T = any> {
  success: boolean;
  message: string;
  data?: T;
  error?: string;
}

// Usage examples
type NewsApiResponse = ApiResponse<HomepageData>;
type ArticleApiResponse = ApiResponse<Article>;
type ErrorApiResponse = ApiResponse<never>; // No data on error
```

#### **Component Props Generics**
```typescript
interface ListComponentProps<T> {
  items: T[];
  renderItem: (item: T, index: number) => React.ReactNode;
  keyExtractor: (item: T) => string;
  loading?: boolean;
  error?: string;
}

// Usage with different data types
function ArticleList({ articles }: { articles: Article[] }) {
  return (
    <ListComponent
      items={articles}
      keyExtractor={(article) => article.slug.current}
      renderItem={(article) => <ArticleCard article={article} />}
    />
  );
}
```

---

## 🛡️ **Type Safety Patterns**

### **1. Discriminated Unions**
```typescript
// Different article states
type ArticleState = 
  | { status: 'loading' }
  | { status: 'success'; data: Article }
  | { status: 'error'; error: string };

// Type-safe state handling
function ArticleComponent({ state }: { state: ArticleState }) {
  switch (state.status) {
    case 'loading':
      return <div>Loading...</div>;
    case 'success':
      return <ArticleView article={state.data} />;
    case 'error':
      return <div>Error: {state.error}</div>;
    // No default needed - TypeScript ensures exhaustiveness
  }
}
```

### **2. Type Guards**
```typescript
// Type guard for article validation
function isArticle(obj: any): obj is Article {
  return (
    typeof obj === 'object' &&
    obj !== null &&
    typeof obj.title === 'string' &&
    typeof obj.slug === 'object' &&
    typeof obj.slug.current === 'string' &&
    typeof obj.author === 'object' &&
    typeof obj.author.name === 'string'
  );
}

// Usage in API processing
function processApiResponse(data: unknown): Article[] {
  if (!Array.isArray(data)) {
    throw new Error('Expected array of articles');
  }
  
  return data.filter(isArticle); // Type-safe filtering
}
```

### **3. Branded Types**
```typescript
// Branded type for IDs
type ArticleId = string & { readonly __brand: 'ArticleId' };
type AuthorId = string & { readonly __brand: 'AuthorId' };

// Type-safe ID creation
function createArticleId(id: string): ArticleId {
  return id as ArticleId;
}

function createAuthorId(id: string): AuthorId {
  return id as AuthorId;
}

// Prevents mixing IDs
function getArticle(articleId: ArticleId): Promise<Article> {
  // Cannot accidentally pass AuthorId
  return fetch(`/api/articles/${articleId}`);
}
```

---

## 🔧 **Utility Types**

### **1. Partial Updates**
```typescript
// For API PATCH operations
type UpdateArticle = Partial<Pick<Article, 
  'title' | 'excerpt' | 'mainImage' | 'tags'
>> & { id: string };

// Usage
const updateData: UpdateArticle = {
  id: 'article-123',
  title: 'Updated Title',
  excerpt: 'Updated excerpt'
};
```

### **2. Selective Fields**
```typescript
// Article summary type (minimal fields)
type ArticleSummary = Pick<Article, 
  'title' | 'slug' | 'excerpt' | 'author' | 'publishedAt'
>;

// Article detail type (all fields)
type ArticleDetail = Article;

// Usage in different contexts
function ArticleCard({ article }: { article: ArticleSummary }) {
  return (
    <div>
      <h2>{article.title}</h2>
      <p>By {article.author.name}</p>
    </div>
  );
}
```

### **3. Required Fields**
```typescript
// Ensure required fields for creation
type CreateArticleData = Required<Pick<Article,
  'title' | 'excerpt' | 'author' | 'region' | 'tags'
>> & {
  body: PortableText[]; // Make body required for creation
};

// Usage in form validation
function validateArticle(data: unknown): data is CreateArticleData {
  const required = ['title', 'excerpt', 'author', 'region', 'tags', 'body'];
  return required.every(field => field in data);
}
```

---

## 🧪 **Type Testing Patterns**

### **1. Runtime Type Validation**
```typescript
import { z } from 'zod';

// Zod schema matching TypeScript types
const ArticleSchema = z.object({
  title: z.string(),
  slug: z.object({
    current: z.string(),
    _type: z.literal('slug')
  }),
  excerpt: z.string(),
  author: z.object({
    name: z.string(),
    slug: z.object({
      current: z.string(),
      _type: z.literal('slug')
    })
  }),
  publishedAt: z.string(),
  // ... other fields
});

// Runtime validation
function validateArticle(data: unknown): Article {
  const result = ArticleSchema.parse(data);
  return result as Article; // Safe to cast after validation
}
```

### **2. Type Assertion Functions**
```typescript
// Assert function for type narrowing
function assertIsArticle(data: unknown): asserts data is Article {
  if (
    typeof data !== 'object' ||
    data === null ||
    !('title' in data) ||
    typeof data.title !== 'string'
  ) {
    throw new Error('Invalid article data');
  }
}

// Usage
function processUnknownData(data: unknown) {
  assertIsArticle(data);
  // data is now typed as Article
  console.log(data.title); // TypeScript knows this is string
}
```

---

## 📊 **Performance Optimizations**

### **1. Lazy Type Loading**
```typescript
// Split types by feature
type ArticleTypes = import('./article-types').Article;
type AuthorTypes = import('./author-types').Author;

// Dynamic imports for large type definitions
async function loadArticleTypes() {
  const types = await import('./article-types');
  return types.Article;
}
```

### **2. Type Erasure for JSON**
```typescript
// Clean types for JSON serialization
type JsonArticle = {
  [K in keyof Article as Article[K] extends Function 
    ? never 
    : K
  ]: Article[K] extends Function 
    ? never 
    : Article[K];
};

// Usage for API responses
function toJsonArticle(article: Article): JsonArticle {
  return JSON.parse(JSON.stringify(article));
}
```

---

## 🔍 **Debugging Types**

### **1. Type Inspection**
```typescript
// Utility to inspect types during development
type DebugType<T> = T extends infer U 
  ? U extends object 
    ? { [K in keyof U]: DebugType<U[K]> }
    : U
  : never;

// Usage
type ArticleDebug = DebugType<Article>;
// Shows complete type structure in IDE
```

### **2. Conditional Types for Validation**
```typescript
// Validate that all required fields are present
type ValidateRequired<T, K extends keyof T> = 
  T extends Record<K, T[K]> ? T : never;

// Usage
type ValidatedArticle = ValidateRequired<Article, 'title' | 'author'>;
// Will error if title or author is optional
```

---

**💡 AI Agent Note**: This type system provides comprehensive type safety across the entire application. Always use these types when working with data to maintain consistency and prevent runtime errors.
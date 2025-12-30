# 🔌 API Endpoints Documentation

> **Context-Aware AI Agent Documentation** - Complete reference for all API routes, request/response patterns, and error handling.

## 🌐 **API Architecture Overview**

### **Design Principles**
- **RESTful Design**: Clean, intuitive endpoint structure
- **Type Safety**: Full TypeScript implementation
- **Error Handling**: Comprehensive error responses
- **Performance**: Optimized with caching strategies
- **Security**: Input validation and sanitization

### **Base URL**
```typescript
const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'
```

## 📍 **Available Endpoints**

### **1. GET /api/news**
**Purpose**: Fetch homepage data with all content sections
**Method**: `GET`
**Authentication**: None (public endpoint)

#### **Request**
```http
GET /api/news
```

#### **Response Structure**
```typescript
interface NewsResponse {
  message: string;
  success: boolean;
  data: {
    hero: Article[];           // Latest 9 articles for hero section
    editoChoice: Article[];    // Featured articles
    spaces: Article[];         // Space category articles
    geopolitics: Article[];     // Geopolitics category articles
    trade: Article[];          // Trade category articles
    humanitarian: Article[];    // Humanitarian category articles
    conflict: Article[];        // Conflict category articles
    regionSpotlight: Article[]; // Regional spotlight articles
  };
}
```

#### **Success Response (200)**
```json
{
  "message": "Success Get News Homepage",
  "success": true,
  "data": {
    "hero": [
      {
        "title": "Breaking: Major Conflict Develops",
        "slug": { "current": "breaking-conflict" },
        "excerpt": "Latest updates from the ground...",
        "mainImage": {
          "asset": {
            "url": "https://cdn.sanity.io/...",
            "metadata": {
              "dimensions": { "width": 1200, "height": 800 },
              "lqip": "data:image/jpeg;base64,..."
            }
          },
          "alt": "Conflict zone"
        },
        "author": {
          "name": "John Doe",
          "slug": { "current": "john-doe" }
        },
        "publishedAt": "2025-01-08T10:00:00Z",
        "region": { "title": "Middle East", "slug": { "current": "middle-east" } },
        "tags": [{ "title": "Conflict", "slug": { "current": "conflict" } }]
      }
    ],
    "editoChoice": [...],
    "spaces": [...],
    "geopolitics": [...],
    "trade": [...],
    "humanitarian": [...],
    "conflict": [...],
    "regionSpotlight": [...]
  }
}
```

#### **Error Response (500)**
```json
{
  "message": "Error fetching news data",
  "success": false,
  "error": "Sanity client configuration error"
}
```

#### **Implementation Details**
```typescript
// src/app/api/news/route.ts
export async function GET(): Promise<Response> {
  try {
    // Parallel fetching for better performance
    const [hero, editoChoice, spaces, geopolitics, trade, humanitarian, conflict, regionSpotlight] = await Promise.all([
      client.fetch(heroQuery),
      client.fetch(EditoChoiceQuery),
      client.fetch(spacesQuery, { tag: "Space" }),
      client.fetch(geopoliticsQuery, { tag: "Geopolitics" }),
      client.fetch(tradeQuery, { tag: "Trade" }),
      client.fetch(humanitarianQuery, { tag: "Humanitarian" }),
      client.fetch(conflictQuery, { tag: "Conflict" }),
      client.fetch(regionSpotlightQuery)
    ]);

    return Response.json({
      message: "Success Get News Homepage",
      success: true,
      data: { hero, editoChoice, spaces, geopolitics, trade, humanitarian, conflict, regionSpotlight }
    });

  } catch (err) {
    return Response.json({
      message: "Error fetching news data",
      success: false,
      error: err instanceof Error ? err.message : "Unknown error"
    }, { status: 500 });
  }
}
```

---

### **2. GET /api/articles/[slug]**
**Purpose**: Fetch individual article data by slug
**Method**: `GET`
**Authentication**: None (public endpoint)

#### **Request**
```http
GET /api/articles/breaking-conflict
```

#### **URL Parameters**
- `slug` (string): Article slug identifier

#### **Response Structure**
```typescript
interface ArticleResponse {
  success: boolean;
  data?: Article;               // Complete article data
  message?: string;              // Error message
}
```

#### **Success Response (200)**
```json
{
  "success": true,
  "data": {
    "title": "Breaking: Major Conflict Develops",
    "slug": { "current": "breaking-conflict" },
    "excerpt": "Comprehensive coverage of ongoing conflicts...",
    "mainImage": {
      "asset": {
        "url": "https://cdn.sanity.io/...",
        "metadata": {
          "dimensions": { "width": 1200, "height": 800 },
          "lqip": "data:image/jpeg;base64,...",
          "palette": {
            "dominant": { "background": "#1a1a1a", "foreground": "#ffffff" }
          }
        }
      },
      "alt": "Conflict zone",
      "caption": "Latest developments from the region"
    },
    "author": {
      "name": "John Doe",
      "slug": { "current": "john-doe" },
      "image": {
        "asset": { "url": "https://cdn.sanity.io/...", "altText": "John Doe" }
      },
      "bio": "Veteran conflict correspondent with 15 years experience..."
    },
    "publishedAt": "2025-01-08T10:00:00Z",
    "region": {
      "title": "Middle East",
      "slug": { "current": "middle-east" },
      "description": "Coverage of Middle Eastern conflicts and developments"
    },
    "tags": [
      { "title": "Conflict", "slug": { "current": "conflict" }, "description": "Conflict-related news" },
      { "title": "Humanitarian", "slug": { "current": "humanitarian" }, "description": "Humanitarian crisis coverage" }
    ],
    "body": [...],               // Portable Text array
    "featured": true,
    "estimatedReadTime": 5,
    "relatedArticles": [
      {
        "title": "Related Conflict Analysis",
        "slug": { "current": "related-analysis" },
        "excerpt": "In-depth analysis of related developments...",
        "mainImage": { ... },
        "author": { "name": "Jane Smith" },
        "publishedAt": "2025-01-07T15:30:00Z"
      }
    ]
  }
}
```

#### **Error Response (404)**
```json
{
  "success": false,
  "message": "Article not found"
}
```

#### **Error Response (400)**
```json
{
  "success": false,
  "message": "Slug parameter is required"
}
```

#### **Error Response (500)**
```json
{
  "success": false,
  "message": "Internal server error",
  "error": "Sanity query timeout"
}
```

#### **Implementation Details**
```typescript
// src/app/api/articles/[slug]/route.ts
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params;

    if (!slug) {
      return NextResponse.json(
        { success: false, message: "Slug parameter is required" },
        { status: 400 }
      );
    }

    const article = await client.fetch(articleQuery, { slug });

    if (!article) {
      return NextResponse.json(
        { success: false, message: "Article not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: article
    });

  } catch (error) {
    console.error("Error fetching article:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Internal server error",
        error: error instanceof Error ? error.message : "Unknown error"
      },
      { status: 500 }
    );
  }
}
```

---

## 🛡️ **Error Handling Patterns**

### **Standard Error Response Format**
```typescript
interface ErrorResponse {
  success: false;
  message: string;
  error?: string;
  details?: Record<string, unknown>;
}
```

### **HTTP Status Codes**
| Status | Usage | Description |
|--------|-------|-------------|
| `200` | Success | Request completed successfully |
| `400` | Bad Request | Invalid input parameters |
| `404` | Not Found | Resource not found |
| `429` | Too Many Requests | Rate limit exceeded |
| `500` | Internal Server | Unexpected server error |

### **Error Types**

#### **Validation Errors**
```typescript
// Missing required parameter
{
  "success": false,
  "message": "Slug parameter is required",
  "error": "VALIDATION_ERROR"
}
```

#### **Not Found Errors**
```typescript
// Resource doesn't exist
{
  "success": false,
  "message": "Article not found",
  "error": "NOT_FOUND"
}
```

#### **Server Errors**
```typescript
// Unexpected server issues
{
  "success": false,
  "message": "Internal server error",
  "error": "Sanity client configuration error"
}
```

## ⚡ **Performance Optimizations**

### **Caching Strategies**

#### **Next.js ISR (Incremental Static Regeneration)**
```typescript
// In API routes
const fetchOptions = {
  next: { revalidate: 300 } // Cache for 5 minutes
};

const result = await client.fetch(query, params, fetchOptions);
```

#### **Client-Side Caching**
```typescript
// In React components
const { data, error, isLoading } = useSWR(
  '/api/news',
  fetcher,
  {
    revalidateOnFocus: false,
    refreshInterval: 30000, // 30 seconds
    dedupingInterval: 10000  // 10 seconds
  }
);
```

### **Query Optimization**

#### **Parallel Requests**
```typescript
// ✅ Good: Parallel fetching
const [hero, featured, categories] = await Promise.all([
  client.fetch(heroQuery),
  client.fetch(featuredQuery),
  client.fetch(categoriesQuery)
]);

// ❌ Avoid: Sequential fetching
const hero = await client.fetch(heroQuery);
const featured = await client.fetch(featuredQuery);
const categories = await client.fetch(categoriesQuery);
```

#### **Projection Optimization**
```typescript
// ✅ Good: Selective field projection
const query = `
  *[_type == "article"] {
    title,
    slug,
    mainImage { asset -> { url, metadata { dimensions } } },
    author -> { name },
    publishedAt
  } | order(publishedAt desc) [0...10]
`;
```

## 🔍 **Monitoring & Debugging**

### **Request Logging**
```typescript
// Add request logging for debugging
export async function GET() {
  console.log('API: /api/news request received');
  const startTime = Date.now();
  
  try {
    const result = await fetchData();
    const duration = Date.now() - startTime;
    console.log(`API: /api/news completed in ${duration}ms`);
    return Response.json(result);
  } catch (error) {
    const duration = Date.now() - startTime;
    console.error(`API: /api/news failed after ${duration}ms:`, error);
    throw error;
  }
}
```

### **Error Tracking**
```typescript
// Enhanced error logging
function logApiError(endpoint: string, error: unknown, context?: Record<string, unknown>) {
  console.error(`API Error [${endpoint}]:`, {
    error: error instanceof Error ? error.message : 'Unknown error',
    stack: error instanceof Error ? error.stack : undefined,
    context,
    timestamp: new Date().toISOString()
  });
}
```

## 🔄 **Rate Limiting & Security**

### **Rate Limiting Pattern**
```typescript
// Simple in-memory rate limiting
const rateLimitMap = new Map<string, { count: number; resetTime: number }>();

function checkRateLimit(ip: string, limit: number, windowMs: number): boolean {
  const now = Date.now();
  const record = rateLimitMap.get(ip);
  
  if (!record || now > record.resetTime) {
    rateLimitMap.set(ip, { count: 1, resetTime: now + windowMs });
    return true;
  }
  
  if (record.count >= limit) {
    return false;
  }
  
  record.count++;
  return true;
}
```

### **Input Sanitization**
```typescript
// Validate slug parameter
function validateSlug(slug: string): boolean {
  // Allow only alphanumeric, hyphens, and underscores
  return /^[a-zA-Z0-9-_]+$/.test(slug) && slug.length > 0 && slug.length <= 100;
}
```

## 🧪 **Testing Patterns**

### **API Testing Examples**
```typescript
// Unit test for /api/news
describe('GET /api/news', () => {
  it('should return homepage data', async () => {
    const response = await fetch('/api/news');
    const data = await response.json();
    
    expect(response.status).toBe(200);
    expect(data.success).toBe(true);
    expect(data.data).toHaveProperty('hero');
    expect(data.data).toHaveProperty('editoChoice');
    expect(Array.isArray(data.data.hero)).toBe(true);
  });
});

// Integration test for /api/articles/[slug]
describe('GET /api/articles/[slug]', () => {
  it('should return article data', async () => {
    const response = await fetch('/api/articles/test-article');
    const data = await response.json();
    
    expect(response.status).toBe(200);
    expect(data.success).toBe(true);
    expect(data.data).toHaveProperty('title');
    expect(data.data).toHaveProperty('body');
  });
});
```

## 📊 **Performance Metrics**

### **Key Metrics to Monitor**
- **Response Time**: API endpoint latency
- **Error Rate**: Percentage of failed requests
- **Cache Hit Rate**: Effectiveness of caching strategies
- **Concurrent Users**: Maximum simultaneous requests
- **Data Transfer**: API response payload sizes

### **Monitoring Tools Integration**
```typescript
// Example performance monitoring
export async function GET() {
  const startTime = performance.now();
  
  try {
    const result = await fetchData();
    const duration = performance.now() - startTime;
    
    // Send metrics to monitoring service
    analytics.track('api_request', {
      endpoint: '/api/news',
      duration,
      success: true
    });
    
    return Response.json(result);
  } catch (error) {
    const duration = performance.now() - startTime;
    
    analytics.track('api_request', {
      endpoint: '/api/news',
      duration,
      success: false,
      error: error instanceof Error ? error.message : 'Unknown'
    });
    
    throw error;
  }
}
```

---

**💡 AI Agent Note**: Use this documentation as the definitive reference for API implementation. Always follow the established patterns for consistency and maintainability.
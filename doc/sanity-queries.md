# 📊 Sanity CMS - Schema & Queries Documentation

> **Context-Aware AI Agent Documentation** - Complete guide to Sanity CMS schema structure, GROQ queries, and data relationships.

## 🏛️ **Content Schema Overview**

### **Primary Content Types**
- **Article** - Main news article content
- **Author** - Journalist profile information  
- **Region** - Geographic categorization
- **Tag** - Topic-based categorization
- **Waitlist** - Email subscription data

## 📄 **Schema Structures**

### **Article Schema**
```typescript
interface Article {
  _type: "article"
  title: string                    // Article headline
  slug: { current: string }        // URL-friendly identifier
  excerpt: string                  // Brief article summary
  mainImage?: {                    // Featured image
    asset: ImageAsset
    alt?: string
    caption?: string
  }
  author: AuthorRef                // Reference to author
  publishedAt: datetime            // Publication timestamp
  region: RegionRef                // Geographic category
  tags: TagRef[]                   // Topic categories
  body?: PortableText[]            // Rich text content
  featured?: boolean               // Editor's selection
}
```

### **Author Schema**
```typescript
interface Author {
  _type: "author"
  name: string                     // Display name
  slug: { current: string }        // URL identifier
  image?: {                        // Author photo
    asset: ImageAsset
    alt?: string
  }
  bio?: string                     // Professional biography
}
```

### **Region Schema**
```typescript
interface Region {
  _type: "region"
  title: string                    // Region name
  slug: { current: string }        // URL identifier
  description?: string             // Region description
}
```

### **Tag Schema**
```typescript
interface Tag {
  _type: "tag"
  title: string                    // Tag name
  slug: { current: string }        // URL identifier
  description?: string             // Tag description
}
```

## 🔍 **GROQ Queries Complete Reference**

### **1. heroQuery**
```groq
*[_type == "article" ] {
  title,
  slug,
  excerpt,
  mainImage {
    asset-> {
      url,
      altText,
      metadata {
        dimensions,
        lqip
      }
    },
    alt
  },
  author-> {
    name,
    slug,
    image {
      asset-> {
        url,
        altText
      }
    }
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
} | order(publishedAt desc) [0...9]
```

**Purpose**: Fetch latest 9 articles for homepage hero section
**Returns**: Complete article data with images, authors, regions, and tags
**Optimization**: Limited to 9 results, ordered by newest first
**Use Case**: Homepage hero section with featured article display

---

### **2. EditoChoiceQuery**
```groq
*[_type == "article" && featured == true]{
  title,
  slug,
  excerpt,
  mainImage {
    asset-> {
      url,
      altText,
      metadata {
        dimensions,
        lqip
      }
    },
    alt
  },
  author-> {
    name,
    slug,
    image {
      asset-> {
        url,
        altText
      }
    }
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
} | order(publishedAt desc)
```

**Purpose**: Fetch featured articles selected by editors
**Filter**: `featured == true` - Only editor-selected articles
**Returns**: Same structure as hero but limited to featured content
**Use Case**: Editor's Choice section on homepage

---

### **3. Category Queries (spaces, geopolitics, trade, humanitarian, conflict)**

#### **Template Structure**:
```groq
*[_type == "article" && $tag in tags[]->title]{
  title,
  slug,
  excerpt,
  mainImage {
    asset-> {
      url,
      altText,
      metadata {
        dimensions,
        lqip
      }
    },
    alt
  },
  author-> {
    name,
    slug,
    image {
      asset-> {
        url,
        altText
      }
    }
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
} | order(publishedAt desc) [0...4]
```

**Purpose**: Fetch articles by specific category tag
**Parameter**: `$tag` - Category name to filter by
**Returns**: Latest 4 articles for specified category
**Categories Used**:
- `spacesQuery` → tag: "Space"
- `geopoliticsQuery` → tag: "Geopolitics" 
- `tradeQuery` → tag: "Trade"
- `humanitarianQuery` → tag: "Humanitarian"
- `conflictQuery` → tag: "Conflict"

**Use Case**: Category-based content sections on homepage

---

### **4. regionSpotlightQuery**
```groq
*[_type == "article"]{
  title,
  slug,
  excerpt,
  mainImage {
    asset-> {
      url,
      altText,
      metadata {
        dimensions,
        lqip
      }
    },
    alt
  },
  author-> {
    name,
    slug,
    image {
      asset-> {
        url,
        altText
      }
    }
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
} | order(publishedAt desc) [0...11]
```

**Purpose**: Fetch latest articles for regional spotlight section
**Returns**: Latest 11 articles with complete metadata
**Use Case**: Region Spotlight section showing geographic diversity

---

### **5. breakingNewsQuery**
```groq
*[_type == "article"] {
  title,
  slug,
  region-> {
    title
  }
} | order(publishedAt desc) [0...5]
```

**Purpose**: Minimal data for breaking news ticker
**Optimization**: Only essential fields (title, slug, region)
**Returns**: Latest 5 articles with basic information
**Use Case**: Breaking news ticker/marquee in header

---

### **6. articleQuery**
```groq
*[_type == "article" && slug.current == $slug][0] {
  title,
  slug,
  excerpt,
  mainImage {
    asset-> {
      url,
      altText,
      metadata {
        dimensions,
        lqip,
        palette
      }
    },
    alt,
    caption
  },
  author-> {
    name,
    slug,
    image {
      asset-> {
        url,
        altText
      }
    },
    bio
  },
  publishedAt,
  region-> {
    title,
    slug,
    description
  },
  tags[]-> {
    title,
    slug,
    description
  },
  body,
  featured,
  "estimatedReadTime": round(length(pt::text(body)) / 5 / 180),
  "relatedArticles": *[_type == "article" && _id != ^._id && (
    region._ref == ^.region._ref ||
    count(tags[_ref in ^.tags[_ref]]) > 0
  )] {
    title,
    slug,
    excerpt,
    mainImage {
      asset-> { url, altText, metadata { dimensions, lqip } },
      alt
    },
    author-> { name },
    publishedAt
  } | order(publishedAt desc) [0...3]
}
```

**Purpose**: Fetch complete article data for detail pages
**Parameter**: `$slug` - Article slug for unique identification
**Special Features**:
- **Read Time Calculation**: `round(length(pt::text(body)) / 5 / 180)` - Estimates reading time based on words per minute
- **Related Articles**: Finds articles with same region or overlapping tags
- **Complete Content**: Includes full body (Portable Text), author bio, image metadata
- **Palette Data**: Color palette for image optimization

**Use Case**: Individual article detail pages

---

### **7. addWaitlistQuery**
```groq
create {
  _type: "waitlist",
  email: $email,
  fullName: $fullName,
  notes: "",
  signedUpAt: dateTime()
}
```

**Purpose**: Create new waitlist subscription entry
**Parameters**:
- `$email` - Subscriber email address
- `$fullName` - Subscriber full name
**Auto-fields**:
- `notes` - Empty string for future notes
- `signedUpAt` - Current timestamp
**Use Case**: Email subscription functionality

## 🔧 **Query Optimization Strategies**

### **Performance Optimizations**

#### **1. Projection Selectivity**
```groq
// ✅ Good: Only requested fields
*[_type == "article"] { title, slug, publishedAt }

// ❌ Avoid: Full document retrieval
*[_type == "article"]
```

#### **2. Pagination & Limits**
```groq
// ✅ Good: Limited results
*[_type == "article"] | order(publishedAt desc) [0...10]

// ❌ Avoid: Unlimited results
*[_type == "article"] | order(publishedAt desc)
```

#### **3. Reference Dereferencing**
```groq
// ✅ Good: Optimized reference lookup
author-> { name, slug }

// ❌ Avoid: Full reference data
author->
```

### **Caching Strategies**

#### **API Level Caching**
```typescript
// In API routes with Next.js
const fetchOptions = {
  next: { revalidate: 300 } // 5 minutes
};
const articles = await client.fetch(query, params, fetchOptions);
```

#### **Client Side Caching**
```typescript
// In components with SWR or React Query
const { data, error } = useSWR('/api/news', fetcher, {
  revalidateOnFocus: false,
  refreshInterval: 30000 // 30 seconds
});
```

## 📊 **Data Relationships**

### **Reference Schema**
```
Article (1) ←→ (many) Tags
Article (1) ←→ (1) Author  
Article (1) ←→ (1) Region
Article (1) ←→ (many) Related Articles (based on shared tags/regions)
```

### **Query Patterns**

#### **Intersection Queries**
```groq
// Articles with multiple tags
*[_type == "article" && 
  "Conflict" in tags[]->title && 
  "Humanitarian" in tags[]->title]
```

#### **Co-reference Queries**
```groq
// Related articles (same region or tags)
*[_type == "article" && _id != $currentArticleId && (
  region._ref == $regionRef ||
  count(tags[_ref in $tagRefs]) > 0
)]
```

## 🎯 **Usage Patterns by Feature**

### **Homepage Sections**
- **Hero**: `heroQuery` → 9 latest articles
- **Editor's Choice**: `EditoChoiceQuery` → Featured articles
- **Categories**: `{category}Query` → 4 articles per category
- **Region Spotlight**: `regionSpotlightQuery` → 11 latest articles

### **Article Pages**
- **Main Content**: `articleQuery` → Complete article with metadata
- **Related Content**: Built into `articleQuery` → Related articles calculation
- **SEO Data**: Complete metadata in article query

### **Real-time Features**
- **Breaking News**: `breakingNewsQuery` → Minimal data for ticker
- **Header Updates**: 30-second refresh interval
- **Live Updates**: No caching (`revalidate: 0`)

## 🔍 **Debugging & Monitoring**

### **Query Performance**
```typescript
// Add performance monitoring
console.time('sanity-query');
const result = await client.fetch(query, params);
console.timeEnd('sanity-query');
```

### **Error Handling**
```typescript
try {
  const result = await client.fetch(query, params);
  return result;
} catch (error) {
  console.error('Sanity query failed:', error);
  return fallbackData;
}
```

---

**💡 AI Agent Note**: Use this documentation as reference for understanding content structure. Always optimize queries for specific use cases and implement proper error handling.
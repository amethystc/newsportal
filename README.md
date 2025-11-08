# 🚀 Conflict News Portal

> **Breaking News, Real-Time Updates** - Your cutting-edge news portal for global conflict and humanitarian coverage, powered by Next.js and Sanity CMS.

![Next.js](https://img.shields.io/badge/Next.js-16.0-black?style=for-the-badge&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=for-the-badge&logo=typescript)
![Sanity](https://img.shields.io/badge/Sanity-CMS-F03E2F?style=for-the-badge&logo=sanity)
![Tailwind](https://img.shields.io/badge/Tailwind-3.4-38B2AC?style=for-the-badge&logo=tailwind-css)

## 🎯 Project Overview

Conflict News Portal is a modern, high-performance news application delivering real-time coverage of global conflicts, humanitarian crises, and peacebuilding efforts. Built with the latest Next.js 16 and powered by Sanity CMS, this platform offers lightning-fast load times, SEO optimization, and a seamless user experience across all devices.

### ✨ Key Features

- 🌍 **Global Conflict Coverage** - Real-time news from conflict zones worldwide
- 📱 **Mobile-First Design** - Responsive layout that works flawlessly on any device
- ⚡ **Blazing Fast Performance** - Optimized with Next.js 16 and Turbopack
- 🔍 **SEO Supercharged** - Built-in structured data and meta tags for maximum visibility
- 🎨 **Modern UI/UX** - Clean, intuitive interface with smooth animations
- 📊 **API-First Architecture** - Clean separation between frontend and CMS
- 🏷️ **Smart Tagging System** - Organized content with regions and topics
- 👥 **Author Profiles** - Dedicated journalist profiles and bylines

## 🏗️ Project Structure

```
newsportal/
├── 📁 public/                     # Static assets (images, icons)
├── 📁 src/
│   ├── 📁 app/                    # Next.js App Router
│   │   ├── 📁 api/                # API routes
│   │   │   ├── 📁 articles/       # Article API endpoints
│   │   │   │   └── 📄 [slug]/route.ts
│   │   │   └── 📄 news/route.ts   # Homepage news API
│   │   ├── 📁 article/            # Dynamic article pages
│   │   │   └── 📄 [slug]/page.tsx
│   │   ├── 📄 layout.tsx          # Root layout
│   │   ├── 📄 page.tsx            # Homepage
│   │   └── 📄 globals.css         # Global styles
│   ├── 📁 components/             # Reusable React components
│   │   ├── 📁 article/            # Article-specific components
│   │   ├── 📁 layout/             # Layout components (Header, Footer)
│   │   ├── 📁 section/            # Page sections (Hero, Editor's Choice)
│   │   └── 📁 ui/                 # UI components (Button, Card, Input)
│   ├── 📁 lib/                    # Utility functions and API helpers
│   ├── 📁 sanity/                 # Sanity CMS configuration
│   │   ├── 📄 client.ts           # Sanity client setup
│   │   └── 📄 queries.ts          # GROQ queries
│   └── 📁 types/                  # TypeScript type definitions
├── 📄 eslint.config.mjs           # ESLint configuration
├── 📄 next.config.ts              # Next.js configuration
├── 📄 package.json                # Dependencies and scripts
└── 📄 tsconfig.json               # TypeScript configuration
```

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ 
- npm, yarn, pnpm, or bun
- Sanity CMS account (free tier works!)

### Installation

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd newsportal
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   ```

3. **Environment Setup**
   
   Create a `.env.local` file in the root directory:
   ```env
   NEXT_PUBLIC_SANITY_PROJECT_ID=your_project_id
   NEXT_PUBLIC_SANITY_DATASET=production
   NEXT_PUBLIC_SANITY_API_VERSION=2025-11-06
   NEXT_PUBLIC_BASE_URL=http://localhost:3000
   ```

4. **Fire up the development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000) and watch the magic happen! 🎉

## 🔗 Sanity CMS Integration

### Setting Up Sanity

1. **Install Sanity CLI**
   ```bash
   npm install -g @sanity/cli
   ```

2. **Initialize Sanity in your project**
   ```bash
   sanity init
   ```

3. **Configure your schema**
   - Use the schema files in `docs/schemaTypes/`
   - Customize article, author, region, and tag schemas

### Connecting to Sanity

The project uses a clean API architecture to connect with Sanity:

**Sanity Client Configuration** (`src/sanity/client.ts`):
```typescript
import { createClient } from 'next-sanity'

export const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  apiVersion: process.env.NEXT_PUBLIC_SANITY_API_VERSION,
  useCdn: true, // Performance boost for production
})
```

**GROQ Queries** (`src/sanity/queries.ts`):
- Optimized queries for articles, authors, and related content
- Includes image asset resolution and metadata
- Efficient data fetching with proper projections

## 📡 API Documentation

### API Architecture

This project uses **Next.js API Routes** to create a clean separation between the frontend and Sanity CMS. All data fetching goes through our custom API endpoints, providing better security and caching.

### Available Endpoints

#### 📰 Get All News (Homepage)
```http
GET /api/news
```

**Response:**
```json
{
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
            "metadata": { "dimensions": { "width": 1200, "height": 800 } }
          }
        },
        "author": { "name": "John Doe" },
        "publishedAt": "2025-01-08T10:00:00Z",
        "region": { "title": "Middle East" },
        "tags": [{ "title": "Conflict" }]
      }
    ],
    "editoChoice": [...]
  }
}
```

#### 📄 Get Single Article
```http
GET /api/articles/[slug]
```

**Example:**
```http
GET /api/articles/breaking-conflict
```

**Response:**
```json
{
  "success": true,
  "data": {
    "title": "Breaking: Major Conflict Develops",
    "slug": { "current": "breaking-conflict" },
    "excerpt": "Comprehensive coverage...",
    "body": [...], // Portable Text content
    "mainImage": { ... },
    "author": { 
      "name": "John Doe",
      "slug": { "current": "john-doe" },
      "bio": "Veteran conflict correspondent..."
    },
    "publishedAt": "2025-01-08T10:00:00Z",
    "region": { "title": "Middle East" },
    "tags": [{ "title": "Conflict" }],
    "relatedArticles": [...]
  }
}
```

### Using the API in Your Components

**Example: Fetching an article**
```typescript
import { getArticleBySlug } from '@/lib/api'

// In your page component
const article = await getArticleBySlug('breaking-conflict')
```

**API Helper Functions** (`src/lib/api.ts`):
```typescript
// Fetch article by slug with caching
export async function getArticleBySlug(slug: string): Promise<Article | null>

// Fetch homepage data with caching
export async function getHomepageData(): Promise<HomepageData>
```

### Caching Strategy

- **API Routes**: 5-minute revalidation (`next: { revalidate: 300 }`)
- **Static Generation**: Homepage pre-built at build time
- **ISR**: Articles revalidated on-demand

## 🛠️ Development Workflow

### Available Scripts

```bash
# Development server with hot reload
npm run dev

# Production build
npm run build

# Start production server
npm run start

# Lint code
npm run lint

# Type checking
npm run type-check
```

### Code Quality

- **ESLint**: Configured with Next.js and TypeScript rules
- **TypeScript**: Strict mode enabled for type safety
- **Prettier**: Code formatting (add your preferred config)

### Adding New Features

1. **Create new components** in `src/components/`
2. **Add API routes** in `src/app/api/`
3. **Update types** in `src/types/`
4. **Add Sanity queries** in `src/sanity/queries.ts`

## 🚀 Deployment

### Vercel (Recommended)

1. **Connect your GitHub repository** to Vercel
2. **Add environment variables** in Vercel dashboard
3. **Deploy automatically** on every push to main branch

### Environment Variables for Production

```env
NEXT_PUBLIC_SANITY_PROJECT_ID=your_production_project_id
NEXT_PUBLIC_SANITY_DATASET=production
NEXT_PUBLIC_SANITY_API_VERSION=2025-11-06
NEXT_PUBLIC_BASE_URL=https://your-domain.com
```

### Other Deployment Options

- **Netlify**: Works great with Next.js
- **AWS Amplify**: Full-stack deployment
- **Docker**: Containerized deployment
- **Traditional Hosting**: Build and serve static files

## 🎨 Customization Guide

### Styling

- **Tailwind CSS**: Utility-first styling
- **Custom Components**: Modify in `src/components/ui/`
- **Theme Colors**: Update in `tailwind.config.js`

### Content Structure

- **Article Schema**: `docs/schemaTypes/magazine.ts`
- **Custom Fields**: Add to Sanity schema
- **New Content Types**: Create new schemas and API endpoints

### Performance Optimization

- **Image Optimization**: Automatic with Next.js Image component
- **Code Splitting**: Built-in with Next.js
- **Caching**: Configurable revalidation times

## 🤝 Contributing

1. **Fork the repository**
2. **Create a feature branch** (`git checkout -b feature/amazing-feature`)
3. **Commit your changes** (`git commit -m 'Add amazing feature'`)
4. **Push to the branch** (`git push origin feature/amazing-feature`)
5. **Open a Pull Request**

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

Got questions? Need help? 

- 📧 **Email**: support@conflictnewsportal.com
- 💬 **Discord**: [Join our community](https://discord.gg/conflictnews)
- 📖 **Documentation**: [Full docs here](https://docs.conflictnewsportal.com)
- 🐛 **Issues**: [Report bugs on GitHub](https://github.com/your-repo/issues)

---

**Built with ❤️ by the Conflict News Portal Team**

*Delivering truth, one story at a time.*
# 🏗️ Conflict News Portal - Project Overview & Architecture

> **Context-Aware AI Agent Documentation** - Comprehensive guide for understanding project structure, data flow, and implementation patterns.

## 📋 **Project Overview**

### **Description**
Conflict News Portal is a modern, high-performance news application delivering real-time coverage of global conflicts, humanitarian crises, and peacebuilding efforts. Built with Next.js 16 and Sanity CMS.

### **Core Mission**
- Provide comprehensive conflict and humanitarian news coverage
- Deliver real-time updates from conflict zones worldwide
- Maintain high journalistic standards with author profiles and sources
- Optimize for SEO and performance across all devices

## 🛠️ **Technology Stack**

### **Frontend Framework**
- **Next.js 16** - React framework with App Router
- **React 19** - UI library with latest features
- **TypeScript 5** - Type safety and development experience

### **Styling & UI**
- **Tailwind CSS 4** - Utility-first CSS framework
- **Radix UI** - Accessible component primitives
- **Lucide React** - Icon library
- **React Fast Marquee** - Breaking news ticker

### **Content Management**
- **Sanity CMS** - Headless CMS with real-time collaboration
- **GROQ** - Query language for content fetching
- **Portable Text** - Rich text content structure

### **Performance & SEO**
- **Next.js Image Optimization** - Automatic image optimization
- **Structured Data (JSON-LD)** - SEO enhancement
- **React Compiler** - Performance optimizations

## 🏛️ **Project Architecture**

### **Directory Structure**
```
newsportal/
├── 📁 public/                     # Static assets
│   ├── 🖼️ conflict-wire-logo.png
│   └── 🖼️ cta.jpg
├── 📁 src/
│   ├── 📁 app/                    # Next.js App Router
│   │   ├── 📁 api/                # API routes
│   │   │   ├── 📁 articles/
│   │   │   │   └── 📄 [slug]/route.ts    # Single article API
│   │   │   ├── 📁 waitlist/
│   │   │   └── 📄 news/route.ts          # Homepage API
│   │   ├── 📁 article/            # Dynamic article pages
│   │   │   └── 📄 [slug]/page.tsx        # Article detail page
│   │   ├── 📄 layout.tsx          # Root layout component
│   │   ├── 📄 page.tsx            # Homepage component
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
├── 📁 doc/                        # Project documentation
├── 📄 next.config.ts              # Next.js configuration
├── 📄 package.json                # Dependencies and scripts
└── 📄 tsconfig.json               # TypeScript configuration
```

## 🔄 **Data Flow Architecture**

### **Content Flow**
```
Sanity CMS → GROQ Queries → API Routes → React Components → User Interface
```

### **API-First Architecture**
1. **Content Creation**: Authors create articles in Sanity CMS
2. **Content Fetching**: GROQ queries fetch content from Sanity
3. **API Processing**: API routes process and format data
4. **Data Delivery**: Frontend consumes structured data via API calls
5. **UI Rendering**: React components render content with optimization

### **Data Layers**

#### **Layer 1: Sanity CMS (Content Source)**
- Article content with rich text (Portable Text)
- Author profiles and metadata
- Region and tag categorization
- Image assets with optimization metadata

#### **Layer 2: API Routes (Data Processing)**
- `/api/news` - Homepage data aggregation
- `/api/articles/[slug]` - Individual article data
- Error handling and response formatting
- Type-safe data transformations

#### **Layer 3: React Components (UI Rendering)**
- Server-side rendering (SSR) for SEO
- Client-side interactivity for dynamic features
- Responsive design for all devices
- Performance optimizations

## 🎯 **Key Features Implementation**

### **1. Homepage Content Sections**
- **Hero Section**: Latest 9 articles with featured display
- **Editor's Choice**: Featured articles handpicked by editors
- **Category Sections**: Conflict, Humanitarian, Trade, Geopolitics, Spaces
- **Region Spotlight**: Highlighted articles by geographic region
- **Breaking News Ticker**: Real-time updates with marquee

### **2. Article Detail Pages**
- Full article content with Portable Text rendering
- Author profiles with bio and image
- Related articles based on region and tags
- SEO-optimized with structured data
- Social sharing capabilities

### **3. Navigation & UX**
- Responsive header with desktop/mobile variants
- Breaking news ticker with 30-second refresh
- Search functionality
- Mobile navigation drawer
- Smooth scrolling and transitions

### **4. Performance Features**
- Image optimization with WebP/AVIF formats
- Lazy loading for content sections
- Code splitting and dynamic imports
- Caching strategies with ISR
- Minimal bundle size with tree shaking

## 🔧 **Development Patterns**

### **Component Architecture**
- **Atomic Design**: UI → Section → Layout → Page
- **Composition over Inheritance**: Flexible component patterns
- **Props Interface**: Strict TypeScript typing
- **Responsive First**: Mobile-first design approach

### **State Management**
- **Server State**: Next.js data fetching with cache
- **Client State**: React hooks for UI state
- **Real-time Updates**: Interval-based refresh for breaking news
- **Optimistic Updates**: Immediate UI feedback

### **Code Organization**
- **Feature-based structure**: Components grouped by functionality
- **Shared utilities**: Reusable helper functions
- **Type definitions**: Centralized TypeScript interfaces
- **Configuration management**: Environment-based settings

## 🚀 **Development Workflow**

### **Available Scripts**
```bash
npm run dev      # Development server with hot reload
npm run build    # Production build with optimizations
npm run start    # Production server
npm run lint     # Code quality checks
```

### **Development Guidelines**
- **Type Safety**: Strict TypeScript configuration
- **Code Quality**: ESLint with Next.js rules
- **Performance**: React Compiler and Next.js optimizations
- **SEO**: Comprehensive metadata and structured data
- **Accessibility**: ARIA labels and semantic HTML

### **Environment Configuration**
```env
NEXT_PUBLIC_SANITY_PROJECT_ID=your_project_id
NEXT_PUBLIC_SANITY_DATASET=production
NEXT_PUBLIC_SANITY_API_VERSION=2025-11-06
NEXT_PUBLIC_BASE_URL=http://localhost:3000
```

## 📊 **Performance Metrics**

### **Key Optimizations**
- **Core Web Vitals**: Optimized for LCP, FID, CLS
- **Bundle Size**: Tree shaking and code splitting
- **Image Optimization**: Next.js Image with CDN
- **Caching**: ISR and API route caching
- **SEO**: Semantic HTML and structured data

### **Monitoring Points**
- Page load times across device sizes
- API response times and error rates
- Image optimization effectiveness
- SEO score and search visibility
- User engagement metrics

## 🔮 **Future Enhancements**

### **Planned Features**
- **Author Pages**: Dedicated author profile pages
- **Search Functionality**: Advanced search with filters
- **Newsletter Integration**: Email subscription system
- **Comment System**: User engagement features
- **Analytics Dashboard**: Content performance tracking

### **Technical Improvements**
- ** Progressive Web App (PWA)**: Offline capabilities
- **Internationalization**: Multi-language support
- **AI Integration**: Automated content tagging
- **Performance Monitoring**: Real-time performance tracking
- **A/B Testing**: Feature experimentation framework

---

**💡 AI Agent Note**: This architecture documentation serves as the foundation for understanding project structure. Refer to specific documentation files for detailed implementation guides.
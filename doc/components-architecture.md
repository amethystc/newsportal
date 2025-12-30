# 🧩 Component Architecture Documentation

> **Context-Aware AI Agent Documentation** - Complete guide to React components, hierarchy, patterns, and data flow.

## 🏛️ **Component Architecture Overview**

### **Design Principles**
- **Atomic Design**: Components organized by atomicity (atoms → molecules → organisms)
- **Composition over Inheritance**: Flexible, reusable component patterns
- **Single Responsibility**: Each component has one clear purpose
- **Props Interface**: Strict TypeScript typing for all components
- **Responsive First**: Mobile-first design approach

### **Directory Structure**
```
src/components/
├── 📁 article/          # Article-specific components
│   ├── ArticleBreadcrumb.tsx
│   ├── ArticleHeader.tsx
│   ├── ArticleMainImage.tsx
│   ├── ArticleTags.tsx
│   └── RelatedArticles.tsx
├── 📁 layout/           # Layout components
│   ├── Header.tsx
│   ├── MobileNavigation.tsx
│   ├── MobileNavigationProvider.tsx
│   └── MobileNavigationWrapper.tsx
├── 📁 section/          # Page section components
│   ├── EditorChoise.tsx
│   ├── EditorChoiseV2.tsx
│   ├── Exclusive.tsx
│   ├── Footer.tsx
│   ├── Hero.tsx
│   ├── RegionSpotLight.tsx
│   └── SubscribtionCTA.tsx
└── 📁 ui/               # Reusable UI primitives
    ├── BackToTop.tsx
    ├── button.tsx
    ├── card.tsx
    ├── input.tsx
    ├── navigation-menu.tsx
    ├── optimized-image.tsx
    └── portable-text.tsx
```

## 🔬 **Component Categories**

### **1. UI Components (Atoms)**
**Purpose**: Basic, reusable UI elements
**Location**: `src/components/ui/`

#### **Button Component**
```typescript
interface ButtonProps extends React.ComponentProps<"button"> {
  variant?: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link";
  size?: "default" | "sm" | "lg" | "icon" | "icon-sm" | "icon-lg";
  asChild?: boolean;
}

// Usage Examples
<Button variant="outline" size="sm">Small Button</Button>
<Button variant="default" className="bg-red-500">Primary Button</Button>
<Button asChild variant="link">
  <Link href="/article">Read More</Link>
</Button>
```

**Features**:
- Variant-based styling with `class-variance-authority`
- `asChild` prop for polymorphic rendering
- Full TypeScript integration
- Accessibility built-in with Radix UI

#### **Portable Text Component**
```typescript
interface PortableTextProps {
  value: any[];           // Portable Text array from Sanity
  className?: string;
}

// Custom styling for different block types
const portableTextComponents = {
  block: {
    normal: ({ children }) => <p className="mb-6 text-lg leading-relaxed">{children}</p>,
    h1: ({ children }) => <h1 className="text-4xl font-bold mb-6 mt-12">{children}</h1>,
    // ... more block types
  },
  marks: {
    strong: ({ children }) => <strong className="font-bold">{children}</strong>,
    link: ({ children, value }) => <a href={value?.href} className="text-red-600">{children}</a>
  }
};
```

**Purpose**: Render Sanity Portable Text content with custom styling
**Features**:
- Semantic HTML rendering
- Custom typography styles
- Link handling with external opening
- Responsive typography

---

### **2. Layout Components (Molecules)**
**Purpose**: Layout structure and navigation
**Location**: `src/components/layout/`

#### **Header Component**
```typescript
interface HeaderProps {
  // No props - self-contained component
}

// Key Features
interface HeaderFeatures {
  responsive: boolean;      // Mobile/desktop variants
  breakingNews: boolean;     // Live news ticker
  navigation: boolean;       // Main navigation menu
  search: boolean;          // Search functionality
  realTimeUpdates: boolean; // 30-second refresh interval
}
```

**Responsive Behavior**:
- **Desktop (>1050px)**: Full navigation with logo and search
- **Tablet/Mobile**: Hamburger menu with drawer navigation
- **Breaking News**: Marquee ticker with auto-refresh

**State Management**:
```typescript
const [windowWidth, setWindowWidth] = useState(0);
const [breakingNews, setBreakingNews] = useState<any[]>([]);

// Responsive width tracking
useEffect(() => {
  const handleResize = () => setWindowWidth(window.innerWidth);
  handleResize();
  window.addEventListener("resize", handleResize);
  return () => window.removeEventListener("resize", handleResize);
}, []);

// Breaking news updates
useEffect(() => {
  const fetchBreakingNews = async () => {
    const news = await client.fetch(breakingNewsQuery, {}, fetchOptions);
    setBreakingNews(news);
  };
  
  fetchBreakingNews();
  const interval = setInterval(fetchBreakingNews, 30000); // 30 seconds
  return () => clearInterval(interval);
}, []);
```

---

### **3. Article Components (Organisms)**
**Purpose**: Complete article presentation
**Location**: `src/components/article/`

#### **Article Header Component**
```typescript
interface ArticleHeaderProps {
  article: Article;
}

interface Article {
  title: string;
  slug: { current: string };
  excerpt: string;
  author: Author;
  publishedAt: string;
  region: Region;
  tags: Tag[];
  estimatedReadTime?: number;
}
```

**Features**:
- SEO-optimized heading structure
- Author information display
- Publication date formatting
- Read time estimation
- Region and tag display

#### **Article Main Image Component**
```typescript
interface ArticleMainImageProps {
  article: Article;
}

// Image optimization with Next.js
<Image
  src={article.mainImage?.asset?.url}
  alt={article.mainImage?.alt || article.title}
  fill
  className="object-cover"
  priority
  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
/>
```

**Features**:
- Responsive image sizing
- LQIP (Low Quality Image Placeholder)
- Priority loading for above-the-fold content
- Fallback handling for missing images

---

### **4. Section Components (Templates)**
**Purpose**: Page sections with multiple components
**Location**: `src/components/section/`

#### **Hero Section Component**
```typescript
interface HeroProps {
  articles: Article[];      // Array of articles for hero display
}

// Responsive Layout
const heroArticles = articles.slice(0, 3);  // Featured 3 articles
const cardArticles = articles.slice(3, 7);  // Secondary 4 articles
```

**Layout Structure**:
- **Mobile**: Horizontal scroll with snap points
- **Desktop**: 3-column grid with featured articles
- **Cards**: Secondary articles in grid layout

**Responsive Implementation**:
```typescript
// Mobile horizontal scroll
<div className="flex gap-4 overflow-x-auto snap-x snap-mandatory md:hidden">
  {heroArticles.map((post, idx) => (
    <Link href={`/article/${post.slug.current}`} className="min-w-[85%] h-72">
      {/* Article content */}
    </Link>
  ))}
</div>

// Desktop 3-column grid
<div className="hidden md:grid md:grid-cols-3">
  {heroArticles.map((post, idx) => (
    <Link href={`/article/${post.slug.current}`} className="min-h-[280px]">
      {/* Article content */}
    </Link>
  ))}
</div>
```

#### **Editor's Choice Components**
```typescript
// EditorChoise.tsx - Vertical list with background
interface EditorChoiseProps {
  title: string;           // Section title
  background: string;       // Background color class
  article: Article[];       // Articles array
}

// EditorChoiseV2.tsx - Grid layout
interface EditorsChoiceV2Props {
  title: string;           // Section title
  articles: Article[];      // Articles array
}
```

---

## 🔄 **Data Flow Patterns**

### **1. Props Flow**
```
API Data → Page Component → Section Component → Article/Item Component
```

#### **Example Data Flow for Homepage**:
```typescript
// 1. Page Component fetches data
export default async function Home() {
  const data = await getHomepageData();
  return (
    <>
      <Header />                              // Self-contained
      <Hero articles={data.hero} />           // Pass hero articles
      <EditorChoise articles={data.conflict} title="Conflict" />
      <RegionSpotlight articles={data.regionSpotlight} />
    </>
  );
}

// 2. Section Component distributes to items
export default function Hero({ articles }: HeroProps) {
  const heroArticles = articles.slice(0, 3);
  return (
    <section>
      {heroArticles.map(article => (
        <HeroArticle key={article.slug.current} article={article} />
      ))}
    </section>
  );
}

// 3. Item Component renders individual article
export default function HeroArticle({ article }: { article: Article }) {
  return (
    <Link href={`/article/${article.slug.current}`}>
      <h2>{article.title}</h2>
      <p>{article.author.name}</p>
    </Link>
  );
}
```

### **2. State Management Patterns**

#### **Server State (API Data)**
```typescript
// Data fetching in page components
async function getHomepageData(): Promise<HomepageData> {
  const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/news`, {
    next: { revalidate: 0 } // No caching for real-time data
  });
  return response.json();
}
```

#### **Client State (UI State)**
```typescript
// Local component state for UI interactions
const [isMenuOpen, setIsMenuOpen] = useState(false);
const [searchQuery, setSearchQuery] = useState('');

// Event handlers
const handleMenuToggle = () => setIsMenuOpen(!isMenuOpen);
const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  setSearchQuery(e.target.value);
};
```

#### **Shared State (Context)**
```typescript
// Mobile navigation context
const MobileNavigationContext = createContext({
  isOpen: false,
  openMenu: () => {},
  closeMenu: () => {}
});

// Provider wrapper
export function MobileNavigationProvider({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  
  return (
    <MobileNavigationContext.Provider value={{
      isOpen,
      openMenu: () => setIsOpen(true),
      closeMenu: () => setIsOpen(false)
    }}>
      {children}
    </MobileNavigationContext.Provider>
  );
}
```

---

## 🎨 **Styling Patterns**

### **1. Tailwind CSS Conventions**
```typescript
// Responsive prefixes
className="text-xs lg:text-sm xl:text-base"           // Progressive enhancement
className="px-3 lg:px-4 xl:px-6"                      // Spacing scale
className="grid-cols-1 md:grid-cols-2 lg:grid-cols-3"  // Layout grid

// State-based styling
className="border border-gray-300 focus:border-blue-500 focus:ring-2"
className="hover:bg-gray-100 active:bg-gray-200 transition-colors"
```

### **2. Component-Specific Styling**
```typescript
// Card component with variants
const cardVariants = cva(
  "rounded-lg border bg-white shadow-sm",
  {
    variants: {
      variant: {
        default: "border-gray-200",
        featured: "border-red-200 bg-red-50",
        outline: "border-2 border-gray-300"
      },
      padding: {
        none: "p-0",
        sm: "p-4",
        md: "p-6",
        lg: "p-8"
      }
    }
  }
);
```

### **3. Responsive Design Patterns**
```typescript
// Mobile-first approach
className="w-full md:w-1/2 lg:w-1/3"                // Progressive widths
className="text-sm md:text-base lg:text-lg"          // Typography scale
className="flex-col md:flex-row"                     // Layout changes
className="hidden md:block lg:flex"                  // Display control
```

---

## 🛠️ **Component Patterns**

### **1. Compound Components**
```typescript
// Card component with sub-components
export function Card({ children, className, ...props }: CardProps) {
  return (
    <div className={cn(cardVariants({ className }))} {...props}>
      {children}
    </div>
  );
}

Card.Header = function CardHeader({ children, className, ...props }: CardHeaderProps) {
  return <div className={cn("p-6 pb-4", className)} {...props}>{children}</div>;
};

Card.Content = function CardContent({ children, className, ...props }: CardContentProps) {
  return <div className={cn("px-6 pb-6", className)} {...props}>{children}</div>;
};

// Usage
<Card>
  <Card.Header>
    <h2>Card Title</h2>
  </Card.Header>
  <Card.Content>
    <p>Card content goes here</p>
  </Card.Content>
</Card>
```

### **2. Polymorphic Components**
```typescript
// Button that can render as different elements
interface ButtonProps extends React.ComponentProps<"button"> {
  asChild?: boolean;
  variant?: "primary" | "secondary";
}

function Button({ asChild, ...props }: ButtonProps) {
  const Comp = asChild ? Slot : "button";
  return <Comp {...props} />;
}

// Usage
<Button asChild variant="primary">
  <Link href="/article">Read Article</Link>
</Button>
```

### **3. Render Props Pattern**
```typescript
// Data provider component
function DataProvider<T>({
  url,
  children
}: {
  url: string;
  children: (data: T | null, loading: boolean, error: Error | null) => React.ReactNode;
}) {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    fetch(url)
      .then(res => res.json())
      .then(data => {
        setData(data);
        setLoading(false);
      })
      .catch(err => {
        setError(err);
        setLoading(false);
      });
  }, [url]);

  return <>{children(data, loading, error)}</>;
}

// Usage
<DataProvider url="/api/news">
  {(data, loading, error) => {
    if (loading) return <LoadingSpinner />;
    if (error) return <ErrorMessage error={error} />;
    return <NewsList articles={data.articles} />;
  }}
</DataProvider>
```

---

## 📱 **Responsive Component Patterns**

### **1. Responsive Components**
```typescript
function ResponsiveArticleCard({ article }: { article: Article }) {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  if (isMobile) {
    return <MobileArticleCard article={article} />;
  }
  return <DesktopArticleCard article={article} />;
}
```

### **2. Adaptive Layouts**
```typescript
function HeroSection({ articles }: { articles: Article[] }) {
  return (
    <>
      {/* Mobile Layout */}
      <div className="flex gap-4 overflow-x-auto snap-x snap-mandatory md:hidden">
        {articles.map(article => (
          <div key={article.slug.current} className="min-w-[85%] snap-center">
            <MobileArticleCard article={article} />
          </div>
        ))}
      </div>

      {/* Desktop Layout */}
      <div className="hidden md:grid md:grid-cols-3 gap-6">
        {articles.map(article => (
          <DesktopArticleCard key={article.slug.current} article={article} />
        ))}
      </div>
    </>
  );
}
```

---

## 🔄 **Performance Patterns**

### **1. Lazy Loading**
```typescript
import dynamic from 'next/dynamic';

// Lazy load heavy components
const HeavyComponent = dynamic(() => import('./HeavyComponent'), {
  loading: () => <div>Loading...</div>,
  ssr: false // Client-side only
});

function Page() {
  return (
    <div>
      <header>Header</header>
      <main>
        <p>Content</p>
        <HeavyComponent /> {/* Loaded on demand */}
      </main>
    </div>
  );
}
```

### **2. Memoization**
```typescript
import { memo, useMemo, useCallback } from 'react';

// Memoized component
const MemoizedArticleCard = memo(function ArticleCard({ article }: { article: Article }) {
  const formattedDate = useMemo(() => 
    new Date(article.publishedAt).toLocaleDateString(), 
    [article.publishedAt]
  );

  return (
    <div>
      <h3>{article.title}</h3>
      <time>{formattedDate}</time>
    </div>
  );
});

// Memoized event handler
function ArticleList({ articles }: { articles: Article[] }) {
  const handleArticleClick = useCallback((slug: string) => {
    console.log('Article clicked:', slug);
  }, []);

  return (
    <div>
      {articles.map(article => (
        <MemoizedArticleCard 
          key={article.slug.current} 
          article={article}
          onClick={handleArticleClick}
        />
      ))}
    </div>
  );
}
```

### **3. Code Splitting**
```typescript
// Feature-based code splitting
const EditorChoise = dynamic(() => import('@/components/section/EditorChoise'));
const Hero = dynamic(() => import('@/components/section/Hero'));
const RegionSpotlight = dynamic(() => import('@/components/section/RegionSpotLight'));

function HomePage() {
  return (
    <div>
      <Header />
      <Hero />
      <EditorChoise />
      <RegionSpotlight />
    </div>
  );
}
```

---

## 🧪 **Testing Patterns**

### **1. Component Testing**
```typescript
import { render, screen, fireEvent } from '@testing-library/react';
import { Button } from './button';

describe('Button Component', () => {
  it('renders with default props', () => {
    render(<Button>Click me</Button>);
    expect(screen.getByRole('button')).toBeInTheDocument();
    expect(screen.getByText('Click me')).toBeInTheDocument();
  });

  it('handles click events', () => {
    const handleClick = jest.fn();
    render(<Button onClick={handleClick}>Click me</Button>);
    
    fireEvent.click(screen.getByRole('button'));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('applies variant classes correctly', () => {
    render(<Button variant="destructive">Delete</Button>);
    expect(screen.getByRole('button')).toHaveClass('bg-destructive');
  });
});
```

### **2. Integration Testing**
```typescript
import { render, screen } from '@testing-library/react';
import { Hero } from './Hero';

const mockArticles = [
  {
    title: 'Test Article',
    slug: { current: 'test-article' },
    author: { name: 'Test Author' },
    publishedAt: '2025-01-01T00:00:00Z'
  }
];

describe('Hero Section Integration', () => {
  it('displays articles correctly', () => {
    render(<Hero articles={mockArticles} />);
    
    expect(screen.getByText('Test Article')).toBeInTheDocument();
    expect(screen.getByText('Test Author')).toBeInTheDocument();
    expect(screen.getByRole('link')).toHaveAttribute('href', '/article/test-article');
  });
});
```

---

**💡 AI Agent Note**: Use this architecture documentation to understand component relationships and patterns. Always follow established conventions for consistency and maintainability.
// Asset types
export interface SanityAsset {
  _ref: string;
  _type: "reference";
}

export interface SanityImageAsset {
  url: string;
  altText?: string;
  metadata: {
    dimensions: {
      width: number;
      height: number;
      aspectRatio: number;
    };
    lqip?: string;
    palette?: {
      dominant: {
        background: string;
        foreground: string;
      };
    };
  };
}

// Author types
export interface Author {
  name: string;
  slug: {
    current: string;
    _type: "slug";
  };
  image?: {
    asset: SanityImageAsset;
    alt?: string;
  };
  bio?: string;
}

// Region types
export interface Continent {
  title: string;
  slug: {
    current: string;
    _type: "slug";
  };
}

export interface Country {
  title: string;
  slug: {
    current: string;
    _type: "slug";
  };
  continent?: Continent | string;
}

export interface ArticleRegion {
  continent?: Continent;
  country?: Country;
}

// Tag types
export interface Tag {
  title: string;
  slug: {
    current: string;
    _type: "slug";
  };
  description?: string;
}

// Category types
export interface Category {
  title: string;
  slug: {
    current: string;
    _type: "slug";
  };
}

// Main Image types
export interface MainImage {
  asset: SanityImageAsset;
  alt?: string;
  caption?: string;
}

// Article types
export interface Article {
  title: string;
  slug: {
    current: string;
    _type: "slug";
  };
  excerpt: string;
  mainImage?: MainImage;
  author: Author;
  publishedAt: string;
  category: Category;
  region?: ArticleRegion;
  tags: Tag[];
  body?: any[]; // Portable Text array
  featured?: boolean;
  exclusive?: boolean;
  estimatedReadTime?: number;
  relatedArticles?: Article[];
}

// Exclusive Content types
export interface ExclusiveContent {
  title: string;
  slug: {
    current: string;
    _type: "slug";
  };
  contentType: string;
  mainImage?: MainImage;
  excerpt: string;
  author: Author;
  publishedAt: string;
  content?: any[];
}

// Magazine types
export interface Magazine {
  title: string;
  slug: {
    current: string;
    _type: "slug";
  };
  issueNumber?: number;
  description?: string;
  price: number;
  checkoutUrl?: string;
  coverImage?: string;
  magazinePdf?: string;
  publishedAt: string;
}

// API Response types
export interface NewsResponse {
  message: string;
  success: boolean;
  data: HomepageData;
}

export interface ErrorResponse {
  message: string;
  success: boolean;
  error: string | Record<string, unknown>;
}

// Homepage data types
export interface HomepageData {
  hero: Article[];
  editoChoice: Article[];
  spaces: Article[];
  geopolitics: Article[];
  trade: Article[];
  humanitarian: Article[];
  conflict: Article[];
  regionSpotlight: Article[];
  exclusive: ExclusiveContent[];
}

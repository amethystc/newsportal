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
    asset: SanityAsset | SanityImageAsset;
    alt?: string;
  };
  bio?: string;
}

// Region types
export interface Region {
  title: string;
  slug: {
    current: string;
    _type: "slug";
  };
  description?: string;
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

// Main Image types
export interface MainImage {
  asset: SanityAsset | SanityImageAsset;
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
  region: Region;
  tags: Tag[];
  body?: any[]; // Portable Text array
  featured?: boolean;
  estimatedReadTime?: number;
  relatedArticles?: Article[];
}

// API Response types
export interface NewsResponse {
  message: string;
  success: boolean;
  data: {
    hero: Article[];
    editoChoice: Article;
  };
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
}

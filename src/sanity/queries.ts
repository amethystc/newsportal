export const heroQuery = `
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
`;

export const EditoChoiceQuery = `
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
`;

export const spacesQuery = `
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
`;

export const geopoliticsQuery = `
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
`;

export const tradeQuery = `
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
`;

export const humanitarianQuery = `
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
`;

export const conflictQuery = `
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
`;

export const regionSpotlightQuery = `
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
`;

export const breakingNewsQuery = `
  *[_type == "article"] {
    title,
    slug,
    region-> {
      title
    }
  } | order(publishedAt desc) [0...5]
`;

export const articleQuery = `
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
`;

export const addWaitlistQuery = `
  create {
    _type: "waitlist",
    email: $email,
    fullName: $fullName,
    notes: "",
    signedUpAt: dateTime()
  }
`;

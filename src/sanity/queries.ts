export const ARTICLE_FIELDS = `
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
  category-> {
    title,
    slug
  },
  "region": coalesce(
    region {
      continent-> {
        title,
        slug
      },
      country-> {
        title,
        slug
      }
    },
    region-> {
      title,
      slug
    }
  ),
  tags[]-> {
    title,
    slug
  },
  exclusive,
`;

export const heroQuery = `
  *[_type == "article" ] {
    ${ARTICLE_FIELDS}
  } | order(publishedAt desc) [0...9]
`;

export const EditoChoiceQuery = `
  *[_type == "article" && featured == true]{
    ${ARTICLE_FIELDS}
  } | order(publishedAt desc)
`;

export const spacesQuery = `
  *[_type == "article" && category->title == "Space"]{
    ${ARTICLE_FIELDS}
  } | order(publishedAt desc) [0...4]
`;

export const geopoliticsQuery = `
  *[_type == "article" && category->title == "Geopolitics"]{
    ${ARTICLE_FIELDS}
  } | order(publishedAt desc) [0...4]
`;

export const tradeQuery = `
  *[_type == "article" && category->title == "Trade"]{
    ${ARTICLE_FIELDS}
  } | order(publishedAt desc) [0...4]
`;

export const humanitarianQuery = `
  *[_type == "article" && category->title == "Humanitarian"]{
    ${ARTICLE_FIELDS}
  } | order(publishedAt desc) [0...4]
`;

export const conflictQuery = `
  *[_type == "article" && category->title == "Conflict"]{
    ${ARTICLE_FIELDS}
  } | order(publishedAt desc) [0...4]
`;

export const regionSpotlightQuery = `
  *[_type == "article"]{
    ${ARTICLE_FIELDS}
  } | order(publishedAt desc) [0...11]
`;

export const breakingNewsQuery = `
  *[_type == "article"] {
    title,
    slug,
    "region": coalesce(
      region {
        continent-> { title },
        country-> { title }
      },
      region-> { title }
    )
  } | order(publishedAt desc) [0...5]
`;

export const myanmarQuery = `
  *[_type == "article" && category->title == "Myanmar"]{
    ${ARTICLE_FIELDS}
  } | order(publishedAt desc)
`;

export const articleQuery = `
  *[_type == "article" && slug.current == $slug][0] {
    ${ARTICLE_FIELDS},
    mainImage {
      ...,
      asset-> {
        ...,
        metadata {
          ...,
          palette
        }
      }
    },
    author-> {
      ...,
      image {
        asset->
      },
      bio
    },
    region {
      continent-> {
        title,
        slug,
        description
      },
      country-> {
        title,
        slug,
        description
      }
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
      region.country._ref == ^.region.country._ref ||
      region.continent._ref == ^.region.continent._ref ||
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

export const magazineQuery = `
  *[_type == "magazine"] {
    title,
    slug,
    issueNumber,
    description,
    price,
    checkoutUrl,
    "coverImage": coverImage.asset->url,
    "magazinePdf": magazinePdf.asset->url,
    publishedAt
  } | order(publishedAt desc)
`;

export const EXCLUSIVE_FIELDS = `
  title,
  slug,
  contentType,
  mainImage {
    asset-> { url, metadata { lqip } },
    alt
  },
  excerpt,
  author-> { name, image { asset-> { url } } },
  publishedAt
`;

export const exclusiveQuery = `
  *[_type == "exclusive"] {
    ${EXCLUSIVE_FIELDS}
  } | order(publishedAt desc)
`;

export const exclusiveDetailQuery = `
  *[_type == "exclusive" && slug.current == $slug][0] {
    ${EXCLUSIVE_FIELDS},
    content
  }
`;

export const memberByEmailQuery = `
  *[_type == "member" && email == $email && status == "active"][0] {
    fullName,
    email,
    membershipType,
    status
  }
`;

export const allArticlesQuery = `
  *[_type == "article"] {
    ${ARTICLE_FIELDS}
  } | order(publishedAt desc)
`;

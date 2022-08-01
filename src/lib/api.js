const POST_QUERY = `
slug
title
coverImage {
  url
}
date
author {
  name
  picture {
    url
  }
}
excerpt
tagsCollection {
  items {
    slug
    name
  }
}
content {
  json
  links {
    assets {
      block {
        sys {
          id
        }
        __typename
        url
        description
      }
    }
    entries {
      block {
        sys {
          id
        }
        __typename
        ... on SocialMedia {
          link
          origin
        }
      }
      inline {
        sys {
          id
        }
        __typename
        ... on SocialMedia {
          link
          origin
        }
      }
    }
  }
}
`

const POSTS_QUERY = `
slug
title
coverImage {
  url
}
date
author {
  name
  picture {
    url
  }
}
excerpt
tagsCollection {
  items {
    slug
    name
  }
}
`


async function fetchGraphQL(query, preview = false) {
  try {
    const response = await (
      await fetch(
        `https://graphql.contentful.com/content/v1/spaces/${process.env.NEXT_PUBLIC_CONTENTFUL_SPACE_ID}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${
              preview
                ? process.env.NEXT_PUBLIC_CONTENTFUL_PREVIEW_ACCESS_TOKEN
                : process.env.NEXT_PUBLIC_CONTENTFUL_ACCESS_TOKEN
            }`,
          },
          body: JSON.stringify({ query }),
        }
      )
    ).json();
    return response;
  } catch(err) {
    console.error(err);
  }
}

function parsePost(post) {
  post.tags = post.tagsCollection?.items?.map((tag) => ({ name: tag.name, slug: tag.slug }));
  delete post.tagsCollection;
  return post;
}

function extractPost(fetchResponse) {
  const post = fetchResponse?.data?.postCollection?.items?.[0];
  return parsePost(post);
}

function extractPostEntries(fetchResponse) {
  const posts = fetchResponse?.data?.postCollection?.items ?? [];
  return posts.map(post => parsePost(post))
}

function extractCategories(fetchResponse) {
  return fetchResponse?.data?.tagCollection?.items ?? []
}

function extractCategory(fetchResponse) {
  return fetchResponse?.data?.tagCollection?.items?.[0]
}

function extractPostsFromCategoryEntries(fetchResponse) {
  const posts = fetchResponse?.data?.tagCollection?.items?.[0]?.linkedFrom?.postCollection?.items ?? [];
  return posts.map(post => parsePost(post));
}

export async function getPreviewPostBySlug(slug) {
  const entry = await fetchGraphQL(
    `query {
      postCollection(where: { slug: "${slug}" }, preview: true, limit: 1) {
        items {
          ${POST_QUERY}
        }
      }
    }`,
    true
  )
  return extractPost(entry)
}

export async function getAllPostsWithSlug() {
  const entries = await fetchGraphQL(
    `query {
      postCollection(where: { slug_exists: true }, order: date_DESC) {
        items {
          ${POSTS_QUERY}
        }
      }
    }`
  )
  return extractPostEntries(entries)
}

export async function getAllPostsForHome(preview) {
  const entries = await fetchGraphQL(
    `query {
      postCollection(order: date_DESC, limit: 11, preview: ${preview ? 'true' : 'false'}) {
        items {
          ${POSTS_QUERY}
        }
      }
    }`,
    preview
  )
  return extractPostEntries(entries)
}

export async function getPostAndMorePosts(slug, preview) {
  const entry = await fetchGraphQL(
    `query {
      postCollection(where: { slug: "${slug}" }, preview: ${
      preview ? 'true' : 'false'
    }, limit: 1) {
        items {
          ${POST_QUERY}
        }
      }
    }`,
    preview
  )
  const entries = await fetchGraphQL(
    `query {
      postCollection(where: { slug_not_in: "${slug}" }, order: date_DESC, preview: ${
      preview ? 'true' : 'false'
    }, limit: 2) {
        items {
          ${POSTS_QUERY}
        }
      }
    }`,
    preview
  )
  return {
    post: extractPost(entry),
    morePosts: extractPostEntries(entries),
  }
}

export async function getAllPostsFromCategory(category, preview) {

  const entries = await fetchGraphQL(
    `query {
      tagCollection(where: { slug: "${category}" }, limit: 1) {
        items {
          linkedFrom {
            postCollection(preview: ${preview ? 'true' : 'false'}) {
              items {
                ${POSTS_QUERY}
              }
            }
          }
        }
      }
    }`,
    preview
  )

  return extractPostsFromCategoryEntries(entries)
    .sort((post1, post2) => Date.parse(post2.date) - Date.parse(post1.date));
}

export async function getCategories() {
  const entries = await fetchGraphQL(
    `query {
      tagCollection {
        items {
          slug
          name
        }
      }
    }`
  )

  return extractCategories(entries);
}

export async function getCategory(category, preview) {

  const entry = await fetchGraphQL(
    `query {
      tagCollection(where: { slug: "${category}" }, limit: 1) {
        items {
          slug
          name
        }
      }
    }`,
    preview
  )

  return extractCategory(entry);
}
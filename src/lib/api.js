const POST_GRAPHQL_FIELDS = `
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
    }
  }
}
`

async function fetchGraphQL(query, preview = false) {
  return fetch(
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
  ).then((response) => response.json())
    .catch((err) => console.log(err))
}

function extractPost(fetchResponse) {
  return fetchResponse?.data?.postCollection?.items?.[0]
}

function extractPostEntries(fetchResponse) {
  return fetchResponse?.data?.postCollection?.items
}

function extractCategories(fetchResponse) {
  return fetchResponse?.data?.tagCollection?.items
}

function extractCategory(fetchResponse) {
  return fetchResponse?.data?.tagCollection?.items?.[0]
}

function extractPostsFromCategoryEntries(fetchResponse) {
  return fetchResponse?.data?.tagCollection?.items?.[0]?.linkedFrom?.postCollection?.items
}

export async function getPreviewPostBySlug(slug) {
  const entry = await fetchGraphQL(
    `query {
      postCollection(where: { slug: "${slug}" }, preview: true, limit: 1) {
        items {
          ${POST_GRAPHQL_FIELDS}
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
          ${POST_GRAPHQL_FIELDS}
        }
      }
    }`
  )
  return extractPostEntries(entries)
}

export async function getAllPostsForHome(preview) {
  const entries = await fetchGraphQL(
    `query {
      postCollection(order: date_DESC, preview: ${preview ? 'true' : 'false'}) {
        items {
          ${POST_GRAPHQL_FIELDS}
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
          ${POST_GRAPHQL_FIELDS}
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
          ${POST_GRAPHQL_FIELDS}
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
                ${POST_GRAPHQL_FIELDS}
              }
            }
          }
        }
      }
    }`,
    preview
  )

  return extractPostsFromCategoryEntries(entries);
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
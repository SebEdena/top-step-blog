import ErrorPage from 'next/error'
import Head from 'next/head'
import { useRouter } from 'next/router'
import Container from '../../components/container'
import Layout from '../../components/layout'
import PageMeta from '../../components/meta/page-meta'
import PostPreview from '../../components/post-preview'
import PostTitle from '../../components/post-title'
import { getAllPostsFromCategory, getCategories, getCategory } from '../../lib/api'

export default function Post({ posts, category, preview }) {
  const router = useRouter()

  if (!router.isFallback && !posts) {
    return <ErrorPage statusCode={404} />
  }

  return (
    <>
      <PageMeta
        url={`/category/${category.slug}`}
        title={category.name}
      />
      <Layout preview={preview}>
        <Container>
          {router.isFallback ? (
            <PostTitle>Loading…</PostTitle>
          ) : (
            <>
              <Head>
                <title>
                  {category.name + " | Top Step" ?? "Top Step"}
                </title>
              </Head>
              <div>
                <h2 className="mb-8 text-3xl md:text-5xl font-bold tracking-tighter leading-tight">
                  Articles de {category.name}
                </h2>
                {
                  posts.map((post) => (
                    <PostPreview
                      key={post.slug}
                      title={post.title}
                      coverImage={post.coverImage}
                      date={post.date}
                      slug={post.slug}
                      tags={post.tags}
                    />
                  ))
                }
              </div>
            </>
          )}
        </Container>
      </Layout>
    </>
  )
}

export async function getStaticProps({ params, preview = false }) {
  const category = await getCategory(params.slug)
  const posts = await getAllPostsFromCategory(params.slug, preview)

  return {
    props: {
      preview,
      category,
      posts: posts ?? null,
    },
    revalidate: 60
  }
}

export async function getStaticPaths() {

  const categories = await getCategories();

  return {
    paths: [
      ...categories.map(category => (
        { params: { slug: category.slug }}
      ))
    ],
    fallback: 'blocking'
  }
}

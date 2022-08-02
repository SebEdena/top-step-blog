import ErrorPage from 'next/error'
import { useRouter } from 'next/router'
import Layout from '../../components/structure/layout'
import PageMeta from '../../components/meta/page-meta'
import PostBody from '../../components/post/post-body'
import PostHeader from '../../components/post/post-header'
import PostTitle from '../../components/post/post-title'
import MoreStories from '../../components/post/more-posts'
import SectionSeparator from '../../components/structure/section-separator'
import { getPostAndMorePosts } from '../../lib/api'

export default function Post({ post, morePosts, preview }) {
  const router = useRouter()

  if (!router.isFallback && !post) {
    return <ErrorPage statusCode={404} />
  }

  return (
    <>
      <PageMeta 
        post
        url={`/posts/${post.slug}`}
        title={post.title}
        description={post.excerpt}
        author={post.author.name}
        date={post.date}
        image={post.coverImage.url}
      />
      <Layout preview={preview}>
        {router.isFallback ? (
          <PostTitle>Loading…</PostTitle>
        ) : (
          <section>
            <article>
              <PostHeader
                title={post.title}
                coverImage={post.coverImage}
                date={post.date}
                author={post.author}
              />
              <PostBody content={post.content} />
            </article>
            <SectionSeparator />
            {morePosts && morePosts.length > 0 && (
              <MoreStories posts={morePosts} />
            )}
          </section>
        )}
      </Layout>
    </>
  )
}

export async function getStaticProps({ params, preview = false }) {
  const data = await getPostAndMorePosts(params.slug, preview)

  return {
    props: {
      preview,
      post: data?.post ?? null,
      morePosts: data?.morePosts ?? null,
    },
  }
}

export async function getStaticPaths() {
  return {
    paths: [],
    fallback: 'blocking'
  }
}

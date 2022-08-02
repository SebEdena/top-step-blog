import MoreStories from '../components/post/more-posts'
import HeroPost from '../components/post/hero-post'
import Layout from '../components/structure/layout'
import { getAllPostsForHome } from '../lib/api'
import PageMeta from '../components/meta/page-meta'

export default function Index({ preview, allPosts }) {
  const heroPost = allPosts[0]
  const morePosts = allPosts.slice(1)
  return (
    <>
      <PageMeta url="/" />
      <Layout preview={preview}>
        {heroPost && (
          <HeroPost
            title={heroPost.title}
            coverImage={heroPost.coverImage}
            date={heroPost.date}
            author={heroPost.author}
            slug={heroPost.slug}
            excerpt={heroPost.excerpt}
            tags={heroPost.tags}
          />
        )}
        {morePosts.length > 0 && <MoreStories posts={morePosts} />}
      </Layout>
    </>
  )
}

export async function getStaticProps({ preview = false }) {
  const allPosts = (await getAllPostsForHome(preview)) ?? []
  return {
    props: { preview, allPosts },
    revalidate: 60,
  }
}

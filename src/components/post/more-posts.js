import PostPreview from './post-preview'

export default function MoreStories({ posts }) {
  return (
    <section className='pt-8 md:pt-12'>
      <h2 className="mb-8 text-5xl md:text-6xl font-bold tracking-tighter leading-tight">
        Autres informations
      </h2>
      <div className="gap-y-20 md:gap-y-32">
        {posts.map((post) => (
          <PostPreview
            key={post.slug}
            title={post.title}
            coverImage={post.coverImage}
            date={post.date}
            slug={post.slug}
            tags={post.tags}
          />
        ))}
      </div>
    </section>
  )
}

import { getAllPostsWithSlug } from '../../lib/api'

export default async function handler(req, res) {
    // Check for secret to confirm this is a valid request
    if (req.query.secret !== process.env.NEXT_PUBLIC_REVALIDATE_TOKEN) {
        return res.status(401).json({ message: 'Invalid token' })
    }
  
    try {
        const posts = await getAllPostsWithSlug();
        await Promise.all(
            posts.map(post => res.unstable_revalidate(`/posts/${post.slug}`))
        )
        return res.json({ revalidated: true })
    } catch (err) {
        // If there was an error, Next.js will continue
        // to show the last successfully generated page
        return res.status(500).send('Error revalidating')
    }
}
import { getAllPostsWithSlug, getCategories } from '../../lib/api'

export default async function handler(req, res) {
    // Check for secret to confirm this is a valid request
    if (req.method === 'POST') {
        
        if (JSON.parse(req.body).secret !== process.env.NEXT_PUBLIC_REVALIDATE_TOKEN) {
            return res.status(401).json({ message: 'Invalid token' })
        }
    
        try {
            const posts = await getAllPostsWithSlug();
            const categories = await getCategories();
            await Promise.all(
                posts.map(post => res.revalidate(`/posts/${post.slug}`))
            )
            await Promise.all(
                categories.map(category => res.revalidate(`/category/${category.slug}`))
            )
            await res.revalidate(`/`)
            return res.json({ revalidated: true })
        } catch (err) {
            // If there was an error, Next.js will continue
            // to show the last successfully generated page
            console.error(err);
            return res.status(500).send('Error revalidating')
        }

    } else {
        return res.status(404).send()
    }
}
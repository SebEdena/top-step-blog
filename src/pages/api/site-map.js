import { SitemapStream, streamToPromise } from "sitemap";
import { Readable } from "stream";
import { getAllPostsWithSlug, getCategories } from '../../lib/api'

const sitemap = async (req, res) => {
    const categories = await getCategories();
    const posts = await getAllPostsWithSlug();

    const links = [
        { url: "/", changefreq: "weekly", priority: 1 },
        ...categories.map(category => ({ url: `/category/${category.slug}`, changefreq: "weekly", priority: 0.75 })),
        ...posts.map(post => ({ url: `/posts/${post.slug}`, changefreq: "hourly", priority: 0.5 }))
    ]

    // Create a stream to write to
    const stream = new SitemapStream({ hostname: process.env.NEXT_PUBLIC_BASE_URL });
  
    res.writeHead(200, {
      "Content-Type": "application/xml",
    });
  
    const xmlString = await streamToPromise(
      Readable.from(links).pipe(stream)
    ).then((data) => data.toString());
  
    res.end(xmlString);
};

export default sitemap;
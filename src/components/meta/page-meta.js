import Head from 'next/head'
import { jsonLdScriptProps } from 'react-schemaorg';

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
const defaultTitle = process.env.NEXT_PUBLIC_SITE_TITLE;
const defaultDescription = process.env.NEXT_PUBLIC_SITE_DESCRIPTION;
const defaultImage = process.env.NEXT_PUBLIC_DEFAULT_IMAGE;

function getJsonLdProps( 
  fullUrl,
  title, 
  description,
  image,
  author,
  date,
  post = false
) {
  if(post) {
    return ({
      ...jsonLdScriptProps({
        "@context": "https://schema.org",
        "@type": "BlogPosting",
        url: fullUrl,
        mainEntityOfPage: fullUrl,
        headline: title,
        datePublished: date,
        author: author,
        image: image,
        description: description
      })
    })
  } else {
    return ({
      ...jsonLdScriptProps({
        "@context": "https://schema.org",
        "@type": "WebPage",
        url: fullUrl,
        headline: title,
        image: image,
        description: description
      })
    })
  }
}

export default function PageMeta({ 
  url,
  title, 
  description,
  image,
  author,
  date,
  post = false
}) {

  const computedTitle = title ? [title, defaultTitle].join(' | ') : defaultTitle;
  const computedDescription = description ? description : defaultDescription;
  const computedImageSrc = image ? image : baseUrl + defaultImage;
  const computedUrl = baseUrl + url;
  
  return (

    <Head>
      { /* General info */ }
      <title>{computedTitle}</title>
      <meta name="description" content={computedDescription} />
      { author ? <meta name="author" content={author} /> : null }
      <link rel="canonical" href={computedUrl} />

      { /* Open Graph / Facebook */ }
      <meta name="og:type" content={ post ? "article" : "website" } />
      <meta name="og:url" content={computedUrl} />
      <meta name="og:site_name" content={defaultTitle} />
      <meta name="og:title" content={computedTitle} />
      <meta name="og:description" content={computedDescription} />
      <meta name="og:image" content={computedImageSrc} />
      { 
        post ? (
          <meta name="article:published_time" content={date} />
        ) : null
      }

      { /* Twitter Card */ }
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content="@SebEdena" />
      <meta name="twitter:url" content={computedUrl} />
      <meta name="twitter:title" content={computedTitle} />
      <meta name="twitter:description" content={computedDescription} />
      <meta name="twitter:image" content={computedImageSrc} />

      { /* JSON-Ld */ }
      <script
        { 
          ...getJsonLdProps(
            computedUrl,
            computedTitle,
            computedDescription,
            computedImageSrc,
            author,
            date,
            post
          )
        }
      />
    </Head>
  )
}

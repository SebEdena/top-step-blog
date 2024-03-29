import ContentfulImage from './contentful-image'
import Link from 'next/link'
import cn from 'classnames'

export default function CoverImage({ imgClasses = '', title, url, slug }) {
  const image = (
    <ContentfulImage
      width={1000}
      height={700}
      alt={title}
      className={cn('cover-image shadow-small', imgClasses, {
        'hover:shadow-medium transition-shadow duration-200': slug,
      })}
      src={url}
      sizes='75vw'
      quality={100}
      priority
    />
  )

  return (
    <div className="sm:mx-0">
      {slug ? (
        <Link href={`/posts/${slug}`}>
          <a aria-label={title}>{image}</a>
        </Link>
      ) : (
        image
      )}
    </div>
  )
}

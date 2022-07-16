import Link from 'next/link'
import DateComponent from '../components/date'
import ContentfulImage from './contentful-image'
import Tag from './tag'

export default function PostPreview({
  title,
  coverImage,
  date,
  slug,
  tags
}) {
  return (
    <div className="grid grid-cols-3 lg:grid-cols-4 2xl:grid-cols-5 mb-3 shadow-md bg-white rounded-md text-xs h-32">
      <Link href={`/posts/${slug}`}>
        <a aria-label={title}>
          <ContentfulImage 
            className='rounded-l-md cursor-pointer' 
            layout="fill"
            title={title}
            alt={title}
            slug={slug}
            src={coverImage.url}
            sizes="30vw"
          />
        </a>
      </Link>
      <div className='p-3 md:p-5 col-span-2 lg:col-span-3 2xl:col-span-4 flex flex-col gap-2'>
        <h3 className="mb-2 flex-grow leading-snug text-sm md:text-md">
          <Link href={`/posts/${slug}`}>
            <a className="hover:underline">{title}</a>
          </Link>
        </h3>
        <div className="flex flex-row justify-between">
          <Tag tag={tags[0]} />
          <DateComponent dateString={date} />
        </div>
      </div>
    </div>
  )
}

import Link from 'next/link'
import Avatar from '../components/avatar'
import Tag from '../components/tag'
import DateComponent from '../components/date'
import CoverImage from '../components/cover-image'

export default function HeroPost({
  title,
  coverImage,
  date,
  slug,
  tags,
}) {
  return (
    <section className='shadow-lg'>
      <div className='relative'>
        <CoverImage imgClasses="rounded-md" title={title} slug={slug} url={coverImage.url} />
        <div className="bottom-0 absolute w-full">
          <div className="gradient h-16 from-black/80 to-black/0 bg-gradient-to-t"></div>
          <div className='p-4 md:p-8 pt-0 md:pt-0 rounded-b-md text-white bg-black/80'>
            <h3 className="text-xl lg:text-3xl leading-tight">
              <Link href={`/posts/${slug}`}>
                <a className="hover:underline decoration-2">{title}</a>
              </Link>
            </h3>
            <div className="mt-4 text-md lg:text-lg flex flex-row justify-between">
              <Tag tag={tags[0]} />
              <DateComponent dateString={date} />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

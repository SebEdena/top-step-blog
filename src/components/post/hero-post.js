import Link from 'next/link'
import Tag from '../common/tag'
import DateComponent from '../common/date'
import CoverImage from '../image/cover-image'

export default function HeroPost({
  title,
  coverImage,
  date,
  slug,
  tags,
}) {
  return (
    <section className='shadow-lg'>
      <article className='relative'>
        <CoverImage imgClasses="rounded-md" title={title} slug={slug} url={coverImage.url} />
        <div className="bottom-0 absolute w-full">
          <div className="gradient h-6 md:h-16 from-black/80 to-black/0 bg-gradient-to-t"></div>
          <div className='p-3 md:p-8 pt-0 md:pt-0 rounded-b-md text-white bg-black/80'>
            <h3 className="text-sm md:text-xl lg:text-3xl leading-tight">
              <Link href={`/posts/${slug}`}>
                <a className="hover:underline decoration-2">{title}</a>
              </Link>
            </h3>
            <div className="mt-4 text-xs md:text-md lg:text-lg flex flex-row justify-between">
              <Tag tag={tags[0]} />
              <DateComponent dateString={date} />
            </div>
          </div>
        </div>
      </article>
    </section>
  )
}

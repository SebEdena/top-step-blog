import Avatar from '../common/avatar'
import DateComponent from '../common/date'
import CoverImage from '../image/cover-image'
import PostTitle from './post-title'

export default function PostHeader({ title, coverImage, date, author }) {
  return (
    <>
      <PostTitle>{title}</PostTitle>
      <div className="flex flex-row justify-between mb-6 lg:mb-12 mx-auto">
        <div>
          {author && <Avatar name={author.name} picture={author.picture} />}
        </div>
        <div className='my-auto'>
          <DateComponent dateString={date} />
        </div>
      </div>
      <div className="mb-8 md:mb-16 sm:mx-0">
        <CoverImage title={title} url={coverImage.url} imgClasses="rounded-md"/>
      </div>
    </>
  )
}

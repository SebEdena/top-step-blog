import Link from 'next/link'

export default function Tag({ tag }) {
  return (
    <div className='flex flex-row gap-3'>
      <div className='w-1 h-full rounded-sm bg-primary'></div>
      <Link href={`/category/${tag.slug}`}>
        <a className="hover:underline">{tag.name}</a>
      </Link>
    </div>
  )
}

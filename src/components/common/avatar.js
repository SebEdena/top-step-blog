import ContentfulImage from '../image/contentful-image'

export default function Avatar({ name, picture }) {
  return (
    <div className="flex items-center">
      <div className="relative w-8 h-8 lg:w-12 lg:h-12 mr-4">
        <ContentfulImage
          src={picture.url}
          width={120}
          height={120}
          className="rounded-full"
          alt={name}
        />
      </div>
      <div className="text-md lg:text-xl font-bold">{name}</div>
    </div>
  )
}

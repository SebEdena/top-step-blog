import ContentfulImage from './contentful-image'

export default function RichTextAsset({ id, assets }) {
  const asset = assets?.find((asset) => asset.sys.id === id)

  if (asset?.url) {
    return (
      <div className='my-1 w-full max-w-full h-auto'>
        <ContentfulImage 
          layout="responsive"
          className="object-fill"
          width={1200}
          height={800}
          src={asset.url} 
          alt={asset.description}
        />
      </div>
    )
  }

  return null
}

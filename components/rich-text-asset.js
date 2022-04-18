import ContentfulImage from './contentful-image'
import markdownStyles from './markdown-styles.module.css'

export default function RichTextAsset({ id, assets }) {
  const asset = assets?.find((asset) => asset.sys.id === id)

  if (asset?.url) {
    return (
      <div className={markdownStyles['rich-text-image']}>
        <ContentfulImage src={asset.url} layout="fill" alt={asset.description}/>
      </div>
    )
  }

  return null
}

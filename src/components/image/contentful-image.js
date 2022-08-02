import Image from 'next/future/image'

const contentfulLoader = ({ src, width, quality }) => {
  return `${src}?fm=webp&w=${width}&q=${quality || 75}`
}

const ContentfulImage = (props) => {
  return (
    <Image 
      loader={contentfulLoader}
      layout="responsive"
      placeholder='blur'
      blurDataURL={
        contentfulLoader({src: props.src, width: 10, quality: 20})
      }
      alt={props.alt ?? ''}
      {...props}
    />
  )
}

export default ContentfulImage

import Image from 'next/image'

const contentfulLoader = ({ src, width, quality }) => {
  return `${src}?w=${width}&q=${quality || 75}`
}

const ContentfulImage = (props) => {
  return (
    <div className='relative h-full w-full'>
      <Image 
        loader={contentfulLoader} 
        objectFit="cover" 
        layout="responsive"
        placeholder='blur'
        blurDataURL={
          contentfulLoader({src: props.src, width: 10, quality: 20})
        }
        {...props}
      />
    </div>
  )
}

export default ContentfulImage

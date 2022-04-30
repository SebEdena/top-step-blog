import { documentToReactComponents } from '@contentful/rich-text-react-renderer'
import { BLOCKS } from '@contentful/rich-text-types'
import markdownStyles from '../styles/markdown-styles.module.css'
import RichTextAsset from './rich-text-asset'
import Youtube from './social-media/youtube'
import Twitter from './social-media/twitter'

const customMarkdownOptions = (content) => ({
  renderNode: {
    [BLOCKS.EMBEDDED_ASSET]: (node) => (
      <RichTextAsset
        id={node.data.target.sys.id}
        assets={content.links.assets.block}
      />
    ),
    [BLOCKS.EMBEDDED_ENTRY]: (node) => {
      const embedId = node.data.target.sys.id;
      const embed = content.links.entries.block.find(entry => entry.sys.id === embedId)
      if(embed) {
        switch(embed.__typename) {
          case "SocialMedia": {
            switch(embed.origin) {
              case "twitter": return <Twitter link={embed.link} />;
              case "youtube": return <Youtube link={embed.link} />;
              default: return null;
            }
          }
        }
        return null;
      } else {
        return null;
      }
    }
  },
})

export default function PostBody({ content }) {
  return (
    <div className="max-w-2xl mx-auto">
      <div className={markdownStyles['markdown']}>
        {documentToReactComponents(
          content.json,
          customMarkdownOptions(content)
        )}
      </div>
    </div>
  )
}

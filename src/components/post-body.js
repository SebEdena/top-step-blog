import { documentToReactComponents } from '@contentful/rich-text-react-renderer'
import { BLOCKS, INLINES } from '@contentful/rich-text-types'
import markdownStyles from '../styles/markdown-styles.module.css'
import RichTextAsset from './rich-text-asset'
import Youtube from './social-media/youtube'
import Twitter from './social-media/twitter'

const renderAsset = (node, content) => (
  <RichTextAsset
    id={node.data.target.sys.id}
    assets={content.links.assets.block}
  />
)

const renderEntry = (node, entryList) => {
  const embedId = node.data.target.sys.id;
  const embed = entryList.find(entry => entry.sys.id === embedId)
  if(embed) {
    switch(embed.__typename) {
      case "SocialMedia": {
        const url = new URL(embed.link);
        switch(url.hostname) {
          case "youtu.be": 
          case "www.youtube.com": return <Youtube link={embed.link} />;
          case "twitter.com": return <Twitter link={embed.link} />;
          default: return null;
        }
      }
    }
    return null;
  } else {
    return null;
  }
}

const customMarkdownOptions = (content) => ({
  renderNode: {
    [BLOCKS.EMBEDDED_ASSET]: (node) => renderAsset(node, content),
    [INLINES.EMBEDDED_ENTRY]: (node) => renderEntry(node, content.links.entries.inline),
    [BLOCKS.EMBEDDED_ENTRY]: (node) => renderEntry(node, content.links.entries.block)
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

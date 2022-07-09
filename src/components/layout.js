import Header from '../components/header'
import GoToTop from './go-to-top'
import SiteMeta from './meta/site-meta'

export default function Layout({ preview, children }) {
  return (
    <>
      <SiteMeta />
      <Header />
      <div className="w-12/12 md:w-10/12 lg:w-8/12 xl:w-6/12 mt-20 mt:my-28 mb-8 mx-auto">
        <main>{children}</main>
      </div>
    </>
  )
}

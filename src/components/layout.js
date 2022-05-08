import Header from '../components/header'
import Footer from '../components/footer'
import SiteMeta from './meta/site-meta'

export default function Layout({ preview, children }) {
  return (
    <>
      <SiteMeta />
      <Header />
      <div className="min-h-screen mt-14">
        <main>{children}</main>
      </div>
      <Footer />
    </>
  )
}

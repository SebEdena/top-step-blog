import Head from 'next/head'

export default function SiteMeta() {
  return (
    <Head>
      <link
        rel="apple-touch-icon"
        sizes="192x192"
        href="/favicon/mobile_192.png"
      />
      <link rel="manifest" href="/favicon/site.webmanifest" />
      <link
        rel="mask-icon"
        href="/favicon/mobile_512.png"
        color="#000000"
      />
      <link rel="shortcut icon" href="/favicon/favicon.svg" />
      <meta name="msapplication-TileColor" content="#3b82f6" />
      <meta name="msapplication-config" content="/favicon/browserconfig.xml" />
      <meta name="theme-color" content="#3b82f6" />
      <link rel="alternate" type="application/rss+xml" href="/feed.xml" />
      <link rel='icon' href='/favicon/favicon.svg'></link>
    </Head>
  )
}

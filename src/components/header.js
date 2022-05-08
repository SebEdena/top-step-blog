import Image from 'next/image'
import Link from 'next/link'

export default function Header() {

  const links = [
    { label: "Formule 1", path: "/category/formule-1" },
    { label: "Formule 2", path: "/category/formule-2" },
    { label: "Formule 3", path: "/category/formule-3" },
    { label: "Formule E", path: "/category/formule-e" },
  ]

  return (
    <nav className="w-full h-14 top-0 left-0 right-0 sticky shadow-md z-50 bg-blue-500">
      <div className='pl-4 pr-4 flex flex-row h-full w-full'>
        <div className='flex flex-row items-center justify-center gap-4 w-48 shrink-0'>
          <div className='h-9 w-12'>
            <Link href="/" passHref>
              <a>
                <Image src="/img/svg/logo_white.svg"
                  height={80} width={100} layout='responsive' alt=""/>
              </a>
            </Link>
          </div>
          <Link href="/" passHref>
            <a className='text-white font-extrabold text-2xl italic'>
              Top Step
            </a>
          </Link>
        </div>
        <div className='text-white flex-1 flex flex-row justify-center items-center gap-8'>
          {
            links.map(link => (
              <Link href={link.path} key={link.path} passHref>
                <a>{link.label}</a>
              </Link>
            ))
          }
        </div>
        <div className='w-48'></div>
      </div>
    </nav>
  )
}

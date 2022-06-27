import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'

import cn from "classnames"

export default function Header() {

  const links = [
    { label: "Formule 1", path: "/category/formule-1" },
    { label: "Formule 2", path: "/category/formule-2" },
    { label: "Formule 3", path: "/category/formule-3" },
    { label: "Formule E", path: "/category/formule-e" },
  ]

  const [sideMenuOpened, triggerSideMenu] = useState(false);

  return (
    <div>
      <nav className="w-full h-14 top-0 left-0 right-0 fixed shadow-md z-40 bg-primary">
        <div className='pl-4 pr-4 flex flex-row items-center justify-center h-full w-full'>
          <div className='flex justify-center items-center lg:hidden w-12 h-full m-auto'>
            <div className="space-y-[5px] p-2 rounded-lg m-auto hover:bg-white hover:bg-opacity-10 cursor-pointer"
              onClick={() => triggerSideMenu(true)}>
              <div className="w-6 h-0.5 bg-white"></div>
              <div className="w-6 h-0.5 bg-white"></div>
              <div className="w-6 h-0.5 bg-white"></div>
            </div>
          </div>
          <div className='flex flex-row flex-grow lg:flex-grow-0 items-center justify-center gap-4 w-48 shrink-0'>
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
          <div className='hidden lg:flex flex-1 flex-row justify-center items-center gap-8 text-white '>
            {links.map(link => (
              <Link href={link.path} key={link.path} passHref>
                <a className='hover:underline'>{link.label}</a>
              </Link>
            ))}
          </div>
          <div className='w-12 lg:w-48'></div>
        </div>
      </nav>
      <div className={cn(
        'transition-transform ease-in-out duration-500 w-72 h-full fixed top-0 left-0 shadow-md bg-accent text-grey z-50',
        sideMenuOpened ? 'translate-x-0' : '-translate-x-72'
        )}>
        <div className='p-4 flex flex-row items-center justify-between'>
          <button
            className='w-8 h-8 rounded-md bg-white bg-opacity-0 hover:bg-opacity-10 font-bold'
            onClick={() => triggerSideMenu(false)}>
            x
          </button>
          <div className='w-12'>
            <Image src="/img/svg/logo_white.svg"
                    height={80} width={100} layout='responsive' objectFit='contain' alt=""/>
          </div>
        </div>
        <div className='pl-8'>
          <h1 className='text-2xl font-bold pb-4'>Catégories</h1>
          <ul className='pl-4'>
            {links.map(link => (
              <li key={link.path} onClick={() => triggerSideMenu(false)} className="pb-4 text-lg font-bold hover:underline">
                <Link href={link.path} passHref>
                  <a>{link.label}</a>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}

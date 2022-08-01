import { useEffect, useState } from 'react'
import cn from 'classnames'

export default function GoToTop() {
  
  const [displayGoTop, setDisplayGoTop] = useState(false)

  const handleVisibleButton = () => {
    setDisplayGoTop(window.pageYOffset > 50)
  }

  const handleScrollUp = () => {
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth'})
  }

  useEffect(() => {
    window.addEventListener('scroll', handleVisibleButton)
  }, [])

  return (
    <div className={cn((displayGoTop ? 'block' : 'hidden'), 'fixed bottom-0 right-0 p-4')}>
      <button type='button' className='p-2 rounded-lg bg-primary hover:bg-primary/80' onClick={handleScrollUp}>
        <svg height={25} width={25} viewBox="0 0 330 330">
          <path fill="rgb(255,255,255)" d="M325.606,229.393l-150.004-150C172.79,76.58,168.974,75,164.996,75c-3.979,0-7.794,1.581-10.607,4.394
            l-149.996,150c-5.858,5.858-5.858,15.355,0,21.213c5.857,5.857,15.355,5.858,21.213,0l139.39-139.393l139.397,139.393
            C307.322,253.536,311.161,255,315,255c3.839,0,7.678-1.464,10.607-4.394C331.464,244.748,331.464,235.251,325.606,229.393z"/>
        </svg>
      </button>
    </div>
  )
}

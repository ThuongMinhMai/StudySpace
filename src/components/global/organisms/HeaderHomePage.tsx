import { TableOfContents, X } from 'lucide-react'
import React, { useEffect, useRef, useState } from 'react'
import { Search } from 'lucide-react'
import './HeaderHomePage.css'
import HoverButton from '../molecules/HoverButton'
import ImageSlider from '../molecules/ImageSlider'
function HeaderHomePage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const searchRef = useRef<HTMLDivElement | null>(null)
  const handleMenuToggle = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  const closeMenu = () => {
    setIsMenuOpen(false)
  }

  const handleSearchToggle = () => {
    setIsSearchOpen((prev) => !prev)
  }

  const handleClickOutside = (event: MouseEvent) => {
    if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
      setIsSearchOpen(false)
    }
  }

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  return (
    <header className='header overflow-hidden'>
      <nav className=''>
        <div className='nav__bar p-4 flex items-center justify-between gap-8 bg-[#647C6C] '>
          <div className=''>
            {isMenuOpen ? (
              <p className='font-greatvibes text-5xl text-white'>StudySpace</p>
            ) : (
              <p className='font-greatvibes text-5xl mr-3 text-[#3D4449]'>StudySpace</p>
            )}
          </div>
          <div className='nav__menu__btn text-xl text-white cursor-pointer' id='menu-btn' onClick={handleMenuToggle}>
            <div>{isMenuOpen ? <X className='w-6 h-6' /> : <TableOfContents className='w-6 h-6' />}</div>
          </div>
        </div>
        <ul
          className={`list-none text-sm text-[#3D4449] absolute w-full p-8 flex flex-col items-center gap-8 font-medium bg-[#647C6C]/90 -translate-y-full transition-transform duration-500 z-[-1] nav__links ${isMenuOpen ? 'translate-y-0' : '-translate-y-full'}`}
          id='nav-links'
          onClick={closeMenu}
        >
          <li>
            <a
              className={`relative isolate pb-2 transition-all duration-300 ${isMenuOpen ? 'text-white' : ''}`}
              href='#home'
            >
              Home
            </a>
          </li>
          <li>
            <a
              className={`relative isolate pb-2 text-nowrap transition-all duration-300 ${isMenuOpen ? 'text-white' : ''}`}
              href='#about'
            >
              About Us
            </a>
          </li>
          <li>
            <a
              className={`relative isolate pb-2 transition-all duration-300 ${isMenuOpen ? 'text-white' : ''}`}
              href='#service'
            >
              Features
            </a>
          </li>

          <li>
            <a
              className={`relative isolate pb-2 transition-all duration-300 ${isMenuOpen ? 'text-white' : ''}`}
              href='#room'
            >
              Explore
            </a>
          </li>
          <li>
            <a
              className={`relative isolate pb-2 transition-all duration-300 ${isMenuOpen ? 'text-white' : ''}`}
              href='#explore'
            >
              Offer
            </a>
          </li>
          <li>
            <a
              className={`relative isolate pb-2 transition-all duration-300 ${isMenuOpen ? 'text-white' : ''}`}
              href='#explore'
            >
              Testimonial
            </a>
          </li>
          <li>
            <a
              className={`relative isolate pb-2 transition-all duration-300 ${isMenuOpen ? 'text-white' : ''}`}
              href='#contact'
            >
              Contact
            </a>
          </li>
          <li>
            <a
              className={`relative isolate pb-2 transition-all duration-300 ${isMenuOpen ? 'text-white' : ''}`}
              href='#contact'
            >
              FAQ
            </a>
          </li>
        </ul>
        <div className='flex  gap-5 justify-center items-center'>
          <div className='relative' ref={searchRef}>
            <input type='text' className={`search-input ${isSearchOpen ? 'open' : ''}`} placeholder='Search...' />

            <div className={`h-fit p-2 rounded-full search-icon ${isSearchOpen ? '' : 'bg-[#C6A083]/60'}`}>
              {isSearchOpen ? (
                <X strokeWidth={1} className='' onClick={() => setIsSearchOpen(false)} />
              ) : (
                <Search strokeWidth={1} className='' onClick={handleSearchToggle} />
              )}
            </div>
          </div>
          <button className='nav__btn hidden text-nowrap bg-[#D1C6B9] px-10 py-2 rounded-full'>Sign In</button>
        </div>
      </nav>

      <div className='section__container header__container' id='home'>
        <p
          className='font-paytoneone mb-4 text-center relative'
          style={{
            background: 'linear-gradient(90deg, #464C52, #C6A083)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent'
          }}
        >
          <span className='absolute top-40 left-4 w-[120px] h-[120px] bg-white/70 rounded-full blur-[25px] -translate-x-1/2 -translate-y-1/2'></span>
          <span>StudySpace.</span>
        </p>

        <div className='flex justify-between items-center mt-10'>
          <p className='text-[#464C52] w-2/5 text-justify'>
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Beatae, asperiores placeat, repellat officia
            possimus fuga voluptate facere distinctio modi, molestiae iure fugit voluptatum ipsum quibusdam praesentium
            nam aut. Atque, odit.
          </p>
          {/* <HoverButton
          src="https://cafedirect.co.nz/wp-content/uploads/2022/05/Cafe-Direct-Why-Us-930x1024.png"
          alt="Image 1"
          className="w-96" // Adjust size as needed
        /> */}
  
          <div className='absolute right-56 top-64'>
            {/* <img
              className='w-96'
              src='https://cafedirect.co.nz/wp-content/uploads/2022/05/Cafe-Direct-Why-Us-930x1024.png'
            ></img> */}
              <ImageSlider />
          </div>
        </div>
      </div>
    </header>
  )
}

export default HeaderHomePage

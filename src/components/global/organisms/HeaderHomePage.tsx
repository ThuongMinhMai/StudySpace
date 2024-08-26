import { TableOfContents, X } from 'lucide-react'
import React, { useEffect, useRef, useState } from 'react'
import { Search } from 'lucide-react'
import "./HeaderHomePage.css"
function HeaderHomePage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const searchRef = useRef<HTMLDivElement | null>(null);
  const handleMenuToggle = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  const closeMenu = () => {
    setIsMenuOpen(false)
  }



  const handleSearchToggle = () => {
    setIsSearchOpen(prev => !prev);
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
      setIsSearchOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);
  return (
    <header className='header'>
      <nav className=' '>
        <div className='nav__bar p-4 flex items-center justify-between gap-8 bg-[#647C6C] '>
          <div className=''>
            {isMenuOpen ? (
              <p className='font-greatvibes text-5xl text-white'>StudySpace</p>
            ) : (
              <p className='font-greatvibes text-5xl'>StudySpace</p>
            )}
          </div>
          <div className='nav__menu__btn text-xl text-white cursor-pointer' id='menu-btn' onClick={handleMenuToggle}>
            <div>{isMenuOpen ? <X className='w-6 h-6' /> : <TableOfContents className='w-6 h-6' />}</div>
          </div>
        </div>
        <ul
          className={`list-none text-sm absolute w-full p-8 flex flex-col items-center gap-8 font-medium bg-[#647C6C]/90 -translate-y-full transition-transform duration-500 z-[-1] nav__links ${isMenuOpen ? 'translate-y-0' : '-translate-y-full'}`}
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
              className={`relative isolate pb-2 transition-all duration-300 ${isMenuOpen ? 'text-white' : ''}`}
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
            <input
              type='text'
              className={`search-input ${isSearchOpen ? 'open' : ''}`}
              placeholder='Search...'
            />
            {/* <Search
              strokeWidth={1}
              className='search-icon'
              onClick={handleSearchToggle}
            /> */}
             {isSearchOpen ? (
              <X
                strokeWidth={1}
                className="search-icon"
                onClick={()=>setIsSearchOpen(false)}
              />
            ) : (
              <Search
                strokeWidth={1}
                className="search-icon"
                onClick={handleSearchToggle}
              />
            )}
          </div>
          <button className='nav__btn hidden bg-[#D1C6B9] px-10 py-2 rounded-full'>Sign In</button>
        </div>
      </nav>

      <div className='section__container  header__container' id='home'>
        <p className='mb-4 text-[1.2rem] text-white text-center opacity-60'>Simple - Unique - Friendly</p>
        <h1 className='text-[4rem] font-medium leading-[4.5rem] text-white text-center'>
          Find Your Flow: <span>Study</span>,<span> Meet</span>
          <br /> and <span>Sip Coffee</span>.{' '}
        </h1>
      </div>
    </header>
  )
}

export default HeaderHomePage

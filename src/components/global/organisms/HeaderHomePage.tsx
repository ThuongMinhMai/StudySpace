import { Search, TableOfContents, X } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import ImageSlider from '../molecules/ImageSlider'
import './HeaderHomePage.css'
import logo from '../../../assets/LOGO SS ()-01.png'
import logo1 from '../../../assets/LOGO SS-01.png'
import SearchPage from './SearchPage'
import { Link } from 'react-router-dom'
function HeaderHomePage({ isSearchOpen, toggleSearch }: any) {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  // const [isSearchOpen, setIsSearchOpen] = useState(false)
  const searchRef = useRef<HTMLDivElement | null>(null)
  const [isScrolled, setIsScrolled] = useState(false) // State to track scroll position
  const handleMenuToggle = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  const closeMenu = () => {
    setIsMenuOpen(false)
  }

  // const handleSearchToggle = () => {
  //   setIsSearchOpen((prev) => !prev)
  // }

  const handleClickOutside = (event: MouseEvent) => {
    if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
      // setIsSearchOpen(false)
    }
  }

  // useEffect(() => {
  //   document.addEventListener('mousedown', handleClickOutside)
  //   return () => {
  //     document.removeEventListener('mousedown', handleClickOutside)
  //   }
  // }, [])

  const handleScroll = () => {
    // Set isScrolled to true if scrolled more than 50 pixels
    setIsScrolled(window.scrollY > 50)
  }
  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside)
    window.addEventListener('scroll', handleScroll) // Add scroll event listener
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
      window.removeEventListener('scroll', handleScroll) // Cleanup on component unmount
    }
  }, [])
  return (
    <div>
      {isSearchOpen && <SearchPage isSearchOpen={isSearchOpen} toggleSearch={toggleSearch} />}

      <header className='header overflow-hidden'>
        {/* <nav className='z-50 fixed top-0 left-0 right-0  '> */}
        <nav
          className={`z-50 fixed top-0 left-0 right-0 transition-colors duration-300 w-full md:bg-transparent ${
            isScrolled ? 'lg:bg-[#f2ede7]/95 rounded-full' : 'bg-transparent'
          }`}
        >
          <div className='nav__bar p-4 flex items-center justify-between gap-8 bg-[#647C6C] '>
            <div className=''>
              {isMenuOpen ? (
                // <p className='font-greatvibes text-5xl text-white'>StudySpace</p>
                <img className='max-h-16 ml-10 z-100 my-auto w-auto object-contain' src={logo1} alt='logo' />
              ) : (
                // <p className='font-greatvibes text-5xl mr-3 text-[#3D4449]'>StudySpace</p>
                <img className='max-h-16 ml-10 w-auto my-auto -mt-4 object-contain' src={logo} alt='logo' />
              )}
            </div>
            <div className='nav__menu__btn text-xl text-white cursor-pointer' id='menu-btn' onClick={handleMenuToggle}>
              <div>{isMenuOpen ? <X className='w-6 h-6' /> : <TableOfContents className='w-6 h-6' />}</div>
            </div>
          </div>
          <ul
            className={`list-none text-sm py-10 gap-10  text-[#3D4449] absolute w-full flex flex-col items-center lg:gap-10 md:gap-4 sm:gap-10 font-medium bg-[#647C6C]/90 -translate-y-full transition-transform duration-500 z-[-1] nav__links ${isMenuOpen ? 'translate-y-0' : '-translate-y-full'}`}
            id='nav-links'
            onClick={closeMenu}
          >
            <li>
              <a
                className={`relative cursor-pointer isolate pb-2 transition-all duration-300 ${isMenuOpen ? 'text-white' : ''}`}
                // href='#home'
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
                href='#feature'
              >
                Features
              </a>
            </li>

            <li>
              <a
                className={`relative isolate pb-2 transition-all duration-300 ${isMenuOpen ? 'text-white' : ''}`}
                href='#explore'
              >
                Explore
              </a>
            </li>
            <li>
              <a
                className={`relative isolate pb-2 transition-all duration-300 ${isMenuOpen ? 'text-white' : ''}`}
                href='#offer'
              >
                Offer
              </a>
            </li>
            <li>
              <a
                className={`relative isolate pb-2 transition-all duration-300 ${isMenuOpen ? 'text-white' : ''}`}
                href='#testimonial'
              >
                Testimonial
              </a>
            </li>
            <li>
              <a
                className={`relative isolate pb-2 transition-all duration-300 ${isMenuOpen ? 'text-white' : ''}`}
                href='#faq'
              >
                FAQ
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
          </ul>
          <div className='flex gap-5 justify-center items-center'>
            <div
              className='relative'
              // ref={searchRef}
            >
              {/* <input type='text' className={`search-input ${isSearchOpen ? 'open' : ''}`} placeholder='Search...' /> */}

              <div className={`h-fit p-2 rounded-full search-icon ${isSearchOpen ? '' : 'bg-[#C6A083]/60'}`}>
                {/* {isSearchOpen ? ( */}
                {/* <X strokeWidth={1} className='' onClick={() => setIsSearchOpen(false)} /> */}
                {/* ) : ( */}
                {/* <Link to="/search"> */}
                <Search strokeWidth={1} className='' onClick={toggleSearch} />
                {/* </Link> */}
                {/* )} */}
              </div>
            </div>
            <Link className='nav__btn hidden text-nowrap bg-[#D1C6B9] px-10 py-2 rounded-full hover:bg-[#efd2af] transition-all' to="/signin">Sign In</Link>
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
            <span className=''>StudySpace.</span>
          </p>

          <div className='flex justify-between items-center mt-10'>
            <p className='text-[#464C52] w-2/5 text-justify'>
              Study Space is an innovative platform providing flexible, affordable study and group workspaces tailored
              for students. With a focus on quiet, distraction-free environments, it offers the convenience of online
              booking and professional amenities to enhance productivity.
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
    </div>
  )
}

export default HeaderHomePage

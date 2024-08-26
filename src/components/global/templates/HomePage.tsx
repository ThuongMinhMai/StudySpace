import React, { useState } from 'react'
import ScrollReveal from 'scrollreveal'
// import './style.css';
import logoMini from '../../../assets/logoMini.png'
import about from '../../../assets/about.jpg'
import facebook from '../../../assets/facebook.png'
import instagram from '../../../assets/instagram.png'
import youtube from '../../../assets/youtube.png'
import twitter from '../../../assets/twitter.png'
import room1 from '../../../assets/room-1.jpg'
import room2 from '../../../assets/room-2.jpg'
import room3 from '../../../assets/room-3.jpg'
import { TableOfContents } from 'lucide-react'
import { X } from 'lucide-react'
import { CalendarDays } from 'lucide-react'
const HomePage = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const handleMenuToggle = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  const closeMenu = () => {
    setIsMenuOpen(false)
  }

  // ScrollReveal animation setup
  // React.useEffect(() => {
  //   const scrollRevealOption = {
  //     distance: '50px',
  //     origin: 'bottom',
  //     duration: 1000
  //   }

  //   ScrollReveal().reveal('.header__container p', {
  //     ...scrollRevealOption
  //   })

  //   ScrollReveal().reveal('.header__container h1', {
  //     ...scrollRevealOption,
  //     delay: 500
  //   })

  //   ScrollReveal().reveal('.about__image img', {
  //     ...scrollRevealOption,
  //     origin: 'left'
  //   })

  //   ScrollReveal().reveal('.about__content .section__subheader', {
  //     ...scrollRevealOption,
  //     delay: 500
  //   })

  //   ScrollReveal().reveal('.about__content .section__header', {
  //     ...scrollRevealOption,
  //     delay: 1000
  //   })

  //   ScrollReveal().reveal('.about__content .section__description', {
  //     ...scrollRevealOption,
  //     delay: 1500
  //   })

  //   ScrollReveal().reveal('.about__btn', {
  //     ...scrollRevealOption,
  //     delay: 2000
  //   })

  //   ScrollReveal().reveal('.room__card', {
  //     ...scrollRevealOption,
  //     interval: 500
  //   })

  //   ScrollReveal().reveal('.service__list li', {
  //     ...scrollRevealOption,
  //     interval: 500,
  //     origin: 'right'
  //   })
  // }, [])
  React.useEffect(() => {
    const scrollRevealOption = {
      distance: '50px',
      origin: 'bottom',
      duration: 1000
    }

    const revealElements = [
      { selector: '.header__container p', options: { ...scrollRevealOption } },
      { selector: '.header__container h1', options: { ...scrollRevealOption, delay: 500 } },
      { selector: '.about__image img', options: { ...scrollRevealOption, origin: 'left' } },
      { selector: '.about__content .section__subheader', options: { ...scrollRevealOption, delay: 500 } },
      { selector: '.about__content .section__header', options: { ...scrollRevealOption, delay: 1000 } },
      { selector: '.about__content .section__description', options: { ...scrollRevealOption, delay: 1500 } },
      { selector: '.about__btn', options: { ...scrollRevealOption, delay: 2000 } },
      { selector: '.room__card', options: { ...scrollRevealOption, interval: 500 } },
      { selector: '.service__list li', options: { ...scrollRevealOption, interval: 500, origin: 'right' } }
    ]

    revealElements.forEach(({ selector, options }) => {
      ScrollReveal().reveal(selector, options)
    })

    // Cleanup function
    return () => {
      revealElements.forEach(({ selector }) => {
        const elements = document.querySelectorAll(selector)
        elements.forEach((el) => {
          const htmlElement = el as HTMLElement
          htmlElement.style.opacity = ''
          htmlElement.style.transform = ''
        })
      })
    }
  }, [])

  return (
    <div>
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
              {/* <i className={isMenuOpen ? 'ri-close-line' : 'ri-menu-line'}></i> */}
              <div>{isMenuOpen ? <X className='w-6 h-6' /> : <TableOfContents className='w-6 h-6' />}</div>
            </div>
          </div>
          <ul
            className={`list-none absolute w-full p-8 flex flex-col items-center gap-8 bg-[#647C6C]/90 -translate-y-full transition-transform duration-500 z-[-1] nav__links ${isMenuOpen ? 'translate-y-0' : '-translate-y-full'}`}
            id='nav-links'
            onClick={closeMenu}
          >
            <li>
              <a className='relative isolate pb-2 text-white transition-all duration-300' href='#home'>
                Home
              </a>
            </li>
            <li>
              <a className='relative isolate pb-2 text-white transition-all duration-300' href='#about'>
                About Us
              </a>
            </li>
            <li>
              <a className='relative isolate pb-2 text-white transition-all duration-300' href='#service'>
                Features
              </a>
            </li>
            {/* <li>
              <a href='#service'>Services</a>
            </li> */}
            <li>
              <a className='relative isolate pb-2 text-white transition-all duration-300' href='#room'>
                Explore
              </a>
            </li>
            <li>
              <a className='relative isolate pb-2 text-white transition-all duration-300' href='#explore'>
                Offer
              </a>
            </li>
            <li>
              <a className='relative isolate pb-2 text-white transition-all duration-300' href='#explore'>
                Testimonial
              </a>
            </li>
            <li>
              <a className='relative isolate pb-2 text-white transition-all duration-300' href='#contact'>
                Contact
              </a>
            </li>
            <li>
              <a className='relative isolate pb-2 text-white transition-all duration-300' href='#contact'>
                FAQ
              </a>
            </li>
          </ul>
          <div className='flex'>
            <button className='btn nav__btn hidden '>Book Now</button>
            <button className='btn nav__btn hidden'>Book Now</button>
          </div>
        </nav>

        <div className='section__container  header__container' id='home'>
          {/* <p className="font-paytoneone ">StudySpace</p> */}
          <p className='mb-4 text-[1.2rem] text-white text-center opacity-60'>Simple - Unique - Friendly</p>
          <h1 className='text-[4rem] font-medium leading-[4.5rem] text-white text-center'>
            Find Your Flow: <span>Study</span>,<span> Meet</span>
            <br /> and <span>Sip Coffee</span>.{' '}
          </h1>
        </div>
      </header>

      <section className='section__container booking__container'>
        <form
          action='/'
          className='booking__form p-8 flex gap-4 items-center justify-center flex-wrap bg-white rounded-lg -translate-y-1/2 shadow-lg'
        >
          <div className='input__group '>
            <span>
              <CalendarDays />
            </span>
            <div>
              <label htmlFor='check-in'>CHECK-IN</label>
              <input
                className='block w-full max-w-[150px] py-1.5 text-dark text-sm outline-none border-none'
                type='text'
                placeholder='Check In'
              />
            </div>
          </div>
          <div className='input__group'>
            <span>
              <CalendarDays />
            </span>
            <div>
              <label htmlFor='check-out'>CHECK-OUT</label>
              <input
                className='block w-full max-w-[150px] py-1.5 text-dark text-sm outline-none border-none'
                type='text'
                placeholder='Check Out'
              />
            </div>
          </div>
          <div className='input__group'>
            <span>
              <CalendarDays />
            </span>
            <div>
              <label htmlFor='guest'>GUEST</label>
              <input
                className='block w-full max-w-[150px] py-1.5 text-dark text-sm outline-none border-none'
                type='text'
                placeholder='Guest'
              />
            </div>
          </div>
          <div className='input__group input__btn'>
            <button className='btn'>CHECK OUT</button>
          </div>
        </form>
      </section>

      <section className='section__container overflow-hidden grid gap-8 about__container ' id='about'>
        <div className='about__image '>
          <img className='max-w-[450px] mx-auto rounded-sm' src={about} alt='about' />
        </div>
        <div className='about__content'>
          <p className='section__subheader'>ABOUT US</p>
          <h2 className='section__header'>The Best Holidays Start Here!</h2>
          <p className='section__description'>
            With a focus on quality accommodations, personalized experiences, and seamless booking, our platform is
            dedicated to ensuring that every traveler embarks on their dream holiday with confidence and excitement.
          </p>
          <div className='about__btn'>
            <button className='btn'>Read More</button>
          </div>
        </div>
      </section>

      <section className='section__container room__container' id='room'>
        <p className='section__subheader'>OUR LIVING ROOM</p>
        <h2 className='section__header'>The Most Memorable Rest Time Starts Here.</h2>
        <div className='room__grid mt-16 grid gap-4  '>
          <div className='room__card overflow-hidden rounded-lg shadow-md'>
            <div className='room__card__image'>
              <img src={room1} alt='room' />
              <div className='room__card__icons absolute right-4 bottom-4 w-full flex items-center justify-end flex-wrap gap-4 z-10'>
                <span className='inline-block px-2 py-2 text-2xl bg-white rounded-full shadow-lg cursor-pointer'>
                <TableOfContents className='w-6 h-6' />
                </span>
                <span className='inline-block px-2 py-2 text-2xl bg-white rounded-full shadow-lg cursor-pointer'>
                <TableOfContents className='w-6 h-6' />
                </span>
                <span className='inline-block px-2 py-2 text-2xl bg-white rounded-full shadow-lg cursor-pointer'>
                <TableOfContents className='w-6 h-6' />
                </span>
              </div>
            </div>
            <div className='room__card__details p-4'>
              <h4 className='mb-2 text-lg font-medium text-gray-800'>Deluxe Ocean View</h4>
              <p className='mb-2 text-gray-600'>Bask in luxury with breathtaking ocean views from your private suite.</p>
              <h5 className='mb-4 text-base font-medium text-gray-400'>
                Starting from <span className='text-lg text-gray-700'>$299/night</span>
              </h5>
              <button className='btn'>Book Now</button>
            </div>
          </div>
          <div className='room__card overflow-hidden rounded-lg shadow-md'>
            <div className='room__card__image'>
              <img src={room2} alt='room' />
              <div className='room__card__icons absolute right-4 bottom-4 w-full flex items-center justify-end flex-wrap gap-4 z-10'>
                <span className='inline-block px-2 py-2 text-2xl bg-white rounded-full shadow-lg cursor-pointer'>
                <TableOfContents className='w-6 h-6' />
                </span>
                <span className='inline-block px-2 py-2 text-2xl bg-white rounded-full shadow-lg cursor-pointer'>
                <TableOfContents className='w-6 h-6' />
                </span>
                <span className='inline-block px-2 py-2 text-2xl bg-white rounded-full shadow-lg cursor-pointer'>
                <TableOfContents className='w-6 h-6' />
                </span>
              </div>
            </div>
            <div className='room__card__details p-4'>
              <h4 className='mb-2 text-lg font-medium text-gray-800'>Executive Cityscape Room</h4>
              <p className='mb-2 text-gray-600'>Experience urban elegance and modern comfort in the heart of the city.</p>
              <h5 className='mb-4 text-base font-medium text-gray-400'>
                Starting from <span className='text-lg text-gray-700'>$199/night</span>
              </h5>
              <button className='btn'>Book Now</button>
            </div>
          </div>
          <div className='room__card overflow-hidden rounded-lg shadow-md'>
            <div className='room__card__image'>
              <img src={room3} alt='room' />
              <div className='room__card__icons absolute right-4 bottom-4 w-full flex items-center justify-end flex-wrap gap-4 z-10'>
                <span className='inline-block px-2 py-2 text-2xl bg-white rounded-full shadow-lg cursor-pointer'>
                <TableOfContents className='w-6 h-6' />
                </span>
                <span className='inline-block px-2 py-2 text-2xl bg-white rounded-full shadow-lg cursor-pointer'>
                <TableOfContents className='w-6 h-6' />
                </span>
                <span className='inline-block px-2 py-2 text-2xl bg-white rounded-full shadow-lg cursor-pointer'>
                <TableOfContents className='w-6 h-6' />
                </span>
              </div>
            </div>
            <div className='room__card__details p-4'>
              <h4 className='mb-2 text-lg font-medium text-gray-800'>Family Garden Retreat</h4>
              <p className='mb-2 text-gray-600'>Spacious and inviting, perfect for creating cherished memories with loved ones.</p>
              <h5 className='mb-4 text-base font-medium text-gray-400'>
                Starting from <span className='text-lg text-gray-700'>$249/night</span>
              </h5>
              <button className='btn'>Book Now</button>
            </div>
          </div>
        </div>
      </section>

      <section className='service' id='service'>
        <div className='section__container  service__container'>
          <div className='service__content '>
            <p className='section__subheader'>SERVICES</p>
            <h2 className='section__header'>Strive Only For The Best.</h2>
            <ul className='service__list  list-none mt-8 grid gap-8'>
              <li className='flex items-center gap-4 text-lg font-medium text-gray-800'>
                <span className='px-3 py-3 text-2xl text-gray-800 bg-gray-200 rounded-full'>
                <TableOfContents className='w-6 h-6' />
                </span>
                High Class Security
              </li>
              <li className='flex items-center gap-4 text-lg font-medium text-gray-800'>
                <span className='px-3 py-3 text-2xl text-gray-800 bg-gray-200 rounded-full'>
                <TableOfContents className='w-6 h-6' />
                </span>
                24 Hours Room Service
              </li>
              <li className='flex items-center gap-4 text-lg font-medium text-gray-800'>
                <span className='px-3 py-3 text-2xl text-gray-800 bg-gray-200 rounded-full'>
                <TableOfContents className='w-6 h-6' />
                </span>
                Conference Room
              </li>
              <li className='flex items-center gap-4 text-lg font-medium text-gray-800'>
                <span className='px-3 py-3 text-2xl text-gray-800 bg-gray-200 rounded-full'>
                <TableOfContents className='w-6 h-6' />
                </span>
                Tourist Guide Support
              </li>
            </ul>
          </div>
        </div>
      </section>
      <section className='section__container banner__container'>
        <div className='banner__content p-8 flex gap-8 items-center justify-evenly flex-wrap rounded-lg shadow-lg'>
          <div className='banner__card text-center flex-1 flex-shrink-0 basis-[180px] '>
            <h4 className='text-2xl font-semibold'>25+</h4>
            <p className='text-gray-500'>Properties Available</p>
          </div>
          <div className='banner__card text-center flex-1 flex-shrink-0 basis-[180px]'>
            <h4 className='text-2xl font-semibold'>350+</h4>
            <p className='text-gray-500'>Bookings Completed</p>
          </div>
          <div className='banner__card text-center flex-1 flex-shrink-0 basis-[180px]'>
            <h4 className='text-2xl font-semibold'>600+</h4>
            <p className='text-gray-500'>Happy Customers</p>
          </div>
        </div>
      </section>
      <section className='explore' id='explore'>
        <p className='section__subheader'>EXPLORE</p>
        <h2 className='section__header'>What's New Today.</h2>
        <div className='explore__bg'>
          <div className='explore__content'>
            <p className='section__description mb-2'>10th MAR 2023</p>
            <h4 className='mb-4 text-lg font-semibold leading-6'>A New Menu Is Available In Our Hotel.</h4>
            <button className='btn'>Continue</button>
          </div>
        </div>
      </section>
      <footer className='footer ' id='contact'>
        <div className='section__container footer__container grid gap-y-16 gap-x-8'>
          <div className='footer__col'>
            <div className=''>
              <p className='font-greatvibes text-5xl'>StudySpace</p>
            </div>
            <p className='section__description'>
              Discover a world of comfort, luxury, and adventure as you explore our curated selection of hotels, making
              every moment of your getaway truly extraordinary.
            </p>
            <button className='btn'>Book Now</button>
          </div>
          <div className='footer__col'>
            <h4 className='mb-8 text-lg font-medium '>QUICK LINKS</h4>
            <ul className='footer__links list-none grid gap-4'>
              <li>
                <a href='#' className='transition-colors duration-300 hover:text-[#647C6C] '>Browse Destinations</a>
              </li>
              <li>
                <a href='#' className='transition-colors duration-300 hover:text-[#647C6C] '>Special Offers & Packages</a>
              </li>
              <li>
                <a href='#' className='transition-colors duration-300 hover:text-[#647C6C] '>Room Types & Amenities</a>
              </li>
              <li>
                <a href='#' className='transition-colors duration-300 hover:text-[#647C6C] '>Customer Reviews & Ratings</a>
              </li>
              <li>
                <a href='#' className='transition-colors duration-300 hover:text-[#647C6C] '>Travel Tips & Guides</a>
              </li>
            </ul>
          </div>
          <div className='footer__col'>
            <h4 className='mb-8 text-lg font-medium '>OUR SERVICES</h4>
            <ul className='footer__links list-none grid gap-4'>
              <li>
                <a href='#' className='transition-colors duration-300 hover:text-[#647C6C] '>Concierge Assistance</a>
              </li>
              <li>
                <a href='#' className='transition-colors duration-300 hover:text-[#647C6C] '>Flexible Booking Options</a>
              </li>
              <li>
                <a href='#' className='transition-colors duration-300 hover:text-[#647C6C] '>Airport Transfers</a>
              </li>
              <li>
                <a href='#' className='transition-colors duration-300 hover:text-[#647C6C] '>Wellness & Recreation</a>
              </li>
            </ul>
          </div>
          <div className='footer__col'>
            <h4 className='mb-8 text-lg font-medium '>CONTACT US</h4>
            <ul className='footer__links list-none grid gap-4'>
              <li>
                <a href='#'  className='transition-colors duration-300 hover:text-[#647C6C] '>rayalpark@info.com</a>
              </li>
            </ul>
            <div className='footer__socials mt-8 flex items-center gap-4 flex-wrap'>
              <a href='#'>
                <img className='max-w-[25px] opacity-80 transition duration-300 hover:opacity-100' src={facebook} alt='facebook' />
              </a>
              <a href='#'>
                <img className='max-w-[25px] opacity-80 transition duration-300  hover:opacity-100' src={instagram} alt='instagram' />
              </a>
              <a href='#'>
                <img className='max-w-[25px] opacity-80 transition duration-300  hover:opacity-100' src={youtube} alt='youtube' />
              </a>
              <a href='#'>
                <img className='max-w-[25px] rounded-sm opacity-80 transition duration-300  hover:opacity-100' src={twitter} alt='twitter' />
              </a>
            </div>
          </div>
        </div>
        <div className='footer__bar p-4 text-sm text-gray-500 text-center'>Copyright © 2023 Web Design Mastery. All rights reserved.</div>
      </footer>
    </div>
  )
}

export default HomePage

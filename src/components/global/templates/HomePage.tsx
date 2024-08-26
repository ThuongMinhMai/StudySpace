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

const HomePage = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const handleMenuToggle = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  const closeMenu = () => {
    setIsMenuOpen(false)
  }

  // ScrollReveal animation setup
  React.useEffect(() => {
    const scrollRevealOption = {
      distance: '50px',
      origin: 'bottom',
      duration: 1000
    }

    ScrollReveal().reveal('.header__container p', {
      ...scrollRevealOption
    })

    ScrollReveal().reveal('.header__container h1', {
      ...scrollRevealOption,
      delay: 500
    })

    ScrollReveal().reveal('.about__image img', {
      ...scrollRevealOption,
      origin: 'left'
    })

    ScrollReveal().reveal('.about__content .section__subheader', {
      ...scrollRevealOption,
      delay: 500
    })

    ScrollReveal().reveal('.about__content .section__header', {
      ...scrollRevealOption,
      delay: 1000
    })

    ScrollReveal().reveal('.about__content .section__description', {
      ...scrollRevealOption,
      delay: 1500
    })

    ScrollReveal().reveal('.about__btn', {
      ...scrollRevealOption,
      delay: 2000
    })

    ScrollReveal().reveal('.room__card', {
      ...scrollRevealOption,
      interval: 500
    })

    ScrollReveal().reveal('.service__list li', {
      ...scrollRevealOption,
      interval: 500,
      origin: 'right'
    })
  }, [])

  return (
    <div>
      <header className='header'>
        <nav className=' '>
          <div className='nav__bar'>
            <div className=''>
              <p className='font-greatvibes text-5xl'>StudySpace</p>
            </div>
            <div className='nav__menu__btn' id='menu-btn' onClick={handleMenuToggle}>
              <i className={isMenuOpen ? 'ri-close-line' : 'ri-menu-line'}></i>
            </div>
          </div>
          <ul className={`nav__links ${isMenuOpen ? 'open' : ''}`} id='nav-links' onClick={closeMenu}>
            <li>
              <a href='#home'>Home</a>
            </li>
            <li>
              <a href='#about'>About</a>
            </li>
            <li>
              <a href='#service'>Services</a>
            </li>
            <li>
              <a href='#explore'>Explore</a>
            </li>
            <li>
              <a href='#contact'>Contact</a>
            </li>
          </ul>
          <button className='btn nav__btn'>Book Now</button>
        </nav>
        <div className='section__container header__container' id='home'>
          <p>Simple - Unique - Friendly</p>
          <h1>
            Find Your Flow: <span>Study</span>,<span> Meet</span>
            <br /> and <span>Sip Coffee</span>.{' '}
          </h1>
        </div>
      </header>

      <section className='section__container booking__container'>
        <form action='/' className='booking__form'>
          <div className='input__group'>
            <span>
              <i className='ri-calendar-2-fill'></i>
            </span>
            <div>
              <label htmlFor='check-in'>CHECK-IN</label>
              <input type='text' placeholder='Check In' />
            </div>
          </div>
          <div className='input__group'>
            <span>
              <i className='ri-calendar-2-fill'></i>
            </span>
            <div>
              <label htmlFor='check-out'>CHECK-OUT</label>
              <input type='text' placeholder='Check Out' />
            </div>
          </div>
          <div className='input__group'>
            <span>
              <i className='ri-user-fill'></i>
            </span>
            <div>
              <label htmlFor='guest'>GUEST</label>
              <input type='text' placeholder='Guest' />
            </div>
          </div>
          <div className='input__group input__btn'>
            <button className='btn'>CHECK OUT</button>
          </div>
        </form>
      </section>

      <section className='section__container about__container' id='about'>
        <div className='about__image'>
          <img src={about} alt='about' />
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

      <section className='section__container room__container'>
        <p className='section__subheader'>OUR LIVING ROOM</p>
        <h2 className='section__header'>The Most Memorable Rest Time Starts Here.</h2>
        <div className='room__grid'>
          <div className='room__card'>
            <div className='room__card__image'>
              <img src={room1} alt='room' />
              <div className='room__card__icons'>
                <span>
                  <i className='ri-heart-fill'></i>
                </span>
                <span>
                  <i className='ri-paint-fill'></i>
                </span>
                <span>
                  <i className='ri-shield-star-line'></i>
                </span>
              </div>
            </div>
            <div className='room__card__details'>
              <h4>Deluxe Ocean View</h4>
              <p>Bask in luxury with breathtaking ocean views from your private suite.</p>
              <h5>
                Starting from <span>$299/night</span>
              </h5>
              <button className='btn'>Book Now</button>
            </div>
          </div>
          <div className='room__card'>
            <div className='room__card__image'>
              <img src={room2} alt='room' />
              <div className='room__card__icons'>
                <span>
                  <i className='ri-heart-fill'></i>
                </span>
                <span>
                  <i className='ri-paint-fill'></i>
                </span>
                <span>
                  <i className='ri-shield-star-line'></i>
                </span>
              </div>
            </div>
            <div className='room__card__details'>
              <h4>Executive Cityscape Room</h4>
              <p>Experience urban elegance and modern comfort in the heart of the city.</p>
              <h5>
                Starting from <span>$199/night</span>
              </h5>
              <button className='btn'>Book Now</button>
            </div>
          </div>
          <div className='room__card'>
            <div className='room__card__image'>
              <img src={room3} alt='room' />
              <div className='room__card__icons'>
                <span>
                  <i className='ri-heart-fill'></i>
                </span>
                <span>
                  <i className='ri-paint-fill'></i>
                </span>
                <span>
                  <i className='ri-shield-star-line'></i>
                </span>
              </div>
            </div>
            <div className='room__card__details'>
              <h4>Family Garden Retreat</h4>
              <p>Spacious and inviting, perfect for creating cherished memories with loved ones.</p>
              <h5>
                Starting from <span>$249/night</span>
              </h5>
              <button className='btn'>Book Now</button>
            </div>
          </div>
        </div>
      </section>

      <section className='service' id='service'>
        <div className='section__container service__container'>
          <div className='service__content'>
            <p className='section__subheader'>SERVICES</p>
            <h2 className='section__header'>Strive Only For The Best.</h2>
            <ul className='service__list'>
              <li>
                <span>
                  <i className='ri-shield-star-line'></i>
                </span>
                High Class Security
              </li>
              <li>
                <span>
                  <i className='ri-24-hours-line'></i>
                </span>
                24 Hours Room Service
              </li>
              <li>
                <span>
                  <i className='ri-headphone-line'></i>
                </span>
                Conference Room
              </li>
              <li>
                <span>
                  <i className='ri-map-2-line'></i>
                </span>
                Tourist Guide Support
              </li>
            </ul>
          </div>
        </div>
      </section>
      <section className='section__container banner__container'>
        <div className='banner__content'>
          <div className='banner__card'>
            <h4>25+</h4>
            <p>Properties Available</p>
          </div>
          <div className='banner__card'>
            <h4>350+</h4>
            <p>Bookings Completed</p>
          </div>
          <div className='banner__card'>
            <h4>600+</h4>
            <p>Happy Customers</p>
          </div>
        </div>
      </section>
      <section className='explore' id='explore'>
        <p className='section__subheader'>EXPLORE</p>
        <h2 className='section__header'>What's New Today.</h2>
        <div className='explore__bg'>
          <div className='explore__content'>
            <p className='section__description'>10th MAR 2023</p>
            <h4>A New Menu Is Available In Our Hotel.</h4>
            <button className='btn'>Continue</button>
          </div>
        </div>
      </section>
      <footer className='footer' id='contact'>
        <div className='section__container footer__container'>
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
            <h4>QUICK LINKS</h4>
            <ul className='footer__links'>
              <li>
                <a href='#'>Browse Destinations</a>
              </li>
              <li>
                <a href='#'>Special Offers & Packages</a>
              </li>
              <li>
                <a href='#'>Room Types & Amenities</a>
              </li>
              <li>
                <a href='#'>Customer Reviews & Ratings</a>
              </li>
              <li>
                <a href='#'>Travel Tips & Guides</a>
              </li>
            </ul>
          </div>
          <div className='footer__col'>
            <h4>OUR SERVICES</h4>
            <ul className='footer__links'>
              <li>
                <a href='#'>Concierge Assistance</a>
              </li>
              <li>
                <a href='#'>Flexible Booking Options</a>
              </li>
              <li>
                <a href='#'>Airport Transfers</a>
              </li>
              <li>
                <a href='#'>Wellness & Recreation</a>
              </li>
            </ul>
          </div>
          <div className='footer__col'>
            <h4>CONTACT US</h4>
            <ul className='footer__links'>
              <li>
                <a href='#'>rayalpark@info.com</a>
              </li>
            </ul>
            <div className='footer__socials'>
              <a href='#'>
                <img src={facebook} alt='facebook' />
              </a>
              <a href='#'>
                <img src={instagram} alt='instagram' />
              </a>
              <a href='#'>
                <img src={youtube} alt='youtube' />
              </a>
              <a href='#'>
                <img src={twitter} alt='twitter' />
              </a>
            </div>
          </div>
        </div>
        <div className='footer__bar'>Copyright © 2023 Web Design Mastery. All rights reserved.</div>
      </footer>
    </div>
  )
}

export default HomePage

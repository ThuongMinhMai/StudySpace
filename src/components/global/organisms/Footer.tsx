import React from 'react'
import facebook from '../../../assets/facebook.png'
import instagram from '../../../assets/instagram.png'
import twitter from '../../../assets/twitter.png'
import youtube from '../../../assets/youtube.png'
function Footer() {
  return (
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
                <a href='#' className='transition-colors duration-300 hover:text-[#647C6C] '>
                  Browse Destinations
                </a>
              </li>
              <li>
                <a href='#' className='transition-colors duration-300 hover:text-[#647C6C] '>
                  Special Offers & Packages
                </a>
              </li>
              <li>
                <a href='#' className='transition-colors duration-300 hover:text-[#647C6C] '>
                  Room Types & Amenities
                </a>
              </li>
              <li>
                <a href='#' className='transition-colors duration-300 hover:text-[#647C6C] '>
                  Customer Reviews & Ratings
                </a>
              </li>
              <li>
                <a href='#' className='transition-colors duration-300 hover:text-[#647C6C] '>
                  Travel Tips & Guides
                </a>
              </li>
            </ul>
          </div>
          <div className='footer__col'>
            <h4 className='mb-8 text-lg font-medium '>OUR SERVICES</h4>
            <ul className='footer__links list-none grid gap-4'>
              <li>
                <a href='#' className='transition-colors duration-300 hover:text-[#647C6C] '>
                  Concierge Assistance
                </a>
              </li>
              <li>
                <a href='#' className='transition-colors duration-300 hover:text-[#647C6C] '>
                  Flexible Booking Options
                </a>
              </li>
              <li>
                <a href='#' className='transition-colors duration-300 hover:text-[#647C6C] '>
                  Airport Transfers
                </a>
              </li>
              <li>
                <a href='#' className='transition-colors duration-300 hover:text-[#647C6C] '>
                  Wellness & Recreation
                </a>
              </li>
            </ul>
          </div>
          <div className='footer__col'>
            <h4 className='mb-8 text-lg font-medium '>CONTACT US</h4>
            <ul className='footer__links list-none grid gap-4'>
              <li>
                <a href='#' className='transition-colors duration-300 hover:text-[#647C6C] '>
                  rayalpark@info.com
                </a>
              </li>
            </ul>
            <div className='footer__socials mt-8 flex items-center gap-4 flex-wrap'>
              <a href='#'>
                <img
                  className='max-w-[25px] opacity-80 transition duration-300 hover:opacity-100'
                  src={facebook}
                  alt='facebook'
                />
              </a>
              <a href='#'>
                <img
                  className='max-w-[25px] opacity-80 transition duration-300  hover:opacity-100'
                  src={instagram}
                  alt='instagram'
                />
              </a>
              <a href='#'>
                <img
                  className='max-w-[25px] opacity-80 transition duration-300  hover:opacity-100'
                  src={youtube}
                  alt='youtube'
                />
              </a>
              <a href='#'>
                <img
                  className='max-w-[25px] rounded-sm opacity-80 transition duration-300  hover:opacity-100'
                  src={twitter}
                  alt='twitter'
                />
              </a>
            </div>
          </div>
        </div>
        <div className='footer__bar p-4 text-sm text-gray-500 text-center'>
          Copyright © 2023 Web Design Mastery. All rights reserved.
        </div>
      </footer>
  )
}

export default Footer
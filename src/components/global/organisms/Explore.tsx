import { TableOfContents } from 'lucide-react'
import React from 'react'
import room1 from '../../../assets/room-1.jpg'
import room2 from '../../../assets/room-2.jpg'
import room3 from '../../../assets/room-3.jpg'
function Explore() {
  return (
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
              <p className='mb-2 text-gray-600'>
                Bask in luxury with breathtaking ocean views from your private suite.
              </p>
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
              <p className='mb-2 text-gray-600'>
                Experience urban elegance and modern comfort in the heart of the city.
              </p>
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
              <p className='mb-2 text-gray-600'>
                Spacious and inviting, perfect for creating cherished memories with loved ones.
              </p>
              <h5 className='mb-4 text-base font-medium text-gray-400'>
                Starting from <span className='text-lg text-gray-700'>$249/night</span>
              </h5>
              <button className='btn'>Book Now</button>
            </div>
          </div>
        </div>
      </section>
  )
}

export default Explore
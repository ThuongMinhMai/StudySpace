import { TableOfContents } from 'lucide-react'
import React from 'react'

function Feature() {
  return (
    <>
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
</>

  )
}

export default Feature
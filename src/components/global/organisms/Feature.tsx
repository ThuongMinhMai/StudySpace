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
  
</>

  )
}

export default Feature
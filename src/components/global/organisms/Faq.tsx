import React from 'react'
import Accordion from '../molecules/Accordion'
import './Faq.css'
import './AboutUs.css'
const FAQ = () => {
  return (
    <div className='relative bg-[#D7A883] h-screen flex flex-col justify-center items-center mt-36 gap-10'>
        <div className='box absolute -top-28 left-0'></div>

      <div className='absolute top-0 -left-80 h-full w-4/5 bg-[#F5EEE7] clip-path-custom-left '></div>
      {/* Content goes here */}
      <p className='text-5xl z-[10]  font-bold'>FAQ</p>

      <div className='p-10 bg-white/30  w-1/2  z-10'>

        <Accordion title='Do you prefer Android or iOS' answer='I like to use iOS products' />
        <Accordion title='Do you prefer writing CSS or Tailwind?' answer='I like to use Tailwind' />
        <Accordion title='Firebase or Supabase?' answer='I am using Supabase! lordhsgfskgkhjkchvjhkjshkjdhfkjkfjhgjkdfhgkhdfkjghdkjhk' />
      </div>
    </div>
  )
}

export default FAQ

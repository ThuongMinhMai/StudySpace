import React from 'react'
import Accordion from '../molecules/Accordion'
import './Faq.css'
import './AboutUs.css'
const FAQ = () => {
  return (
    <div className='relative bg-[#D7A883] h-fit py-20 flex flex-col justify-center items-center mt-36 gap-10'>
      <div className='box absolute -top-28 left-0'></div>

      <div className='absolute top-0 -left-80 h-full w-4/5 bg-[#F5EEE7] clip-path-custom-left '></div>
      {/* Content goes here */}
      <p
        className='font-paytoneone mb-4 -top-10 text-center relative z-10 text-6xl'
        style={{
          background: 'linear-gradient(90deg, #464C52, #C6A083)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent'
        }}
        id='faq'
      >
        <span>FAQ</span>
      </p>
      <div className='p-10 bg-white/30  w-1/2  z-10'>
        <Accordion
          title='How can I book a room?'
          answer='Simply visit our website, select your desired room, choose the time slot, and complete the online payment.'
        />
        <Accordion title='What are the room rental fees?' answer='I like to use Tailwind' />
        <Accordion
          title='Can I cancel or modify my booking?'
          answer='I am using Supabase! lordhsgfskgkhjkchvjhkjshkjdhfkjkfjhgjkdfhgkhdfkjghdkjhk'
        />
      </div>
    </div>
  )
}

export default FAQ

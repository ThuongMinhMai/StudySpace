import { useEffect, useState } from 'react'
import conve from '../../../assets/convenient.svg'; // Replace this with the correct image path
import flexi from '../../../assets/flexibility.svg'; // Replace this with the correct image path
import lit from '../../../assets/limitedtime.png'; // Replace this with the correct image path
import product from '../../../assets/productivity.svg'; // Replace this with the correct image path
import spe from '../../../assets/specification.png'; // Replace this with the correct image path
import why from '../../../assets/whychooseus.png'; // Replace this with the correct image path

import './Feature.css'
function Feature() {
  // State to store the time remaining
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 })

  // Function to calculate time remaining
  const calculateTimeLeft = () => {
    const targetDate: number = new Date('2024-09-30T00:00:00').getTime() // Convert Date to number (milliseconds)
    const now: number = new Date().getTime() // Current time in milliseconds
    const difference: number = targetDate - now // Time difference in milliseconds

    if (difference > 0) {
      const timeLeft = {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60)
      }
      setTimeLeft(timeLeft)
    }
  }

  // Set interval to update time left every second
  useEffect(() => {
    const timer = setInterval(() => {
      calculateTimeLeft()
    }, 1000)

    // Clean up the interval on component unmount
    return () => clearInterval(timer)
  }, [])
  return (
    <div id='feature'>
      <section className='relative flex items-center justify-between h-screen overflow-hidden bg-white'>
        {/* Image on the left side */}
        <div className='w-3/5 h-full about__image hidden lg:block'>
          <img src={why} alt='Service' className='w-full h-auto object-cover' />
        </div>

        {/* Curved content section on the right side */}
        {/* <div className='relative right-0 w-screen lg:w-3/4 lg:absolute h-full bg-[#D7A883] clip-path-custom p-10 flex flex-col items-end justify-center text-white'> */}
        <div className={`relative right-0 w-full lg:w-3/4 lg:absolute h-full bg-[#D7A883] p-10 flex flex-col lg:items-end items-center justify-center text-white ${window.innerWidth >= 1275 ? 'clip-path-custom' : ''}`}>
          <div className='mr-20'>
            <h2 className='text-7xl font-bold mb-6 room__card'>Why Choose Us?</h2>
            <ul className='flex gap-10 justify-center service__list'>
              <li className='flex flex-col items-center'>
                <img className='w-20 h-20 mb-2' src={conve} alt='icon' />
                <p className='text-lg font-medium'>Convenience</p>
              </li>
              <li className='flex flex-col items-center'>
                <img className='w-20 h-20 mb-2' src={flexi} alt='icon' />
                <p className='text-lg font-medium'>Flexibility</p>
              </li>
              <li className='flex flex-col items-center'>
                <img className='w-20 h-20 mb-2' src={product} alt='icon' />
                <p className='text-lg font-medium'>Productivity</p>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* Second Section with image on the right */}
      <section className='relative flex items-center justify-between h-screen overflow-hidden bg-white'>
        {/* Curved content section on the left side */}
        <div className={` z-10 lg:w-[1055px] w-full h-full  bg-[#647C6C]  p-10 flex flex-col lg:items-start items-center justify-center text-white ${window.innerWidth >= 1275 ? 'clip-path-custom-left' : ''}`}>
          <div className='w-4/5 flex flex-col justify-center items-start gap-10 text-[#EAECEB]'>
            <div className='room__card'>
              <h2 className='text-7xl font-bold mb-6'>Special Limited Time Offer Room!</h2>
              <p className='text-xl text-[#BEBEBE]'>Get 10% Off By Sign Up Account!</p>
            </div>
            <div className='flex gap-10 justify-center'>
              {/* Countdown Timer Display */}
              <div className='flex flex-col items-start gap-2'>
                <p className='text-5xl font-bold'>{timeLeft.days} :</p>
                <span className='text-[#F5EEE7]'>Days</span>
              </div>
              <div className='flex flex-col items-start gap-2'>
                <p className='text-5xl font-bold'>{timeLeft.hours} :</p>
                <span className='text-[#F5EEE7]'>Hours</span>
              </div>
              <div className='flex flex-col items-start gap-2'>
                <p className='text-5xl font-bold'>{timeLeft.minutes} :</p>
                <span className='text-[#F5EEE7]'>Minutes</span>
              </div>
              <div className='flex flex-col items-start gap-2'>
                <p className='text-5xl font-bold'>{timeLeft.seconds}</p>
                <span className='text-[#F5EEE7]'>Seconds</span>
              </div>
            </div>
            <div className='flex gap-10 font-bold items-end justify-center'>
              <p className='text-5xl'>$53.55</p>
              <p className='text-3xl line-through text-[#F5EEE7]'>$59.50</p>
            </div>
          </div>
        </div>

        {/* Image on the right side */}
        <div className='w-3/5 h-full absolute right-0 about__image'>
          <img src={lit} alt='Service' className='w-full h-auto object-cover ' />
        </div>
      </section>

      <section className='relative flex items-center justify-between h-screen overflow-hidden bg-white'>
        {/* Image on the left side */}
        <div className='w-3/5 h-full about__image hidden lg:block'>
          <img src={spe} alt='Service' className='w-full h-auto object-cover ' />
        </div>

        {/* Curved content section on the right side */}
        {/* <div className='absolute right-0 w-3/4 h-full bg-[#D4C4BC] clip-path-custom p-10 flex flex-col items-center justify-center text-[#757069]'> */}
        <div className={`relative right-0 w-full lg:w-3/4 lg:absolute h-full bg-[#D4C4BC] p-10  flex flex-col items-center justify-center text-[#757069] ${window.innerWidth >= 1275 ? 'clip-path-custom' : ''}`}>
          
          <div className='ml-32'>
            <h2 className='text-7xl font-bold mb-16 room__card'>Specifications</h2>
            <div className='flex gap-10 justify-center'>
              <ul className='list-disc flex flex-col gap-10 text-xl service__list'>
                <li>
                Furnitures: Desks, Chairs for 2-4 people, Bookshelves
                </li>
                <li>
                Tech: High-speed WiFi, Projector, Whiteboard
                </li>
                <li>
                Comfort: Air Conditioning, Adjustable Lighting, Soundproofing
                </li>
                <li>
                Extras: Complimentary Water, Snacks, Power Outlets K
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Feature

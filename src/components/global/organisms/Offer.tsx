import { CircleCheck } from 'lucide-react'
import './AboutUs.css'

function Offer() {
  return (
    <div className='relative bg-gradient-to-r from-[#ffefbd] to-[#FFFFFF] mt-56'>

      <section className='room__container lg:px-44 lg:py-20 md:px-6 md:py-10 sm:p-6 p-4' >
        <div>
          <button className='bg-[#FFDFAE]/80 px-8 py-3 text-[#FFA800] font-bold rounded-lg'>Price Package</button>
        </div>
        <div className='flex flex-col sm:flex-row justify-center items-stretch lg:gap-20 md:gap-28 my-10 ' id='offer'>
          <p className='section__subheader flex-1 text-[#4E4E4E] font-bold text-5xl '>Choose Your Perfect Combo</p>
          <h2 className='section__header flex-1 text-[#67625D] font-light text- leading-loose tracking-wider'>
            Choose your perfect combo membership to unlock exclusive benefits and tailored services that fit your study
            and work needs perfectly!
          </h2>
        </div>
        <div className='room__grid mt-16 grid gap-4  '>
          <div className='room__card bg-white overflow-hidden rounded-3xl shadow-md'>
            <div className='room__card__details p-4 flex flex-col justify-center items-center gap-10'>
              <h4 className='mt-8 text-center text-2xl font-bold '>Basic</h4>
              <h5 className='mb-4 text-base text-center  text-[#FFA800] '>
                <span className='font-extrabold text-xl'>$</span>{' '}
                <span className='font-extrabold text-5xl'>19.67 </span>
                <span className='text-lg text-[#767676] font-medium'>monthly</span>
              </h5>
              <ul className='list-none space-y-8 px-8 text-[#67625D] '>
                <li className='flex items-center'>
                  <CircleCheck className='w-7 h-7 mr-2 flex-shrink-0' color='#FFFF' fill='#FFA800' />5 free bookings per
                  month
                </li>
                <li className='flex items-center'>
                  <CircleCheck className='w-7 h-7 mr-2 flex-shrink-0' color='#FFFF' fill='#FFA800' />
                  Access to all available study and workspaces
                </li>
                <li className='flex items-center'>
                  <CircleCheck className='w-7 h-7 mr-2 flex-shrink-0' color='#FFFF' fill='#FFA800' />
                  High-speed Wi-Fi
                </li>
              </ul>
              <button className='mb-8 px-14 py-3 bg-[#FFA800] text-base rounded-lg text-white font-semibold'>
                Register
              </button>
            </div>
          </div>
          <div className='room__card bg-white overflow-hidden rounded-3xl shadow-md'>
            <div className='room__card__details p-4 flex flex-col justify-center items-center gap-10 '>
              <h4 className='mt-8 text-center text-2xl font-bold '>Advanced</h4>
              <h5 className='mb-4 text-base text-center  text-[#FFA800] '>
                <span className='font-extrabold text-xl'>$</span>{' '}
                <span className='font-extrabold text-5xl'>19.67 </span>
                <span className='text-lg text-[#767676] font-medium'>monthly</span>
              </h5>
              <ul className='list-none space-y-8 px-8 text-[#67625D]'>
                <li className='flex items-center'>
                  <CircleCheck className='w-7 h-7 mr-2 flex-shrink-0' color='#FFFF' fill='#FFA800' />
                  12 free bookings per month
                </li>
                <li className='flex items-center'>
                  <CircleCheck className='w-7 h-7 mr-2 flex-shrink-0' color='#FFFF' fill='#FFA800' />
                  Priority booking and access to premium study and workspaces
                </li>
                <li className='flex items-center'>
                  <CircleCheck className='w-7 h-7 mr-2 flex-shrink-0' color='#FFFF' fill='#FFA800' />
                  High-speed Wi-Fi
                </li>
              </ul>
              <button className='mb-8 px-14 py-3 bg-[#FFA800] text-base rounded-lg text-white font-semibold'>
                Register
              </button>
            </div>
          </div>
          <div className='room__card bg-white overflow-hidden rounded-3xl shadow-md'>
            <div className='room__card__details p-4 flex flex-col justify-center items-center gap-10'>
              <h4 className='mt-8 text-center text-2xl font-bold '>VIP</h4>
              <h5 className='mb-4 text-base text-center  text-[#FFA800] '>
                <span className='font-extrabold text-xl'>$</span>{' '}
                <span className='font-extrabold text-5xl'>19.67 </span>
                <span className='text-lg text-[#767676] font-medium'>monthly</span>
              </h5>
              <ul className='list-none space-y-8 px-8 text-[#67625D] '>
                <li className='flex items-center'>
                  <CircleCheck className='w-7 h-7 mr-2 flex-shrink-0' color='#FFFF' fill='#FFA800' />
                  Unlimited bookings
                </li>
                <li className='flex items-center'>
                  <CircleCheck className='w-7 h-7 mr-2 flex-shrink-0' color='#FFFF' fill='#FFA800' />
                  Premium amenities including coffee, and dedicated support
                </li>
                <li className='flex items-center'>
                  <CircleCheck className='w-7 h-7 mr-2 flex-shrink-0' color='#FFFF' fill='#FFA800' />
                  High-speed Wi-Fi
                </li>
              </ul>
              <button className='mb-8 px-14 py-3 bg-[#FFA800] text-base rounded-lg text-white font-semibold'>
                Register
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Offer

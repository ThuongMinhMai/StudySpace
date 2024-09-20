import {
  Bean,
  ClipboardCheck,
  Coffee,
  FileHeart,
  Heart,
  LibraryBig,
  MonitorCheck,
  Podcast,
  UsersRound
} from 'lucide-react'
import { useLocation, useNavigate } from 'react-router-dom'
import space1 from '../../../assets/space1.jpg'
import space2 from '../../../assets/space2.jpg'
import space3 from '../../../assets/space3.jpg'

import './AboutUs.css'

function Explore() {
  const navigate = useNavigate()
  const location = useLocation() // Access current URL and search parameters
  // Function to navigate with typeRoom props
  // const handleExplore = (typeRoom: any) => {
  // localStorage.setItem('typeRome', typeRoom);

  //   navigate('/room', { state: { typeRoom } })
  // }
  // Function to navigate with typeRoom props and append query params
  const handleExplore = (typeRoom: string) => {
    const searchParams = new URLSearchParams(location.search) // Get existing search parameters

    // Add or update the `type` query parameter
    searchParams.set('typeSpace', typeRoom)

    // Navigate to the new URL with updated query parameters
    navigate(`${location.pathname}room?${searchParams.toString()}`)
  }
  return (
    <div className='relative'>
      <section className='section__container room__container' id='explore'>
        <p className='section__subheader text font-bold text-5xl'>OUR SPACE</p>

        <div className='flex justify-between items-center'>
          <h2 className='section__header text-gray-600'>The Most Memorable Work Time Starts Here.</h2>
          <p className='explore-text cursor-pointer' onClick={() => handleExplore('all')}>
            Explore all <span className='arrow'>&#x2192;</span>
          </p>
        </div>

        <div className='room__grid mt-16 grid gap-4 mb-10'>
          {/* Coffee Spaces Card */}
          <div className='room__card bg-white overflow-hidden rounded-lg shadow-md'>
            <div className='room__card__image'>
              <img src={space1} alt='room' />
              <div className='room__card__icons absolute right-4 bottom-4 w-full flex items-center justify-end flex-wrap gap-4 z-10'>
                <span className='inline-block px-2 py-2 text-2xl bg-white rounded-full shadow-lg cursor-pointer'>
                  <Heart className='w-6 h-6' />
                </span>
                <span className='inline-block px-2 py-2 text-2xl bg-white rounded-full shadow-lg cursor-pointer'>
                  <Coffee className='w-6 h-6' />
                </span>
                <span className='inline-block px-2 py-2 text-2xl bg-white rounded-full shadow-lg cursor-pointer'>
                  <Bean className='w-6 h-6' />
                </span>
              </div>
            </div>
            <div className='room__card__details p-4'>
              <h4 className='mb-2 text-xl font-semibold'>Coffee Spaces</h4>
              <p className='my-4 text-gray-600'>
              Enjoy a relaxed, creative environment with Wi-Fi, flexible seating,facilities, and the convenience of refreshments, ideal for meetings or solo work.
              </p>
              <h5 className='mb-4 text-base font-medium text-gray-400'>
                Starting from <span className='text-xl text-[#FFA800] font-bold '>$299/hour</span>
              </h5>

              <button
                onClick={() => handleExplore('Coffee Spaces')}
                className='group relative font-bold rounded-lg min-h-[50px] w-40 overflow-hidden border border-[#FFA800] bg-[#FFDFAE]/40 text-[#FFA800]  shadow-2xl transition-all before:absolute before:left-0 before:top-0 before:h-0 before:w-1/4 before:bg-[#FFA800] before:duration-500 after:absolute after:bottom-0 after:right-0 after:h-0 after:w-1/4 after:bg-[#FFA800] after:duration-500 hover:text-white hover:before:h-full hover:after:h-full'
              >
                <span className='top-0 flex h-full w-full items-center justify-center before:absolute before:bottom-0 before:left-1/4 before:z-0 before:h-0 before:w-1/4 before:bg-[#FFA800] before:duration-500 after:absolute after:right-1/4 after:top-0 after:z-0 after:h-0 after:w-1/4 after:bg-[#FFA800] after:duration-500 hover:text-white group-hover:before:h-full group-hover:after:h-full'></span>
                <span className='absolute bottom-0 left-0 right-0 top-0 z-10 flex h-full w-full items-center justify-center group-hover:text-white '>
                  Explore
                </span>
              </button>
            </div>
          </div>

          {/* Library Spaces Card */}
          <div className='room__card bg-white overflow-hidden rounded-lg shadow-md'>
            <div className='room__card__image'>
              <img src={space2} alt='room' />
              <div className='room__card__icons absolute right-4 bottom-4 w-full flex items-center justify-end flex-wrap gap-4 z-10'>
                <span className='inline-block px-2 py-2 text-2xl bg-white rounded-full shadow-lg cursor-pointer'>
                  <LibraryBig className='w-6 h-6' />
                </span>
                <span className='inline-block px-2 py-2 text-2xl bg-white rounded-full shadow-lg cursor-pointer'>
                  <UsersRound className='w-6 h-6' />
                </span>
                <span className='inline-block px-2 py-2 text-2xl bg-white rounded-full shadow-lg cursor-pointer'>
                  <FileHeart className='w-6 h-6' />
                </span>
              </div>
            </div>
            <div className='room__card__details p-4'>
              <h4 className='mb-2 text-xl font-semibold'>Library Spaces</h4>
              <p className='my-4 text-gray-600'>
              Access a quiet, focused environment with abundant resources, free Wi-Fi, and comfortable seating, perfect for studying or research.
              </p>
              <h5 className='mb-4 text-base font-medium text-gray-400'>
                Starting from <span className='text-xl text-[#FFA800] font-bold '>$199/hour</span>
              </h5>

              <button
                onClick={() => handleExplore('Library Spaces')}
                className='group relative font-bold rounded-lg min-h-[50px] w-40 overflow-hidden border border-[#FFA800] bg-[#FFDFAE]/40 text-[#FFA800]  shadow-2xl transition-all before:absolute before:left-0 before:top-0 before:h-0 before:w-1/4 before:bg-[#FFA800] before:duration-500 after:absolute after:bottom-0 after:right-0 after:h-0 after:w-1/4 after:bg-[#FFA800] after:duration-500 hover:text-white hover:before:h-full hover:after:h-full'
              >
                <span className='top-0 flex h-full w-full items-center justify-center before:absolute before:bottom-0 before:left-1/4 before:z-0 before:h-0 before:w-1/4 before:bg-[#FFA800] before:duration-500 after:absolute after:right-1/4 after:top-0 after:z-0 after:h-0 after:w-1/4 after:bg-[#FFA800] after:duration-500 hover:text-white group-hover:before:h-full group-hover:after:h-full'></span>
                <span className='absolute bottom-0 left-0 right-0 top-0 z-10 flex h-full w-full items-center justify-center group-hover:text-white '>
                  Explore
                </span>
              </button>
            </div>
          </div>

          {/* Other Spaces Card */}
          <div className='room__card bg-white overflow-hidden rounded-lg shadow-md'>
            <div className='room__card__image'>
              <img src={space3} alt='room' />
              <div className='room__card__icons absolute right-4 bottom-4 w-full flex items-center justify-end flex-wrap gap-4 z-10'>
                <span className='inline-block px-2 py-2 text-2xl bg-white rounded-full shadow-lg cursor-pointer'>
                  <MonitorCheck className='w-6 h-6' />
                </span>
                <span className='inline-block px-2 py-2 text-2xl bg-white rounded-full shadow-lg cursor-pointer'>
                  <ClipboardCheck className='w-6 h-6' />
                </span>
                <span className='inline-block px-2 py-2 text-2xl bg-white rounded-full shadow-lg cursor-pointer'>
                  <Podcast className='w-6 h-6' />
                </span>
              </div>
            </div>
            <div className='room__card__details p-4'>
              <h4 className='mb-2 text-xl font-semibold'>Other Spaces</h4>
              <p className='my-4 text-gray-600'>
              Discover versatile spaces offering tailored environments, from collaborative hubs to quiet zones, with amenities like Wi-Fi and flexible setups for meetings, events, or focused work.
              </p>
              <h5 className='mb-4 text-base font-medium text-gray-400'>
                Starting from <span className='text-xl text-[#FFA800] font-bold '>$249/hour</span>
              </h5>

              <button
                onClick={() => handleExplore('Other Spaces')}
                className='group relative font-bold rounded-lg min-h-[50px] w-40 overflow-hidden border border-[#FFA800] bg-[#FFDFAE]/40 text-[#FFA800]  shadow-2xl transition-all before:absolute before:left-0 before:top-0 before:h-0 before:w-1/4 before:bg-[#FFA800] before:duration-500 after:absolute after:bottom-0 after:right-0 after:h-0 after:w-1/4 after:bg-[#FFA800] after:duration-500 hover:text-white hover:before:h-full hover:after:h-full'
              >
                <span className='top-0 flex h-full w-full items-center justify-center before:absolute before:bottom-0 before:left-1/4 before:z-0 before:h-0 before:w-1/4 before:bg-[#FFA800] before:duration-500 after:absolute after:right-1/4 after:top-0 after:z-0 after:h-0 after:w-1/4 after:bg-[#FFA800] after:duration-500 hover:text-white group-hover:before:h-full group-hover:after:h-full'></span>
                <span className='absolute bottom-0 left-0 right-0 top-0 z-10 flex h-full w-full items-center justify-center group-hover:text-white '>
                  Explore
                </span>
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Explore

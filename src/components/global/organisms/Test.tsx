import React from 'react'
import Slider from 'react-slick'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import { Star } from 'lucide-react'
import './Testimonial.css'
import './AboutUs.css'
const Testimonial = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay: true, // Enable auto-scrolling
    autoplaySpeed: 2000, // Set the speed in milliseconds
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]
  }

  return (
    <div className='relative testimonial-slider-container mt-56' style={{ padding: '0px 25px' }} >
        <div className='box absolute -top-72 left-0 ' ></div>
        <p
          className='font-paytoneone mb-4 -top-10 text-center relative z-10 text-6xl'
          style={{
            background: 'linear-gradient(90deg, #464C52, #C6A083)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent'
          }}
          id='testimonial'
        >
          <span className='absolute top-40 left-4 w-[120px] h-[120px] bg-white/70 rounded-full blur-[25px] -translate-x-1/2 -translate-y-1/2'></span>
          <span>Precious Words From Our Customers</span>
        </p>
    <Slider {...settings}>
      {[...Array(10)].map((_, index) => (
        <div
          className='testimonial-card bg-white rounded-3xl p-6 flex flex-col my-20'
          style={{
            minWidth: '300px',
            marginRight: '20px', // Add space between cards
            boxShadow:
              'rgba(0, 0, 0, 0.07) 0px 1px 2px, rgba(0, 0, 0, 0.07) 0px 2px 4px, rgba(0, 0, 0, 0.07) 0px 4px 8px, rgba(0, 0, 0, 0.07) 0px 8px 16px, rgba(0, 0, 0, 0.07) 0px 16px 32px, rgba(0, 0, 0, 0.07) 0px 32px 64px'
          }} // Ensure minimum width to avoid clipping
        >
          <div className='flex justify-between items-start '>
            <div className='flex items-center mb-4'>
              <div className='w-12 h-12 bg-gray-300 rounded-full'></div>
              <div className='ml-4'>
                <p className='text-gray-800 font-semibold'>Vo Thi My Tien</p>
                <p className='text-sm text-gray-500'>UI/UX Designer</p>
              </div>
            </div>

            <div className='flex justify-center items-center gap-2'>
              <span>5</span>
              <Star color='#ffc006' fill='#ffc006' />
            </div>
          </div>
          <p className='text-gray-600 mb-4 '>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque id turpis in neque tempor dignissim.
          </p>
        </div>
      ))}
    </Slider>
    </div>
  )
}

export default Testimonial

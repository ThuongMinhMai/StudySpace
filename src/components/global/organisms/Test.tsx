import { Star } from 'lucide-react'
import Slider from 'react-slick'
import 'slick-carousel/slick/slick-theme.css'
import 'slick-carousel/slick/slick.css'
import './AboutUs.css'
import './Testimonial.css'
import { useEffect, useState } from 'react'
import studySpaceAPI from '../../../lib/studySpaceAPI'
interface Feedback {
  avatarURL: string
  userName: string
  roomName: string
  rate: number
  feedbackText: string
}
interface ApiResponse<T> {
  data: T
}
const Testimonial = () => {
  const [testimonials, setTestimonials] = useState<Feedback[]>([])
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
  useEffect(() => {
    // Fetch testimonials data from the API
    const fetchTestimonials = async () => {
      try {
        const response = await studySpaceAPI.get<ApiResponse<Feedback[]>>('/Feedback/UI') // Replace with your API endpoint
        setTestimonials(response.data.data)
        console.log("ui",response.data.data)
      } catch (error) {
        console.error('Error fetching testimonials:', error)
      }
    }

    fetchTestimonials()
  }, [])
  return (
    <div className='relative testimonial-slider-container mt-56' style={{ padding: '0px 25px' }}>
      <div className='box absolute -top-72 left-0 '></div>
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
        {testimonials.map((testi, index) => (
          <div
            key={index}
            className='testimonial-card bg-white rounded-3xl p-6 flex flex-col my-20 h-40'
            style={{
              minWidth: '300px',
              marginRight: '20px', // Add space between cards
              boxShadow:
                'rgba(0, 0, 0, 0.07) 0px 1px 2px, rgba(0, 0, 0, 0.07) 0px 2px 4px, rgba(0, 0, 0, 0.07) 0px 4px 8px, rgba(0, 0, 0, 0.07) 0px 8px 16px, rgba(0, 0, 0, 0.07) 0px 16px 32px, rgba(0, 0, 0, 0.07) 0px 32px 64px'
            }} // Ensure minimum width to avoid clipping
          >
            <div className='flex justify-between items-start '>
              <div className='flex items-center mb-4'>
              <img
                  src={testi.avatarURL}
                  alt={`${testi.userName}'s avatar`}
                  className="w-12 h-12 bg-gray-300 rounded-full object-cover"
                />
                <div className='ml-4'>
                  <p className='text-gray-800 font-semibold'>{testi.userName}</p>
                  <p className='text-sm text-gray-500'>{testi.roomName}</p>
                </div>
              </div>

              <div className='flex justify-center items-center gap-2'>
                <span>{testi.rate}</span>
                <Star color='#ffc006' fill='#ffc006' />
              </div>
            </div>
            <p className='text-gray-600 mb-4 truncate'>
              {testi.feedbackText}
            </p>
          </div>
        ))}
      </Slider>
    </div>
  )
}

export default Testimonial

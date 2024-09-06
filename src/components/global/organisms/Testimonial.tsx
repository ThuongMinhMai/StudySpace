import { useEffect, useRef, useState } from 'react'
import { Star } from 'lucide-react'
const Testimonial = () => {
  const containerRef = useRef<HTMLDivElement | null>(null)
  const [isPaused, setIsPaused] = useState(false)

  useEffect(() => {
    const container = containerRef.current
    let scrollInterval: NodeJS.Timeout

    const startScrolling = () => {
      scrollInterval = setInterval(() => {
        if (container && !isPaused) {
          container.scrollBy({
            top: 0,
            left: 12, // Adjust the scroll speed
            behavior: 'smooth'
          })

          // Check if the scroll position is near the end
          if (container.scrollLeft >= container.scrollWidth / 2) {
            container.scrollLeft = 0 // Reset to the start
          }
        }
      }, 1) // Interval in milliseconds, adjust for speed
    }

    startScrolling()

    return () => {
      clearInterval(scrollInterval)
    }
  }, [isPaused])

  // Optional: Pause on hover
  const handleMouseEnter = () => setIsPaused(true)
  const handleMouseLeave = () => setIsPaused(false)

  return (
    <div
      ref={containerRef}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className='testimonial-container overflow-x-hidden '
      style={{
        width: '100%',
        height: 'auto',
        display: 'flex',
        gap: '20px',
        position: 'relative'
        
      }}
      id="testimonial"
    >
      {/* Original and Cloned Content for Infinite Loop */}
      <div style={{ display: 'flex', flex: 'none' }} className=''>
        {[...Array(2)].map((_, cloneIndex) => (
          <div key={cloneIndex} style={{ display: 'flex', gap: '30px', marginRight: '30px' }}>
            {Array.from({ length: 5 }).map((_, index) => (
              <div
                key={`${cloneIndex}-${index}`}
                className='testimonial-card bg-white rounded-3xl p-6 flex flex-col w-80'
                style={{ minWidth: '300px', boxShadow: "rgba(0, 0, 0, 0.07) 0px 1px 2px, rgba(0, 0, 0, 0.07) 0px 2px 4px, rgba(0, 0, 0, 0.07) 0px 4px 8px, rgba(0, 0, 0, 0.07) 0px 8px 16px, rgba(0, 0, 0, 0.07) 0px 16px 32px, rgba(0, 0, 0, 0.07) 0px 32px 64px"}} // Ensure minimum width to avoid clipping
              >
                <div className='flex justify-between items-start '>
                  <div className='flex items-center mb-4'>
                    <div className='w-12 h-12 bg-gray-300 rounded-full'></div>
                    <div className='ml-4'>
                      <p className='text-gray-800 font-semibold'>Vo Thi My Tien</p>
                      <p className='text-sm text-gray-500'>UI/UX Designer</p>
                    </div>
                  </div>

                  <div className='flex justify-center items-center'>
                    <span>5</span>
                    <Star color='#ffc006' fill='#ffc006' />
                  </div>
                </div>
                <p className='text-gray-600 mb-4 '>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque id turpis in neque tempor
                  dignissim.
                </p>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  )
}

export default Testimonial



import React from 'react'
import Slider from 'react-slick'

function Detail() {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true, // Enable auto-scrolling
    autoplaySpeed: 1000, // Set the speed in milliseconds
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
  const imageUrls = [
    'https://via.placeholder.com/800x400?text=Image+1',
    'https://via.placeholder.com/800x400?text=Image+2',
    'https://via.placeholder.com/800x400?text=Image+3'
    // Add more image URLs as needed
  ]
  // Parse the query parameters from the URL
  return (
    <div className='w-full'>
      <Slider {...settings}>
        {imageUrls.map((url, index) => (
          <div
            key={index}
            className='slider-item'
            style={{
              minWidth: '300px',
              marginRight: '20px', // Add space between cards
              boxShadow:
                'rgba(0, 0, 0, 0.07) 0px 1px 2px, rgba(0, 0, 0, 0.07) 0px 2px 4px, rgba(0, 0, 0, 0.07) 0px 4px 8px, rgba(0, 0, 0, 0.07) 0px 8px 16px, rgba(0, 0, 0, 0.07) 0px 16px 32px, rgba(0, 0, 0, 0.07) 0px 32px 64px'
            }}
          >
            <img src={url} alt={`Slide ${index}`} className='w-full h-72' />
          </div>
        ))}
      </Slider>
    </div>
  )
}

export default Detail

import React, { useState } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react' // Import icons if you want to use them

const images = [
  'https://cafedirect.co.nz/wp-content/uploads/2022/05/Cafe-Direct-Why-Us-930x1024.png',
  //   'https://blogimage.vantagefit.io/vfitimages/2023/06/VFit__coffee-breaks-increase-efficiency.png', // Add more images as needed
  'https://www.mrisoftware.com/uk/wp-content/uploads/2022/10/meeting-room-booking-system.png',
  //   "https://cdn.kramerav.com/web/images/solutions/diagrams/executiveboardroom_diagram.png",
  'https://png.pngtree.com/png-clipart/20231001/original/pngtree-d-rendering-of-a-coffee-shop-modern-coffeeshop-3d-illustration-of-png-image_13027022.png',
  'https://gofloaters.com/static/219ccad47eda277fb85e480d3c7c8e6c/2a4de/meeting-space.png',
  'https://www.servicedofficecompany.co.uk/wp-content/uploads/2021/09/location-overview-2.png',
//   'https://www.logitech.com/content/dam/logitech/en/video-collaboration/resource-center/articles/thumbnail-infrasctucture-sprawl.png.imgo.png',
  'https://www.solutionzinc.com/hs-fs/hubfs/Conference%20and%20Meeting.png?width=2000&height=2000&name=Conference%20and%20Meeting.png',
  'https://cdn.webshopapp.com/shops/286085/files/414640310/750x750x2/kartent-cardboard-mobile-meeting-room.jpg',
  'https://www.solutionzinc.com/hs-fs/hubfs/Conference%20Room%20Pic.png?width=500&height=500&name=Conference%20Room%20Pic.png',
  'https://kova.uk.com/wp-content/uploads/2022/01/first-screen-services-1024x982.png'
]

const ImageSlider: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0)

  const handlePrev = () => {
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? images.length - 1 : prevIndex - 1))
  }

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex === images.length - 1 ? 0 : prevIndex + 1))
  }

  return (
    <div className=' w-full h-96'>
      <img src={images[currentIndex]} alt={`Image ${currentIndex + 1}`} className='w-full h-full object-cover' />
      <div className=' bottom-4 flex justify-center px-4'>
        <button
          className='bg-[#C6A083] text-white p-2 rounded-full'
          onClick={handlePrev}
        >
          <ChevronLeft className='w-6 h-6' />
        </button>
        <button
          className='bg-[#C6A083] text-white p-2 rounded-full'
          onClick={handleNext}
        >
          <ChevronRight className='w-6 h-6' />
        </button>
      </div>
    </div>
  )
}

export default ImageSlider

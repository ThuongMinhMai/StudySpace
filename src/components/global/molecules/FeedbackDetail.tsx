import React, { useState } from 'react'
import { Modal, Carousel, Image, Rate } from 'antd'
import starFillIcon from '@/assets/star-fill.svg'
import Slider from 'react-slick'

interface Feedback {
  userName: string
  bookingDate: string
  reviewText: string
  images: string[]
  star: number
  avatar: string
}

interface RatingDetailProps {
  feedback: Feedback
}

const formatDate = (dateString: string) => {
  const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' }
  return new Date(dateString).toLocaleDateString(undefined, options)
}

function FeedbackDetail({ feedback }: RatingDetailProps) {
 
  const [isModalVisible, setIsModalVisible] = useState(false)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const defaultAvatar = 'https://i.pinimg.com/originals/7d/83/2a/7d832a6867b7a6b4fbec7ff05864df6e.png'
  const settings = {
    initialSlide: currentImageIndex,
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
    draggable: true,
    nextArrow: <div className='slick-next'>Next</div>, // Customize arrow styles if needed
    prevArrow: <div className='slick-prev'>Previous</div>
  }
  const handleImageClick = (index: number) => {
    setCurrentImageIndex(index)
    setIsModalVisible(true)
  }

  const handleCancel = () => {
    setIsModalVisible(false)
  }

  return (
    <div className='flex justify-center mb-4 '>
      <div className='w-full p-4 cursor-pointer drop-shadow-md bg-[#e5dbcf] rounded-md '>
        <div className='flex items-center justify-between mb-4 '>
          <div className='flex items-center justify-center'>
            <div className='w-12 h-12 mr-2 overflow-hidden rounded-full'>
              <img className='object-cover w-full h-full' src={defaultAvatar} alt='Profile Image' />
            </div>

            <div className='flex flex-col justify-center items-start'>
              <strong className='text-md'>{feedback.userName}</strong>
              <div className='text-muted-foreground text-sm flex justify-center items-center gap-1'>
                <span>Đặt ngày: </span>
                <span>{formatDate(feedback.bookingDate)}</span>
              </div>
            </div>
          </div>

          <div className='flex'>
            {/* {Array(feedback.Rating)
              .fill(null)
              .map((_, index) => (
                <img key={index} src={starFillIcon} className='w-5 h-5' alt='star' />
              ))} */}
            <Rate allowHalf disabled defaultValue={feedback.star} style={{ color: '#e8c915' }} />
          </div>
        </div>

        <div className='text-foreground text-base text-start'>{feedback.reviewText}</div>

        <div className='flex gap-2 mt-2'>
          {feedback.images && feedback.images.length > 0 && (
            <>
              {feedback.images.map((img, index) => (
                <img
                  key={index}
                  className='object-cover w-24 h-32 rounded cursor-pointer aspect-square'
                  src={img}
                  alt='rating'
                  onClick={() => handleImageClick(index)}
                />
              ))}

              {/* Modal for image gallery */}
              <Modal visible={isModalVisible} footer={null} onCancel={handleCancel} centered width={800}>
                <Slider {...settings}>
                  {feedback.images.map((img, index) => (
                    <div key={index} className='flex justify-center items-center '>
                      <img
                        src={img}
                        alt={`Feedback Image ${index + 1}`}
                        className='object-contain h-[400px] rounded-md'
                      />
                    </div>
                  ))}
                </Slider>
              </Modal>
            </>
          )}
        </div>
      </div>
    </div>
  )
}

export default FeedbackDetail

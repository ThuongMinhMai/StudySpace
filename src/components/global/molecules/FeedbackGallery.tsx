import { Modal, Popover } from 'antd'
import { ArrowLeft, ArrowRight } from 'lucide-react'
import { useState } from 'react'
const FeedbackGallery = ({ images }: any) => {
  // State to track the current image index
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [isModalVisible, setIsModalVisible] = useState(false)

  // State to track the image for the modal
  const [modalImage, setModalImage] = useState('')
  const [modalText, setModalText] = useState('')
  // Function to handle going to the next image
  const handleNext = () => {
    if (currentImageIndex < images.length - 1) {
      setCurrentImageIndex(currentImageIndex + 1)
    }
  }

  // Function to handle going to the previous image
  const handlePrev = () => {
    if (currentImageIndex > 0) {
      setCurrentImageIndex(currentImageIndex - 1)
    }
  }
  // Function to handle opening the modal
  const showModal = (image: string) => {
    setModalImage(image)
    setModalText('Additional information about this image')
    setIsModalVisible(true)
  }

  // Function to handle closing the modal
  const handleCancel = () => {
    setIsModalVisible(false)
  }
  return (
    <div className='relative w-full mx-auto text-center mt-10'>
      {/* Display current image */}
      <Popover title={<span className='text-[#647C6C]'>Click on the photo to see detailed review</span>}>
        <img
          src={images[currentImageIndex]}
          alt={`Feedback ${currentImageIndex + 1}`}
          className='w-full h-[400px] object-cover mb-4 cursor-pointer'
          onClick={() => showModal(images[currentImageIndex])}
        />
      </Popover>
      {/* Previous and Next Icons */}
      <div>
        {/* Previous Icon */}
        <img
          src='https://media.yeah1.com/files/nguyetthao/2024/09/17/z5838759713922_f9f42b42471343f55ebda1bd4ec0d982-104345.jpg'
          className={`absolute bottom-10 w-12 h-12 object-cover left-4 transform -translate-y-1/2 p-1 bg-[#fcf6f0]  rounded-full`}
        />
        {/* <ArrowLeft
          className={`absolute bottom-10 left-3 transform -translate-y-1/2 p-1 bg-white rounded-full text-gray-700 `}
          size={30}
        /> */}
        <ArrowLeft
          onClick={handlePrev}
          className={`absolute top-1/2 left-2 transform -translate-y-1/2 p-1 bg-white rounded-full text-gray-700  ${
            currentImageIndex === 0 ? 'opacity-50 cursor-not-allowed bg-black' : 'cursor-pointer'
          }`}
          size={30}
        />

        {/* Next Icon */}
        <ArrowRight
          onClick={handleNext}
          className={`absolute top-1/2 right-2 transform -translate-y-1/2 p-1 bg-white rounded-full text-gray-700  ${
            currentImageIndex === images.length - 1 ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'
          }`}
          size={30}
        />
        <div className='float-right flex'>
          <p className='cursor-pointer text-[#647C6C] hover:underline  transition-all'>See all</p>
          <ArrowRight color='#647C6C' />
        </div>
      </div>

      <Modal visible={isModalVisible} footer={null} onCancel={handleCancel} centered width={800}>
        <div className='flex flex-col items-center'>
          <img src={modalImage} alt='Modal Content' className='w-full h-[500px] object-cover mb-4' />
          <p>{modalText}</p>
        </div>
      </Modal>
    </div>
  )
}

export default FeedbackGallery

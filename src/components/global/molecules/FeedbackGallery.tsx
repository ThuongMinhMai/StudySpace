import { ConfigProvider, Modal, Pagination, Popover, Rate, Tooltip } from 'antd'
import { ArrowLeft, ArrowRight, ExternalLink, Maximize, Minimize, Minimize2 } from 'lucide-react'
import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { motion } from 'framer-motion'
import FeedbackDetail from './FeedbackDetail'
import studySpaceAPI from '../../../lib/studySpaceAPI'
interface FeedbackDetailData {
  feedbackId: number
  status: boolean
  star: number
  userName: string
  userAvaUrl: string
  reviewText: string
  bookingDate: string
  feedbackImages: string[]
}
const FeedbackGallery = ({ images }: any) => {
  const { id } = useParams()
  const totalImages = images.length
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [isModalVisible, setIsModalVisible] = useState(false)
  const [isExpanded, setIsExpanded] = useState(false) // State to track if "See All" is clicked
  const [modalImage, setModalImage] = useState('')
  const [modalText, setModalText] = useState('')
  const [modalFeedback, setModalFeedback] = useState<FeedbackDetailData | null>(null)
  const [allFeedback, setAllFeedback] = useState([])
  const [totalFeedback, setTotalFeedback] = useState(0)
  const [currentPage, setCurrentPage] = useState(1)
  const [pageSize] = useState(6) // Number of feedback items per page
  // Sample ratings for the expanded cards
  // const ratings = [
  //   { image: images[0], rating: 4.5, feedback: 'Great service and comfortable trip!' },
  //   { image: images[1], rating: 3.8, feedback: 'The experience was okay, could be better.' },
  //   { image: images[2], rating: 5, feedback: 'Excellent! Would highly recommend.' }
  //   // Add more as needed
  // ]

  // const imageUrls = [
  //   'https://images.squarespace-cdn.com/content/v1/6352a024aeb13620d6a839b0/06b31b78-2c10-496f-967c-8986490cc696/BoltonInterior-03777.JPG',
  //   'https://fnb.qdc.vn/pictures/catalog/hinh-banner/dinh-coffee-2000.jpg',
  //   'https://jukeboxy-media.s3.amazonaws.com/blog/wp-content/uploads/2022/04/04095646/music-for-coffee-shop.jpg'
  // ]
  // const feedback = {
  //   UserName: 'Thuongminhlsr',
  //   ImageUrl: imageUrls,
  //   Rating: 4.5,
  //   Desciption: 'Great service and comfortable trip!',
  //   Date: '2024-09-24',
  //   Avt: 'https://fnb.qdc.vn/pictures/catalog/hinh-banner/dinh-coffee-2000.jpg'
  // }
  // {UserName:"Thuongminhlst",ImageUrl: imageUrls, Rating: 4.5, Desciption: 'Great service and comfortable trip!',Date:"20-10-2024", Avt:"https://fnb.qdc.vn/pictures/catalog/hinh-banner/dinh-coffee-2000.jpg" },
  // {UserName:"Thuongminhlst",ImageUrl: imageUrls, Rating: 4.5, Desciption: 'Great service and comfortable trip!',Date:"20-10-2024", Avt:"https://fnb.qdc.vn/pictures/catalog/hinh-banner/dinh-coffee-2000.jpg" },

  // Add more as needed
  useEffect(() => {
    if (isExpanded) {
      fetchFeedback(currentPage)
    }
  }, [isExpanded, currentPage])
  const handleNext = () => {
    if (currentImageIndex < images.length - 1) {
      setCurrentImageIndex(currentImageIndex + 1)
    }
  }

  const handlePrev = () => {
    if (currentImageIndex > 0) {
      setCurrentImageIndex(currentImageIndex - 1)
    }
  }

  const showModal = async (id: string) => {
    // setModalImage(image)
    // setModalText('Additional information about this image')

    try {
      // Assuming your API endpoint is something like /api/feedback/:fbid
      const response = await studySpaceAPI.get(`/Feedback/detail/${id}`)
      setModalFeedback(response.data.data) // Set fetched feedback details
      // setModalText(response.data.feedback) // Set feedback text (optional)
    } catch (error) {
      console.error('Error fetching feedback details:', error)
    }
    setIsModalVisible(true)
  }

  const handleCancel = () => {
    setIsModalVisible(false)
  }

  const toggleExpanded = async () => {
    setIsExpanded(!isExpanded)
    if (!isExpanded) {
      fetchFeedback(currentPage)
    }
  }
  const fetchFeedback = async (page: number) => {
    try {
      const response = await studySpaceAPI.get(`/Feedback/detail/room/${id}?pageNumber=${page}&pageSize=${pageSize}`)
      setAllFeedback(response.data.data.feedbackResponses)
      setTotalFeedback(response.data.data.todalFeedback)
    } catch (error) {
      console.error('Error fetching all feedback:', error)
    }
  }
  const handlePageChange = (page: number) => {
    setCurrentPage(page)
    fetchFeedback(page) // Fetch new feedback data on page change
  }
  return (
    <div className='relative w-full mx-auto text-center mt-10'>
      {/* Display current image */}
      <Popover title={<span className='text-[#647C6C]'>Click on the photo to see detailed review</span>}>
        <img
          src={images[currentImageIndex]?.feedbackImage[0] || ''}
          alt={`Feedback ${currentImageIndex + 1}`}
          className='w-full h-[400px] object-cover mb-4 cursor-pointer'
          // onClick={() => showModal(images[currentImageIndex]?.feedbackImage[0])}
          onClick={() => showModal(images[currentImageIndex]?.feedbackId)}
        />
      </Popover>
      <div className='absolute top-5 right-5 bg-[#647C6C] text-white px-3 py-1 rounded-full'>
        {currentImageIndex + 1}/{totalImages}
      </div>
      {/* Previous and Next Icons */}
      <div>
        <Tooltip title={<span className='text-white'>{images[currentImageIndex].userName}</span>}>
          <img
            src={images[currentImageIndex]?.userAvatarUrl}
            alt={images[currentImageIndex].userName}
            className='absolute top-[360px] w-12 h-12 object-cover left-6 transform -translate-y-1/2 p-1 bg-[#fcf6f0]  rounded-full'
          />
        </Tooltip>

        <ArrowLeft
          onClick={handlePrev}
          className={`absolute top-52 left-2 transform -translate-y-1/2 p-1 bg-white rounded-full text-gray-700 z-10 ${
            currentImageIndex === 0 ? 'opacity-50 cursor-not-allowed bg-black' : 'cursor-pointer'
          }`}
          size={30}
        />
        <ArrowRight
          onClick={handleNext}
          className={`absolute top-52 right-2 transform -translate-y-1/2 p-1 bg-white rounded-full text-gray-700 z-10 ${
            currentImageIndex === images.length - 1 ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'
          }`}
          size={30}
        />

        <Link to='#' className='float-right flex' onClick={toggleExpanded}>
          <p className='cursor-pointer text-[#647C6C] hover:underline transition-all transform'>
            {isExpanded ? 'Hidden' : 'See all'}
          </p>
          {isExpanded ? <Minimize color='#647C6C' className='ml-1' /> : <Maximize color='#647C6C' className='ml-1' />}
        </Link>
      </div>
      {/* Expandable section with cards showing ratings */}
      <motion.div
        initial={{ height: 0, opacity: 0 }}
        animate={{ height: isExpanded ? 'auto' : 0, opacity: isExpanded ? 1 : 0 }}
        transition={{ duration: 0.5 }}
        className={`overflow-hidden mt-14 h-98`}
      >
        <div className='text-start text-xl font-medium my-4 text-[#647C6C]'>{totalFeedback} Feedbacks</div>
        <div className='h-[700px] overflow-auto'>
          {allFeedback.map((feedback, index) => (
            <FeedbackDetail feedback={feedback} />
          ))}
        </div>
        <ConfigProvider
          theme={{
            token: {
              colorPrimary: '#647C6C'
            },
            components: {
              Button: {}
            }
          }}
        >
          <div className='flex justify-center items-center'>
            <Pagination
              current={currentPage}
              pageSize={pageSize}
              total={totalFeedback}
              onChange={handlePageChange}
              className='mt-4'
            />
          </div>
        </ConfigProvider>
      </motion.div>

      {/* Modal for showing large image */}
      <Modal visible={isModalVisible} footer={null} onCancel={handleCancel} centered width={800}>
        {/* <div className='flex flex-col items-center'>
          <img src={modalImage} alt='Modal Content' className='w-full h-[500px] object-cover mb-4' />
          <p>{modalText}</p>
        </div> */}

        {modalFeedback && (
          <div className='feedback-detail w-4/5 m-auto'>
            <div className='flex items-center mb-4'>
              <img
                src={modalFeedback.userAvaUrl}
                alt={modalFeedback.userName}
                className='w-12 h-12 rounded-full mr-4'
              />
              <div className='flex justify-between items-center w-full'>
                <div>
                  <h3 className='font-bold text-[#647C6C]'>{modalFeedback.userName}</h3>
                  <p>{new Date(modalFeedback.bookingDate).toLocaleDateString()}</p>
                </div>
                <Rate disabled value={modalFeedback.star} />
              </div>
            </div>
            <p className='text-lg '>{modalFeedback.reviewText}</p>
            {modalFeedback.feedbackImages.length > 0 && (
              <div className='feedback-images mt-4'>
                {modalFeedback.feedbackImages.map((image, index) => (
                  <img
                    key={index}
                    src={image}
                    alt={`Feedback Image ${index + 1}`}
                    className='w-32 h-32 object-cover mr-2 rounded-md'
                  />
                ))}
              </div>
            )}
          </div>
        )}
      </Modal>
    </div>
  )
}

export default FeedbackGallery

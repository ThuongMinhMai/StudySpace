import { Image, Modal, Tooltip } from 'antd'
import { Layers2, Moon, Scaling, Undo2, User } from 'lucide-react'
import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import Slider from 'react-slick'
import 'slick-carousel/slick/slick-theme.css'
import 'slick-carousel/slick/slick.css'
import star from '../../../assets/star-fill.svg'
import studySpaceAPI from '../../../lib/studySpaceAPI'
import Amentities from '../molecules/Amentities'
import BookingForm from '../molecules/BookingForm'
import FeedbackGallery from '../molecules/FeedbackGallery'
import HouseRule from '../molecules/HouseRule'
import SpaceLocation from '../molecules/SpaceLocation'
import RelatedRoom from '../molecules/RelatedRoom'
import { formatPrice } from '../../../lib/utils'
interface RelatedRoom {
  roomId: number
  roomName: string
  storeName: string
  capacity: number
  pricePerHour: number
  description: string
  status: boolean
  area: number
  type: string
  image: string | null
  address: string | ""
  isOvernight:boolean
}
interface ListImages {
  imageMenu: string | null
  imageList: string[]
}
interface BookedSlot {
  start: string
  end: string
}

interface DailyBookedSlots {
  date: string
  slots: BookedSlot[]
}
interface RoomDetail {
  roomName: string
  storeName: string
  capacity: number
  pricePerHour: number
  description: string
  status: boolean
  area: number
  longtitude: number
  latitude: number
  houseRule: string[]
  typeOfRoom: string
  listImages: ListImages
  aminities: string[]
  address: string
  bookedSlots: DailyBookedSlots[]
  relatedRoom: RelatedRoom[]
  isOvernight: boolean
  startTime: string
  endTime: string,
}
interface ApiResponse<T> {
  data: T
}
interface FeedbackImage {
  feedbackId: number
  userId: number
  userAvatarUrl: string
  userName: string
  feedbackImage: string[]
}

interface FeedbackData {
  averageStar: number
  imageFeedbackModels: FeedbackImage[]
}
function Detail() {
  const { id } = useParams<{ id: string }>()
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false)
  const [loadingRoomDetail, setLoadingRoomDetail] = useState<boolean>(false)
  const [loadingRoomFeedbackImage, setLoadingRoomFeedbackImage] = useState<boolean>(false)
  const [roomDetail, setRoomDetail] = useState<RoomDetail | undefined>(undefined)
  const [feedback, setFeedback] = useState<FeedbackData | undefined>(undefined)
  const navigate = useNavigate()
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
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
    const fetchRoomDetail = async () => {
      setLoadingRoomDetail(true)
      try {
        const response = await studySpaceAPI.get<ApiResponse<RoomDetail>>(`/Room/detail/${id}`)
        setRoomDetail(response.data.data)
      } catch (error) {
        console.error('Error fetching watch detail:', error)
      } finally {
        setLoadingRoomDetail(false)
      }
    }
    const fetchFeedback = async () => {
      setLoadingRoomFeedbackImage(true)
      try {
        const response = await studySpaceAPI.get<ApiResponse<FeedbackData>>(`/Feedback/all/room/${id}`) // Adjust endpoint as necessary
        setFeedback(response.data.data)
      } catch (error) {
        console.error('Error fetching feedback:', error)
      } finally {
        setLoadingRoomFeedbackImage(false)
      }
    }

    fetchRoomDetail()
    fetchFeedback() // Call the feedback fetching function
  }, [id])
  // const spaceLocation = {
  //   name: 'StudySpace',
  //   address: '123 Trần Quý Cáp, phường Phú Thủy, Thành phố Phan Thiết, Bình Thuận',
  //   city: 'Phan Thiết',
  //   postalCode: '12345',
  //   latitude: 10.934398119069566,
  //   longitude: 108.09428773144262
  // }

  // const imageUrls = [
  //   'https://images.squarespace-cdn.com/content/v1/6352a024aeb13620d6a839b0/06b31b78-2c10-496f-967c-8986490cc696/BoltonInterior-03777.JPG',
  //   // 'https://fnb.qdc.vn/pictures/catalog/hinh-banner/dinh-coffee-2000.jpg'
  //   // 'https://jukeboxy-media.s3.amazonaws.com/blog/wp-content/uploads/2022/04/04095646/music-for-coffee-shop.jpg'
  // ]
  // const images = [
  //   'https://images.squarespace-cdn.com/content/v1/6352a024aeb13620d6a839b0/06b31b78-2c10-496f-967c-8986490cc696/BoltonInterior-03777.JPG',
  //   'https://fnb.qdc.vn/pictures/catalog/hinh-banner/dinh-coffee-2000.jpg',
  //   'https://jukeboxy-media.s3.amazonaws.com/blog/wp-content/uploads/2022/04/04095646/music-for-coffee-shop.jpg'
  // ]

  // const menuImages = [
  //   'https://images.squarespace-cdn.com/content/v1/6352a024aeb13620d6a839b0/06b31b78-2c10-496f-967c-8986490cc696/BoltonInterior-03777.JPG',
  //   'https://fnb.qdc.vn/pictures/catalog/hinh-banner/dinh-coffee-2000.jpg',
  //   'https://jukeboxy-media.s3.amazonaws.com/blog/wp-content/uploads/2022/04/04095646/music-for-coffee-shop.jpg'
  // ]
  useEffect(() => {
    window.scrollTo(0, 0)
    // Update state when query parameters change
  }, [])

  const showModal = () => {
    setIsModalVisible(true)
  }

  const handleCancel = () => {
    setIsModalVisible(false)
  }

  const handleReturn = () => {
    navigate(-1) // This navigates back to the previous page
  }

  // const bookedSlots = {
  //   '2024-09-20': [
  //     { start: '10:00', end: '11:00' },
  //     { start: '14:00', end: '15:00' }
  //   ]
  // }
  // const bookedSlots = [
  //   {
  //     date: '2024-10-22',
  //     slots: [
  //       { start: '10:30', end: '11:30' },
  //       { start: '14:00', end: '15:00' }
  //     ]
  //   },
  //   { date: '2024-10-23', slots: [{ start: '09:00', end: '10:00' }] }
  // ]
  return (
    <div className='bg-gradient-to-b from-[#fcfbf9] to-[#ede4dd] w-full'>
      <div className='w-4/5 mx-auto mt-10 my-20 '>
        <Tooltip title='Return' color='#647C6C'>
          <Undo2
            color='#647C6C'
            className='fixed left-28 mt-2 cursor-pointer' // Added cursor-pointer for click effect
            onClick={handleReturn} // Navigate back when clicked
          />
        </Tooltip>

        {/* <Slider {...settings}>
          {imageUrls.map((url, index) => (
            <div key={index} className=''>
              <img src={url} alt={`Slide ${index + 1}`} className='w-full h-[450px] object-cover' />
            </div>
          ))}

        
        </Slider> */}
        {roomDetail?.listImages && roomDetail.listImages.imageList.length > 1 ? (
          <Slider {...settings}>
            {roomDetail?.listImages.imageList.map((url, index) => (
              <div key={index}>
                <img src={url} alt={`Slide ${index + 1}`} className='w-full h-[450px] object-cover' />
              </div>
            ))}
          </Slider>
        ) : (
          <img src={roomDetail?.listImages.imageList[0]} alt='Single image' className='w-full h-[450px] object-cover' />
        )}
        <div className='mt-8 flex gap-10 '>
          <div className='flex flex-col flex-[5] gap-2'>
            <div className='flex justify-between items-center'>
              <div className='text-xl  text-gray-700 mt-4'>
                From <span className='font-semibold text-2xl'>{formatPrice((roomDetail?.pricePerHour||0)*1000)}</span>
              </div>
              <div className='cursor-pointer text-[#647C6C] hover:underline  transition-all' onClick={showModal}>
                See Menu
              </div>
            </div>
            <div className='flex justify-between items-center'>
              <div className='text-4xl font-bold text-gray-800 mb-2'>{roomDetail?.roomName}</div>
              {roomDetail?.isOvernight && (
                <div className='flex justify-start items-center text-lg font-medium'>
                  <Moon size={20} className='text-blue-900' /> {/* Set icon color */}
                  <p className='text-blue-900 ml-2'>Overnight</p> {/* Set text color and spacing */}
                </div>
              )}
            </div>
            <div className='text-2xl font-bold text-[#647C6C] mb-2'>{roomDetail?.storeName}</div>

            <div className='flex items-center justify-start gap-10 mt-4 text-sm mb-4'>
              <div className='flex items-center space-x-2'>
                <Scaling />
                <span>{roomDetail?.area}M²</span>
              </div>
              <div className='flex items-center space-x-2 border-l border-r border-gray-400 px-6'>
                <User />
                <span>{roomDetail?.capacity} PERSON</span>
              </div>
              <div className='flex items-center space-x-2'>
                <Layers2 />
                <span>{roomDetail?.typeOfRoom}</span>
              </div>
            </div>
            <p className='text-2xl font-medium'>Description</p>
            <p className='text-gray-600 mt-4'>{roomDetail?.description}</p>
            {/* <p className='text-gray-600 mt-4'>
              Soleat legimus albucius qualisque. Cibo aliquam eos ei, nonumy singulis expetendis eu vel. At sit putent
              antiopam, cu erat tincidunt qui. Has agam veri no, ex pericula molestiae eos. Mea autem iusto moderatius
              cu, est habeo fugit docendi ad, eum eu utroque propriae pertinacia.
            </p> */}
            <div className='h-[1px] w-full bg-[#647C6C] my-8'></div>

            <Amentities aminities={roomDetail?.aminities || []} />
            <div className='h-[1px] w-full bg-[#647C6C] my-8'></div>

            <HouseRule houseRule={roomDetail?.houseRule || []} />
            <div className='h-[1px] w-full bg-[#647C6C] my-8'></div>

            <div className='flex justify-between items-center'>
              <p className='text-2xl font-medium'>Feedback Gallery</p>
              <div className='flex justify-center items-center gap-2'>
                <p className='text-2xl'>{feedback?.averageStar} </p>

                <img className='w-8 h-8' src={star} alt='star icon' />
              </div>
            </div>
            {feedback?.imageFeedbackModels && feedback?.imageFeedbackModels.length > 0 && (
              <FeedbackGallery images={feedback?.imageFeedbackModels} />
            )}
            {!feedback?.imageFeedbackModels && <div>No have feedback for this room</div>}
            <div className='h-[1px] w-full bg-[#647C6C] my-8'></div>

            <div>
              <SpaceLocation
                storeName={roomDetail?.storeName || ''}
                address={roomDetail?.address || ''}
                latitude={roomDetail?.latitude || 0}
                longtitude={roomDetail?.longtitude || 0}
              />
            </div>
            <div className='h-[1px] w-full bg-[#647C6C] my-8'></div>
          </div>

          <div className='flex-[2.5] h-fit sticky top-[95px]'>
            <BookingForm roomId={id} pricePerHour={(roomDetail?.pricePerHour||0)*1000} storeOpenTime={roomDetail?.startTime} storeCloseTime={roomDetail?.endTime} bookedSlots={roomDetail?.bookedSlots} />
          </div>
        </div>
        <RelatedRoom relatedRooms ={roomDetail?.relatedRoom}/>

        {/* Modal for showing menu images */}
        <Modal
          title={<span className='text-[#647C6C] text-2xl'>{roomDetail?.storeName}'s Menu</span>}
          visible={isModalVisible}
          onCancel={handleCancel}
          footer={null}
          width={800}
        >
          <Image.PreviewGroup>
            {roomDetail?.listImages.imageMenu ? (
              <Image src={roomDetail.listImages.imageMenu} alt='Menu Image' className='w-full mb-4' />
            ) : (
              <p>No menu image available.</p>
            )}
          </Image.PreviewGroup>
        </Modal>
      </div>
    </div>
  )
}

export default Detail

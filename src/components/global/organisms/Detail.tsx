import { Image, Modal, Popover, Tooltip } from 'antd'
import { Layers2, Scaling, Undo2, User } from 'lucide-react'
import { useEffect, useState } from 'react'
import Slider from 'react-slick'
import 'slick-carousel/slick/slick-theme.css'
import 'slick-carousel/slick/slick.css'
import star from '../../../assets/star-fill.svg'
import Amentities from '../molecules/Amentities'
import HouseRule from '../molecules/HouseRule'
import FeedbackGallery from '../molecules/FeedbackGallery'
import SpaceLocation from '../molecules/SpaceLocation'
import { useNavigate } from 'react-router-dom'
import RelatedRoom from '../molecules/RelatedRoom'
import BookingForm from '../molecules/BookingForm'
function Detail() {
  const [isModalVisible, setIsModalVisible] = useState(false)
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
  const spaceLocation = {
    name: 'StudySpace',
    address: '123 Trần Quý Cáp, phường Phú Thủy, Thành phố Phan Thiết, Bình Thuận',
    city: 'Phan Thiết',
    postalCode: '12345',
    latitude: 10.934398119069566,
    longitude: 108.09428773144262
  }

  const imageUrls = [
    'https://images.squarespace-cdn.com/content/v1/6352a024aeb13620d6a839b0/06b31b78-2c10-496f-967c-8986490cc696/BoltonInterior-03777.JPG',
    'https://fnb.qdc.vn/pictures/catalog/hinh-banner/dinh-coffee-2000.jpg',
    'https://jukeboxy-media.s3.amazonaws.com/blog/wp-content/uploads/2022/04/04095646/music-for-coffee-shop.jpg'
  ]
  const images = [
    'https://images.squarespace-cdn.com/content/v1/6352a024aeb13620d6a839b0/06b31b78-2c10-496f-967c-8986490cc696/BoltonInterior-03777.JPG',
    'https://fnb.qdc.vn/pictures/catalog/hinh-banner/dinh-coffee-2000.jpg',
    'https://jukeboxy-media.s3.amazonaws.com/blog/wp-content/uploads/2022/04/04095646/music-for-coffee-shop.jpg'
  ]

  const menuImages = [
    'https://images.squarespace-cdn.com/content/v1/6352a024aeb13620d6a839b0/06b31b78-2c10-496f-967c-8986490cc696/BoltonInterior-03777.JPG',
    'https://fnb.qdc.vn/pictures/catalog/hinh-banner/dinh-coffee-2000.jpg',
    'https://jukeboxy-media.s3.amazonaws.com/blog/wp-content/uploads/2022/04/04095646/music-for-coffee-shop.jpg'
  ]
  useEffect(() => {
    // window.scrollTo(0, 0)
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
  const bookedSlots = [
    { date: '2024-09-20', slots: [{ start: '10:30', end: '11:30' }, { start: '14:00', end: '15:00' }] },
    { date: '2024-09-21', slots: [{ start: '09:00', end: '10:00' }] },
  ];
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

        <Slider {...settings}>
          {imageUrls.map((url, index) => (
            <div key={index}>
              <img src={url} alt={`Slide ${index + 1}`} className='w-full h-[450px] object-cover' />
            </div>
          ))}
        </Slider>

        <div className='mt-8 flex gap-10 '>
          <div className='flex flex-col flex-[5] gap-2'>
            <div className='flex justify-between items-center'>
              <div className='text-xl  text-gray-700 mt-4'>
                From <span className='font-semibold text-2xl'> 5.6$</span>
              </div>
              <div className='cursor-pointer text-[#647C6C] hover:underline  transition-all' onClick={showModal}>
                See Menu
              </div>
            </div>
            <div className='text-4xl font-bold text-gray-800 mb-2'>Basic Suite</div>
            <div className='flex items-center justify-start gap-10 mt-4 text-sm mb-4'>
              <div className='flex items-center space-x-2'>
                <Scaling />
                <span>120M²</span>
              </div>
              <div className='flex items-center space-x-2 border-l border-r border-gray-400 px-6'>
                <User />
                <span>1000 PERSON</span>
              </div>
              <div className='flex items-center space-x-2'>
                <Layers2 />
                <span>Basic</span>
              </div>
            </div>
            <p className='text-2xl font-medium'>Description</p>
            <p className='text-gray-600 mt-4'>
              Soleat legimus albucius qualisque. Cibo aliquam eos ei, nonumy singulis expetendis eu vel. At sit putent
              antiopam, cu erat tincidunt qui. Has agam veri no, ex pericula molestiae eos. Mea autem iusto moderatius
              cu, est habeo fugit docendi ad, eum eu utroque propriae pertinacia.
            </p>
            <p className='text-gray-600 mt-4'>
              Soleat legimus albucius qualisque. Cibo aliquam eos ei, nonumy singulis expetendis eu vel. At sit putent
              antiopam, cu erat tincidunt qui. Has agam veri no, ex pericula molestiae eos. Mea autem iusto moderatius
              cu, est habeo fugit docendi ad, eum eu utroque propriae pertinacia.
            </p>
            <div className='h-[1px] w-full bg-[#647C6C] my-8'></div>

            <Amentities />
            <div className='h-[1px] w-full bg-[#647C6C] my-8'></div>

            <HouseRule />
            <div className='h-[1px] w-full bg-[#647C6C] my-8'></div>

            <div className='flex justify-between items-center'>
              <p className='text-2xl font-medium'>Feedback Gallery</p>
              <div className='flex justify-center items-center gap-2'>
                <p className='text-2xl'>4.5 </p>

                <img className='w-8 h-8' src={star} alt='star icon' />
              </div>
            </div>
            <FeedbackGallery images={images} />
            <div className='h-[1px] w-full bg-[#647C6C] my-8'></div>

            <div>
              <SpaceLocation
                name={spaceLocation.name}
                address={spaceLocation.address}
                city={spaceLocation.city}
                postalCode={spaceLocation.postalCode}
                latitude={spaceLocation.latitude}
                longitude={spaceLocation.longitude}
              />
            </div>
            <div className='h-[1px] w-full bg-[#647C6C] my-8'></div>
          </div>

          <div className='flex-[2 h-fit sticky top-[95px]'>
            <BookingForm storeOpenTime='09:00' storeCloseTime='18:00' bookedSlots={bookedSlots} />,
          </div>
        </div>
        <RelatedRoom />

        {/* Modal for showing menu images */}
        <Modal
          title={<span className='text-[#647C6C] text-2xl'>Basic Suite's Menu</span>}
          visible={isModalVisible}
          onCancel={handleCancel}
          footer={null}
          width={800}
        >
          <Image.PreviewGroup>
            {menuImages.map((url, index) => (
              <Image key={index} src={url} alt={`Menu ${index + 1}`} className='w-full mb-4' />
            ))}
          </Image.PreviewGroup>
        </Modal>
      </div>
    </div>
  )
}

export default Detail

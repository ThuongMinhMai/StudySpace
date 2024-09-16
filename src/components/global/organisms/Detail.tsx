import { Image, Modal } from 'antd'
import {
  Layers2,
  Scaling,
  User
} from 'lucide-react'
import { useEffect, useState } from 'react'
import Slider from 'react-slick'
import 'slick-carousel/slick/slick-theme.css'
import 'slick-carousel/slick/slick.css'
import star from '../../../assets/star-fill.svg'
import Amentities from '../molecules/Amentities'
import HouseRule from '../molecules/HouseRule'
import FeedbackGallery from '../molecules/FeedbackGallery'
function Detail() {
  const [isModalVisible, setIsModalVisible] = useState(false)
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
    window.scrollTo(0, 0)
    // Update state when query parameters change
  }, [])

  const showModal = () => {
    setIsModalVisible(true)
  }

  const handleCancel = () => {
    setIsModalVisible(false)
  }
  return (
    <div className='w-4/5 mx-auto mt-10 my-20'>
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
          <div className='text-4xl font-medium text-gray-800 mb-2'>Basic Suite</div>
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
          <p className='text-2xl'>Description</p>
          <p className='text-gray-600 mt-4'>
            Soleat legimus albucius qualisque. Cibo aliquam eos ei, nonumy singulis expetendis eu vel. At sit putent
            antiopam, cu erat tincidunt qui. Has agam veri no, ex pericula molestiae eos. Mea autem iusto moderatius cu,
            est habeo fugit docendi ad, eum eu utroque propriae pertinacia.
          </p>
          <p className='text-gray-600 mt-4'>
            Soleat legimus albucius qualisque. Cibo aliquam eos ei, nonumy singulis expetendis eu vel. At sit putent
            antiopam, cu erat tincidunt qui. Has agam veri no, ex pericula molestiae eos. Mea autem iusto moderatius cu,
            est habeo fugit docendi ad, eum eu utroque propriae pertinacia.
          </p>
          <hr className='my-8' />

          <Amentities />
          <hr className='my-8' />
          <HouseRule />
          <hr className='my-8' />

          <div className='flex justify-between items-center'>
            <p className='text-2xl'>Feedback Gallery</p>
            <div className='flex justify-center items-center gap-2'>
              <p className='text-2xl'>4.5 </p>
              <img className='w-8 h-8' src={star} alt='star icon' />
            </div>

          </div>
            <FeedbackGallery images={images} />
        </div>

        <div className='flex-[2] bg-red-200 h-fit'>fjhghljlk</div>
      </div>

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
  )
}

export default Detail

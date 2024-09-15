import Slider from 'react-slick'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import { Layers2, Scaling, User } from 'lucide-react'

function Detail() {
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

  return (
    <div className='w-4/5 mx-auto mt-10'>
      <Slider {...settings}>
        {imageUrls.map((url, index) => (
          <div key={index}>
            <img src={url} alt={`Slide ${index + 1}`} className='w-full h-[450px] object-cover' />
          </div>
        ))}
      </Slider>

      <div className='mt-8 flex '>
        <div className='flex flex-col flex-[5]'>
          <div className='text-lg font-semibold text-gray-700'>From 5.6$</div>
          <div className='text-2xl font-bold text-gray-800 mb-2'>Basic Suite</div>
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
          <p>Description</p>
          <p className='text-gray-600'>
            Soleat legimus albucius qualisque. Cibo aliquam eos ei, nonumy singulis expetendis eu vel. At sit putent
            antiopam, cu erat tincidunt qui. Has agam veri no, ex pericula molestiae eos. Mea autem iusto moderatius cu,
            est habeo fugit docendi ad, eum eu utroque propriae pertinacia.
          </p>
        </div>

        <div className='flex-[2] bg-red-200'>
            fjhghljlk
        </div>
      </div>
    </div>
  )
}

export default Detail

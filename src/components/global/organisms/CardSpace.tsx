import { Card, ConfigProvider } from 'antd'
import { Layers2, MapPin, Scaling, User } from 'lucide-react'
import { Link } from 'react-router-dom'
const { Meta } = Card

const CardSpace = ({ roomId, storeName, roomName, description, imgSrc, price, area, capacity, type, address }: any) => {
  return (
    <div className='relative min-w-80 mx-auto shadow-lg max-w-[350px]'>
      <ConfigProvider
        theme={{
          token: {
            colorPrimary: '#647C6C'
          }
        }}
      >
        <Link to={`/detail/${roomId}`}>
          <Card
            hoverable
            cover={
              <div className='relative'>
                <div className='card text-lg font-bold' data-label={`From: ${price || 0}$`}>
                  <div className='relative overflow-hidden'>
                    <img
                      alt={roomName}
                      src={imgSrc}
                      className='h-56 w-full object-cover transition-transform duration-300 ease-in-out hover:scale-105 z-[100]'
                    />
                  </div>
                </div>
              </div>
            }
            className='card-space border-none rounded-none'
            style={{ borderRadius: '0px' }} // Ensure no border-radius
          >
            {/* Information section */}
            <div className='flex items-center justify-between space-x-4 text-sm mb-4'>
              <div className='flex items-center space-x-1'>
                <Scaling />
                <span>{area || '10'}M2</span>
              </div>
              <div className='flex items-center space-x-1 border-l-2 border-r-2  px-7 border-black/50'>
                <User />
                <span>{capacity} PERSON</span>
              </div>
              <div className='flex items-center space-x-1'>
                <Layers2 />
                <span>{type || 'Basic'}</span>
              </div>
            </div>
            <div className='flex flex-col space-y-2 mb-4'>
              {/* Shop Name */}
              <h3 className='text-lg font-bold text-[#1d9447]'>{storeName || 'Cloudy Coffee'}</h3>

              {/* Room Name */}
              <h2 className='text-2xl font-semibold'>{roomName || 'Room 023'}</h2>
              <div className='flex justify-start items-center gap-2 font-medium'>
                <MapPin className='w-5 h-5' color='red' />
                <p>{address}</p>
              </div>
            </div>

            {/* Description */}
            <Meta description={description} />

            {/* Book Now Button */}
            <button className='w-full mt-5 py-3 text-base rounded-md font-medium border-2 border-[#647C6C] text-[#647C6C] hover:bg-[#647C6C] hover:text-white transition-all'>
              Book Now
            </button>
          </Card>
        </Link>
      </ConfigProvider>
    </div>
  )
}

export default CardSpace

import { Card, Button, ConfigProvider } from 'antd'
import { Usb } from 'lucide-react'
import { Scaling, User } from 'lucide-react'
import { Layers2 } from 'lucide-react'
import { Link } from 'react-router-dom'
const { Meta } = Card
const CardSpace = ({ title, description, imgSrc, price, size, persons, type }: any) => {
  return (
    <div className='relative min-w-80 mx-auto shadow-lg max-w-[350px]'>
      <ConfigProvider
        theme={{
          token: {
            colorPrimary: '#647C6C'
          }
        }}
      >
        <Link to="/detail">
        <Card
          hoverable
          cover={
            <div className='relative'>
              <div className='card text-lg font-bold' data-label={`From: ${100}$`}>
                <div className=' overflow-hidden'>
                  <img alt={title} src={imgSrc} className='h-56 w-full object-cover transition-transform duration-300 ease-in-out hover:scale-105' />
                </div>
              </div>
            </div>
          }
          className='card-space border-none rounded-none '
          style={{ borderRadius: '0px' }} // Ensure no border-radius
        >
          <div className='flex items-center justify-between space-x-4 text-sm mb-4'>
            <div className='flex items-center space-x-1'>
              <Scaling />
              <span>{size || '10'}M2</span>
            </div>
            <div className='flex items-center space-x-1 border-l-2 border-r-2  px-7 border-black/50'>
              <User />
              <span>{persons} PERSON</span>
            </div>
            <div className='flex items-center space-x-1'>
              <Layers2 />
              <span>{type || 'Basic'}</span>
            </div>
          </div>
          <Meta title={<h2 className='text-xl font-semibold'>{title}</h2>} description={description} />
          {/* <Button type='default' className='w-full mt-4 py-6 font-medium border-2 hover:text-white'>
            Book Now
          </Button> */}
          <button
            className='w-full mt-5 py-3 text-base rounded-md font-medium border-2 border-[#647C6C] text-[#647C6C] hover:bg-[#647C6C] hover:text-white transition-all'
          >
            Book Now
          </button>
        </Card>
        </Link>

      </ConfigProvider>
    </div>
  )
}

export default CardSpace

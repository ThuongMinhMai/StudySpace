import { Card, Button, ConfigProvider } from 'antd'
import { Usb } from 'lucide-react'
import { Scaling, User } from 'lucide-react'
import { Layers2 } from 'lucide-react'
import { Link } from 'react-router-dom'
const { Meta } = Card
const CardReated = ({ title, description, imgSrc, price, size, persons, type }: any) => {
  return (
    <div className='relative mx-auto shadow-lg '>
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
              <div className='cardrelated text-base font-bold' data-label={`From: ${100}$`}>
                <div className=' relative overflow-hidden '>
                  <img alt={title} src={imgSrc} className='h-40 w-full object-cover transition-transform duration-300 ease-in-out hover:scale-105 z-[100]' />
                </div>
              </div>
            </div>
          }
          className='card-space border-none rounded-none'
          style={{ borderRadius: '0px' }} // Ensure no border-radius
        >
          <div className='flex items-center justify-between text-sm mb-4'>
            <div className='flex items-center space-x-1'>
              <Scaling />
              <span>{size || '10'}M2</span>
            </div>
            <div className='flex items-center space-x-1 border-black/50'>
              <User />
              <span>{persons} PERSON</span>
            </div>
            <div className='flex items-center space-x-1'>
              <Layers2 />
              <span>{type || 'Basic'}</span>
            </div>
          </div>
          <Meta title={<h2 className='text-xl font-semibold '>{title}</h2>} description={description} />
          {/* <Button type='default' className='w-full mt-4 py-6 font-medium border-2 hover:text-white'>
            Book Now
          </Button> */}
          <button
            className='w-full mt-5 py-2 text-base rounded-md font-medium border-2 border-[#647C6C] text-[#647C6C] hover:bg-[#647C6C] hover:text-white transition-all'
          >
            Book Now
          </button>
        </Card>
        </Link>

      </ConfigProvider>
    </div>
  )
}

export default CardReated

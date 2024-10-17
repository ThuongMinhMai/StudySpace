import { Link, useLocation } from 'react-router-dom'
import { ConfigProvider, Input, Table } from 'antd'
import checkout from '../../../assets/checkout.png'
import { useAuth } from '../../../auth/AuthProvider'
import { formatPrice } from '../../../lib/utils'

const CheckoutPage = () => {
  const { user } = useAuth()
  console.log('User Info:', user)

  const location = useLocation()
  const searchParams = new URLSearchParams(location.search)

  // Extract parameters from the URL
  const checkInDate = searchParams.get('checkInDate')
  const checkInTime = searchParams.get('checkInTime')
  const checkOutDate = searchParams.get('checkOutDate')
  const checkOutTime = searchParams.get('checkOutTime')
  const roomId = searchParams.get('roomId')
  const roomName = searchParams.get('roomName')
  const total = searchParams.get('total')
  const userId = searchParams.get('userId')

  // Check if all required fields are present
  const isDataComplete =
    checkInDate && checkInTime && checkOutDate && checkOutTime && roomId && roomName && total && userId
  const bookingData = [
    { key: '1', field: 'Room Name', details: roomName },
    { key: '2', field: 'Check-in', details: `${checkInTime} (${checkInDate})` },
    { key: '3', field: 'Check-out', details: `${checkOutTime} (${checkOutDate})` },
    { key: '4', field: 'Total', details: `${formatPrice(total ? Number(total) : 0)}` }
  ]

  const bookingColumns = [
    {
      title: 'Field',
      dataIndex: 'field',
      key: 'field'
    },
    {
      title: 'Details',
      dataIndex: 'details',
      key: 'details'
    }
  ]
  if (!isDataComplete) {
    return (
      <div className='flex flex-col items-center justify-center h-screen w-full p-6'>
        <img
          className='h-96 w-auto'
          src='https://cdni.iconscout.com/illustration/premium/thumb/sad-woman-without-discount-checkout-illustration-download-in-svg-png-gif-file-formats--no-disappointed-shopping-missing-pack-e-commerce-illustrations-10300259.png?f=webp'
          alt='Error Illustration'
        />
        <h2 className='text-2xl font-semibold text-red-600 mb-4'>Checkout Page</h2>
        <p className='text-lg text-gray-700 mb-6'>
          Some booking details are missing. Please check your booking information and try again.
        </p>
        <Link
          to='/'
          className='px-6 py-2 text-white bg-[#647C6C] hover:bg-[#41a863] rounded-md transition-all duration-300'
        >
          HomePage
        </Link>
      </div>
    )
  }

  return (
    <div className='mt-10 w-full flex flex-col justify-center items-center bg-gradient-to-b from-[#fcfbf9] to-[#ede4dd]'>
      <div className='relative flex justify-center w-full'>
        <img className='w-3/4' src={checkout} alt='Checkout' />
        <div className='absolute inset-0 flex items-center justify-center text-white text-9xl font-bold'>
          <p className='drop-shadow-2xl'>Checkout</p>
        </div>
      </div>

      {/* <h2 className='mt-8 text-2xl font-bold'>Checkout Page</h2> */}

      {/* User Information Section */}
      <div className='mt-6 w-3/4 rounded-lg '>
        <h3 className='text-xl font-semibold mb-4 text-center'>User Information</h3>
        <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
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
            <div>
              <label className='block text-sm font-medium '>Name</label>
              <Input
                value={user?.name || ''}
                readOnly
                style={{ cursor: 'not-allowed', backgroundColor: 'transparent' }}
              />
            </div>
            <div>
              <label className='block text-sm font-medium text-gray-700'>Email</label>
              <Input
                value={user?.email || ''}
                readOnly
                style={{ cursor: 'not-allowed', backgroundColor: 'transparent' }}
              />
            </div>
            <div>
              <label className='block text-sm font-medium text-gray-700'>Phone</label>
              <Input
                value={user?.phone || ''}
                readOnly
                style={{ cursor: 'not-allowed', backgroundColor: 'transparent' }}
              />
            </div>
            <div>
              <label className='block text-sm font-medium text-gray-700'>Address</label>
              <Input
                value={user?.address || ''}
                readOnly
                style={{ cursor: 'not-allowed', backgroundColor: 'transparent' }}
              />
            </div>
          </ConfigProvider>
        </div>
      </div>

      <div className='mt-6 w-3/4 '>
        <h3 className='text-xl font-semibold mb-4'>Your Order:</h3>
        {bookingData.map((item) => (
          <div key={item.key} className='flex justify-between border-b border-[#647C6C] py-2'>
            <span className='font-medium'>{item.field}:</span>
            <span className={`ml-4 ${item.field === 'Total' ? 'font-bold' : ''}`}>{item.details}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

export default CheckoutPage

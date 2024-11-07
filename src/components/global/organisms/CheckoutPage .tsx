import { Link, useLocation } from 'react-router-dom'
import { ConfigProvider, Input, Table, Button, message } from 'antd'
import checkout from '../../../assets/checkout.png'
import { useAuth } from '../../../auth/AuthProvider'
import { formatPrice } from '../../../lib/utils'
import { useState } from 'react'
import studySpaceAPI from '../../../lib/studySpaceAPI'
import { toast } from 'sonner'

const CheckoutPage = () => {
  const { user } = useAuth()

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
  const bookingId = searchParams.get('bookingId') // Assuming you have this in the URL

  // Check if all required fields are present
  const isDataComplete =
    checkInDate && checkInTime && checkOutDate && checkOutTime && roomName && total && userId && bookingId

  // Calculate deposit (30% of total)
  const deposit = total ? Number(total) * 0.3 : 0

  const bookingData = [
    { key: '1', field: 'Room Name', details: roomName },
    { key: '2', field: 'Check-in', details: `${checkInTime} (${checkInDate})` },
    { key: '3', field: 'Check-out', details: `${checkOutTime} (${checkOutDate})` },
    { key: '4', field: 'Total', details: `${formatPrice(total ? Number(total) : 0)}` },
    {
      key: '5',
      field: 'Deposit (30%)(You need to pay a deposit in advance to complete your booking)',
      details: `${formatPrice(deposit)}`
    }
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

  const [note, setNote] = useState('')

  const handlePayment = async () => {
    try {
      // Simulate sending data to the backend
      const paymentData = {
        bookingId,
        amount: deposit,
        description: roomName
      }
      console.log('creaet payment')

      // Make an API call to process the payment
      const response = await studySpaceAPI.post('/Payments/customer', paymentData)
      // Show success message if the request is successful
      // Check the response status
      message.success(
        <>
          Payment information sent successfully! <strong>Invoice will be canceled after 30 minutes</strong>
        </>,
        5
      )
      setTimeout(() => {
        if (response.data.status === 1) {
          // Redirect to the checkout URL if successful
          window.location.href = response.data.data.checkoutUrl
        } else {
          console.log('Error create payment' + response.data.message)
          // Log the error message if the status is not 1
          toast.error('Payment failed' + response.data.message)
        }
      }, 5000) // 5000 milliseconds (5 seconds)
    } catch (error) {
      console.error('Payment error:', error)

      // Show an error message if the request fails
      // toast.error('Payment failed. Please try again later.' + error)
    }
  }

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

      <div className='mt-6 w-3/4'>
        <h3 className='text-xl font-semibold mb-4'>Your Order:</h3>
        {bookingData.map((item) => (
          <div key={item.key} className='flex justify-between border-b border-[#647C6C] py-2'>
            <span className={`font-medium ${item.field.includes('Deposit') ? 'text-red-500' : ''}`}>{item.field}:</span>
            {/* <span className={`ml-4 ${item.field === 'Total' ? 'font-bold' : ''}`}>{item.details}</span> */}
            <span
              className={`ml-4 ${item.field.includes('Deposit') ? 'text-red-500' : ''} ${item.field === 'Total' ? 'font-bold' : ''}`}
            >
              {item.details}
            </span>
          </div>
        ))}

        {/* Note Input Field */}
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
          {/* <div className='mt-4'>
            <label className='block text-sm font-medium mb-2'>Note</label>
            <Input.TextArea
              value={note}
              onChange={(e) => setNote(e.target.value)}
              rows={4}
              placeholder='Enter any special requests or notes...'
            />
          </div> */}

          {/* Payment Button */}
          <div className='mt-6'>
            <Button type='primary' onClick={handlePayment}>
              Pay Deposit
            </Button>
          </div>
        </ConfigProvider>
      </div>
    </div>
  )
}

export default CheckoutPage

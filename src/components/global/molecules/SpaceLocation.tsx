import React from 'react'

interface SpaceLocationProps {
  address: string
  storeName: string
  latitude: number
  longtitude: number
}

const SpaceLocation: React.FC<SpaceLocationProps> = ({ storeName, address, latitude, longtitude }) => {
  const googleMapsUrl = `https://maps.google.com/maps?q=${latitude},${longtitude}&hl=en&z=14&output=embed`

  return (
    <div className='flex flex-col md:flex-row gap-5'>
      <div className='flex flex-col gap-5 w-full md:w-1/2'>
        <p className='text-2xl font-medium'>{storeName} Location</p>
        <p>{address} </p>
        {/* <p className='text-2xl font-medium'>What’s nearby</p>
        <div className='flex flex-col gap-2'>
          <p>
            School: <span className='font-medium'>1.2 km</span>
          </p>
          <p>
            Hospital, medical: <span className='font-medium'>1.5 km</span>
          </p>
          <p>
            University: <span className='font-medium'>3 km</span>
          </p>
        </div> */}
      </div>
      <div className='w-full md:w-1/2'>
        <iframe
          src={googleMapsUrl}
          width='100%' // Make iframe width 100% for responsiveness
          height='350' // Adjust height as needed
          style={{ border: '0', marginTop: '20px' }}
          allowFullScreen
          loading='lazy'
          referrerPolicy='no-referrer-when-downgrade'
        ></iframe>
      </div>
    </div>
  )
}

export default SpaceLocation

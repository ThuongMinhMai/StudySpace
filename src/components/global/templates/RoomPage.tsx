import { useLocation, useNavigate } from 'react-router-dom'
import FormSearch from '../organisms/FormSearch'
import { Star } from 'lucide-react'
import ImgHeader from '../../../assets/ImagerHeader.png'
import { useEffect, useState } from 'react'
function RoomPage() {
  const location = useLocation()
  const navigate = useNavigate()
  const searchParams = new URLSearchParams(location.search)
  // Get the 'type', 'location', 'typeSpace', 'typeRoom', and 'persons' query parameters
  const locationParam = searchParams.get('location') || 'All'
  const typeSpace = searchParams.get('typeSpace') || 'All'
  const typeRoom = searchParams.get('typeRoom') || 'All'
  const persons = parseInt(searchParams.get('persons') || '2', 10)
  // Function to handle search selection changes
  // State to manage form values
  const [formValues, setFormValues] = useState({
    location: searchParams.get('location') || 'All',
    typeSpace: searchParams.get('typeSpace') || 'All',
    typeRoom: searchParams.get('typeRoom') || 'All',
    persons: parseInt(searchParams.get('persons') || '2', 10)
  })

  useEffect(() => {
    // Update state when query parameters change
    setFormValues({
      location: searchParams.get('location') || 'All',
      typeSpace: searchParams.get('typeSpace') || 'All',
      typeRoom: searchParams.get('typeRoom') || 'All',
      persons: parseInt(searchParams.get('persons') || '2', 10)
    })
  }, [location.search])
  const handleSearchChange = (newValues: any) => {
    const updatedValues = { ...formValues, ...newValues }
    setFormValues(updatedValues)

    // Update query parameters
    const newParams = new URLSearchParams(updatedValues).toString()
    navigate(`?${newParams}`)
  }

  return (
    <div className='relative w-full '>
      <div className=''>
        <img src={ImgHeader} alt='imageheader' className='w-full  object-cover header__image' />

        <div className='lg:absolute inset-0 flex flex-col lg:gap-10 justify-center items-center'>
          <p className='lg:text-yellow-50 font-paytoneone text-5xl mb-10 text-center text mt-20 lg:mt-0 text-[#3D4449]'>
            Make Yourself At Home <br />
            In Our <span className='lg:text-[#d3ea98] text-[#80a12f] '>Spaces.</span>
          </p>

          {/* <FormSearch
            initialLocation={locationParam}
            initialTypeSpace={typeSpace}
            initialTypeRoom={typeRoom}
            initialPersons={persons}
          /> */}
          <FormSearch
            initialLocation={formValues.location}
            initialTypeSpace={formValues.typeSpace}
            initialTypeRoom={formValues.typeRoom}
            initialPersons={formValues.persons}
            onSearchChange={handleSearchChange}
          />
        </div>
      </div>
      {/* Card space */}
    </div>
  )
}

export default RoomPage

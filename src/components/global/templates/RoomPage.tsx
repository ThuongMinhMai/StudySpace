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
    <div className='w-full '>
      <div className='relative'>
        <img src={ImgHeader} alt='imageheader' className='w-full object-cover header__image' />
        <div className='absolute inset-0 flex justify-center items-center'>
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

      <p>TypeSpace: {typeSpace}</p>
      <p>TypeRoom: {typeRoom}</p>
      <p>Person: {persons}</p>
      <p>Location: {locationParam}</p>
      <>trong frrm</>
      <p>TypeSpace: {formValues.typeSpace}</p>
      <p>TypeRoom: {formValues.typeRoom}</p>
      <p>Person: {formValues.persons}</p>
      <p>Location: {formValues.location}</p>
    </div>
  )
}

export default RoomPage

import { useLocation, useNavigate } from 'react-router-dom'
import FormSearch from '../organisms/FormSearch'
import { Star } from 'lucide-react'
import ImgHeader from '../../../assets/ImagerHeader.png'
import { useEffect, useState } from 'react'
import { Col, Row } from 'antd'
import CardSpace from '../organisms/CardSpace'
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
    window.scrollTo(0, 0)
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
  const cardData = [
    { title: 'Card 1', description: 'Description 1', imgSrc: 'https://www.eposaudio.com/contentassets/2af3669017f34ae58049ce43c127bd3b/expand_idealmeetingroom_still-life_01.jpg?width=1300' },
    { title: 'Card 2', description: 'Description 2', imgSrc: 'https://zoomgov.com/docs/image/zoomrooms/overview-03.png' },
    { title: 'Card 3', description: 'Description 3', imgSrc: 'https://media-cdn.tripadvisor.com/media/photo-s/1b/3f/c1/f1/kj-coffee-shop-es-un.jpg' },
    { title: 'Card 4', description: 'Description 4', imgSrc: 'https://www.doanhchu.com/wp-content/uploads/2015/01/coffee-shop-1.jpg' },
    { title: 'Card 5', description: 'Description 5', imgSrc: 'https://interiorai.com/cdn-cgi/image/format=jpeg,fit=cover,width=1536,quality=75/https://r2-us-west.interiorai.com/1706794679-afdb958b2cbdae693c621f5a1685e465-2.png' },
    { title: 'Card 6', description: 'Description 6', imgSrc: 'https://i.pinimg.com/736x/3d/8b/e8/3d8be817b8a1b70452890e02c8279d1f.jpg' },
  ];
  return (
    <div className='w-full bg-[#f5f0ec]'>
      <div className='relative w-full '>
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


     {/* Card section */}
     <div className='container mx-auto lg:px-10 my-10'>
        <Row gutter={[32, 16]} justify='center'>
          {cardData.map((card, index) => (
            <Col
              key={index}
              sm={24}
              md={12}
              lg={8}
            >
              <div className='mb-10'>
                <CardSpace title={card.title} description={card.description} imgSrc={card.imgSrc} />
              </div>
            </Col>
          ))}
        </Row>
      </div>
    </div>
  )
}

export default RoomPage

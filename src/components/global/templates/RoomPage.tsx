import { Button, Col, ConfigProvider, Drawer, Pagination, Row } from 'antd'
import axios from 'axios'
import { SlidersHorizontal } from 'lucide-react'
import { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import ImgHeader from '../../../assets/ImagerHeader.png'
import FilterComponent from '../molecules/FilterComponent'
import CardSpace from '../organisms/CardSpace'
import FormSearch from '../organisms/FormSearch'
import SkeletonCarder from '../organisms/SkeletonCarder'
import studySpaceAPI from '../../../lib/studySpaceAPI'

interface Room {
  roomName: string
  storeName: string
  capacity: number
  pricePerHour: number
  description: string
  status: boolean
  area: number
  type: string
}

function RoomPage() {
  const location = useLocation()
  const navigate = useNavigate()
  const [filters, setFilters] = useState<any>('')
  const [isFilterDrawerOpen, setIsFilterDrawerOpen] = useState(false)
  const [loading, setLoading] = useState<boolean>(false)
  const [cardData, setCardData] = useState<Room[]>([])
  const [currentPage, setCurrentPage] = useState<number>(1) // Current page state
  const [totalPages, setTotalPages] = useState<number>(0) // Total pages state
  const pageSize = 6 // Number of items per page

  const searchParams = new URLSearchParams(location.search)

  const [formValues, setFormValues] = useState({
    location: searchParams.get('location') || 'All',
    typeSpace: searchParams.get('typeSpace') || 'All',
    persons: parseInt(searchParams.get('persons') || '2', 10)
  })

  useEffect(() => {
    window.scrollTo(0, 0)
    const updatedFormValues = {
      location: searchParams.get('location') || 'All',
      typeSpace: searchParams.get('typeSpace') || 'All',
      persons: parseInt(searchParams.get('persons') || '2', 10)
    }
    setFormValues(updatedFormValues)
    fetchData(updatedFormValues, currentPage) // Fetch data with current page
    setFilters({
      priceSort: 'all',
      ratingSort: 'all',
      priceRange: [0, 1000],
      selectedUtilities: 'all'
    })
  }, [location.search, currentPage]) // Add currentPage to dependencies

  const fetchData = async (value: any, page: number) => {
    setLoading(true)
    try {
      const response = await studySpaceAPI.get(
        `/Room/available?pageNumber=${page}&pageSize=${pageSize}&space=${value.typeSpace}&location=${value.location}&room=All&person=${value.persons}`
      )
      console.log('Data fetched:', response.data.data)
      setCardData(response.data.data.rooms) // Update card data with the fetched results
      setTotalPages(response.data.data.totalCount) // Assuming the response has totalPages
    } catch (error) {
      console.error('Error fetching data:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleSearchChange = (newValues: any) => {
    const updatedValues = { ...formValues, ...newValues }
    setFormValues(updatedValues)
    const newParams = new URLSearchParams(updatedValues).toString()
    navigate(`?${newParams}`)
    setCurrentPage(1) // Reset to first page on new search
    fetchData(updatedValues, 1) // Fetch data for the first page
  }

  const handleFilterChange = (newFilters: any) => {
    setFilters(newFilters)
    setIsFilterDrawerOpen(false)
    // Logic to refetch or filter cards based on newFilters goes here
  }

  const handlePaginationChange = (page: number) => {
    setCurrentPage(page)
    fetchData(formValues, page) // Fetch data for the selected page
  }

  const handleClearFilters = () => {
    setFilters({
      priceSort: 'all',
      ratingSort: 'all',
      priceRange: [0, 1000],
      selectedUtilities: 'all'
    })
  }

  return (
    <div className='w-full bg-[#f5f0ec]'>
      <div className='relative w-full '>
        <img src={ImgHeader} alt='imageheader' className='w-full  object-cover header__image' />
        <div className='lg:absolute inset-0 flex flex-col lg:gap-10 justify-center items-center'>
          <p className='lg:text-yellow-50 font-paytoneone text-5xl mb-10 text-center text mt-20 lg:mt-0 text-[#3D4449]'>
            Make Yourself At Home <br />
            In Our <span className='lg:text-[#d3ea98] text-[#80a12f] '>Spaces.</span>
          </p>
          <FormSearch
            initialLocation={formValues.location}
            initialTypeSpace={formValues.typeSpace}
            initialPersons={formValues.persons}
            onSearchChange={handleSearchChange}
          />
        </div>
      </div>

      <div className='container mx-auto lg:px-10 my-10 flex flex-col'>
        <div className='flex justify-between  items-center lg:px-14 md:px-0 px-36 mb-10'>
          <h2 className='text-2xl font-semibold'>{cardData?.length || 0} Available Spaces</h2>
          <ConfigProvider
            theme={{
              token: {
                colorPrimary: '#647C6C'
              },
              components: {
                Button: {
                  colorTextLightSolid: '#647C6C'
                }
              }
            }}
          >
            <Button type='default' size='large' onClick={() => setIsFilterDrawerOpen(true)}>
              <SlidersHorizontal className='w-4 h-4' />
              Filter
            </Button>
          </ConfigProvider>
        </div>

        <Drawer
          title='Filter Options'
          placement='right'
          onClose={() => setIsFilterDrawerOpen(false)}
          open={isFilterDrawerOpen}
          width='40%'
          className='filter-drawer'
        >
          <FilterComponent onFilterChange={handleFilterChange} onClearFilters={handleClearFilters} />
        </Drawer>

        {loading ? (
          <Row gutter={[32, 16]} justify='center'>
            {[...Array(pageSize)].map((_, index) => (
              <Col key={index} sm={24} md={12} lg={8}>
                <SkeletonCarder />
              </Col>
            ))}
          </Row>
        ) : cardData?.length === 0 ? (
          <div className='text-center text-lg font-semibold'>No rooms available at the moment</div>
        ) : (
          <Row gutter={[32, 16]} justify='center'>
            {cardData?.map((card, index) => (
              <Col key={index} sm={24} md={12} lg={8}>
                <div className='mb-10'>
                  <CardSpace
                    storeName={card.storeName}
                    roomName={card.roomName}
                    description={card.description}
                    imgSrc={ImgHeader}
                    price={card.pricePerHour}
                    capacity={card.capacity}
                    area={card.area}
                    type={card.type}
                  />
                </div>
              </Col>
            ))}
          </Row>
        )}
        <ConfigProvider
          theme={{
            token: {
              colorPrimary: '#647C6C'
            }
          }}
        >
          {/* Pagination Controls */}
          <Pagination
            current={currentPage}
            total={totalPages * pageSize} // Assuming total number of items is totalPages * pageSize
            pageSize={pageSize}
            onChange={handlePaginationChange}
            className='m-auto'
          />
        </ConfigProvider>
      </div>
    </div>
  )
}

export default RoomPage

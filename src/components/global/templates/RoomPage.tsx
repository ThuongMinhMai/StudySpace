import { Button, Carousel, Col, ConfigProvider, Drawer, Pagination, Row } from 'antd'
import { SlidersHorizontal } from 'lucide-react'
import { useEffect, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import ImgHeader from '../../../assets/ImagerHeader.png'
import studySpaceAPI from '../../../lib/studySpaceAPI'
import FilterComponent from '../molecules/FilterComponent'
import CardSpace from '../organisms/CardSpace'
import FormSearch from '../organisms/FormSearch'
import SkeletonCarder from '../organisms/SkeletonCarder'
import Slider from 'react-slick'

interface Room {
  roomId: number
  roomName: string
  storeName: string
  capacity: number
  pricePerHour: number
  description: string
  status: boolean
  area: number
  type: string
  address: string
  image: string
  isOvernight: boolean
}
interface StorePre {
  roomId: number
  roomImage: string
  storeName: string
}
function RoomPage() {
  const location = useLocation()
  const navigate = useNavigate()
  const [filters, setFilters] = useState<any>('')
  const [isFilterDrawerOpen, setIsFilterDrawerOpen] = useState(false)
  const [cardData, setCardData] = useState<Room[]>([])
  const [totalAvailable, setTotalAvailable] = useState<number>(0)
  const [rooms, setRooms] = useState<StorePre[]>([])
  const [loading, setLoading] = useState(true)
  const [currentPage, setCurrentPage] = useState<number>(1) // Current page state
  const [totalPages, setTotalPages] = useState<number>(0) // Total pages state
  const pageSize = 6 // Number of items per page

  const searchParams = new URLSearchParams(location.search)

  const [formValues, setFormValues] = useState({
    location: searchParams.get('location') || 'All',
    typeSpace: searchParams.get('typeSpace') || 'All',
    persons: parseInt(searchParams.get('persons') || '0', 10)
  })

  useEffect(() => {
    window.scrollTo(0, 0)
    const updatedFormValues = {
      location: searchParams.get('location') || 'All',
      typeSpace: searchParams.get('typeSpace') || 'All',
      persons: parseInt(searchParams.get('persons') || '0', 10)
    }
    setFormValues(updatedFormValues)
    setFilters({
      priceSort: 'All',
      // ratingSort: 'All',
      priceRange: [0, 1000],
      selectedUtilities: 'All'
    })
    fetchData(updatedFormValues, currentPage) // Fetch data with current page
  }, [location.search]) // Add currentPage to dependencies

  useEffect(() => {
    fetchDataFilter(formValues, currentPage, filters)
  }, [currentPage, filters])
  useEffect(() => {
    // Fetch room data from API
    const fetchRooms = async () => {
      try {
        const response = await studySpaceAPI.get('/Room/premium-store') // Replace with your API endpoint
        setRooms(response.data.data) // Adjust according to your API response structure
        setLoading(false)
      } catch (error) {
        console.error('Error fetching rooms:', error)
        setLoading(false)
      }
    }

    fetchRooms()
  }, [])
  const fetchData = async (value: any, page: number) => {
    setLoading(true)
    try {
      const response = await studySpaceAPI.get(
        `/Room/available?pageNumber=${page}&pageSize=${pageSize}&space=${value.typeSpace}&location=${value.location}&room=All&person=${value.persons}`
      )
      setCardData(response.data.data.rooms) // Update card data with the fetched results
      setTotalPages(response.data.data.totalCount) // Assuming the response has totalPages
      setTotalAvailable(response.data.data.totalAvailable)
      setFilters({
        priceSort: 'All',
        // ratingSort: 'All',
        priceRange: [0, 1000],
        selectedUtilities: 'All'
      })
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
    setFilters({
      priceSort: 'All',
      // ratingSort: 'All',
      priceRange: [0, 1000],
      selectedUtilities: 'All'
    })
  }

  const handleFilterChange = (newFilters: any) => {
    // setFilters(newFilters)
    const updatedFilters = { ...filters, ...newFilters }
    setFilters(updatedFilters)

    setIsFilterDrawerOpen(false)
    setCurrentPage(1) // Reset to first page on new search

    // Logic to refetch or filter cards based on newFilters goes here
    fetchDataFilter(formValues, 1, updatedFilters)
  }
  const fetchDataFilter = async (value: any, page: number, filterOptions: any) => {
    setLoading(true)
    try {
      // Start building query string
      const queryParams = new URLSearchParams({
        pageNumber: page.toString(),
        pageSize: pageSize.toString(),
        space: value.typeSpace || 'All',
        location: value.location || 'All',
        room: 'All',
        person: value.persons.toString(),
        price: filterOptions.priceSort || 'All'
      })

      // Manually append priceRange values as separate parameters if they exist
      if (filterOptions.priceRange && Array.isArray(filterOptions.priceRange)) {
        queryParams.append('priceRange', filterOptions.priceRange[0].toString())
        queryParams.append('priceRange', filterOptions.priceRange[1].toString())
      } else {
        queryParams.append('priceRange', '0')
        queryParams.append('priceRange', '1000')
      }

      // Manually add multiple utilities with proper encoding
      if (Array.isArray(filterOptions.selectedUtilities) && filterOptions.selectedUtilities.length > 0) {
        filterOptions.selectedUtilities.forEach((utility: string) => {
          queryParams.append('utilities', encodeURIComponent(utility)) // Properly encode spaces as %20
        })
      }

      const queryString = queryParams.toString()

      const response = await studySpaceAPI.get(`/Room/filter?${queryParams}`)

      // Update card data with the fetched results
      setCardData(response.data.data.rooms)
      setTotalPages(response.data.data.totalCount) // Assuming the response has total pages
      setTotalAvailable(response.data.data.totalAvailable)
    } catch (error) {
      console.error('Error fetching data:', error)
    } finally {
      setLoading(false)
    }
  }

  const handlePaginationChange = (page: number) => {
    setCurrentPage(page)
    // fetchData(formValues, page) // Fetch data for the selected page
  }

  const handleClearFilters = () => {
    const updatedFilters = {
      priceSort: 'All',
      // ratingSort: 'All',
      priceRange: [0, 1000],
      selectedUtilities: 'All'
    }
    setFilters(updatedFilters)
    setIsFilterDrawerOpen(false)
    setCurrentPage(1) // Reset to first page on new search

    // Logic to refetch or filter cards based on newFilters goes here
    fetchDataFilter(formValues, 1, updatedFilters)
  }
  // const rooms = [
  //   {
  //     roomid: '101',
  //     roomImage: 'https://www.luxcafeclub.com/cdn/shop/articles/Minimalist_Modern_Coffee_Shop_1_1100x.png?v=1713243107',
  //     storename: 'Sunshine Inn'
  //   },
  //   {
  //     roomid: '102',
  //     roomImage:
  //       'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTCx5FiTUfwxU-nOPFSwJ78fWnpUzWl_JRoJTfgWo9RFS_kKd1USxAvEkxuCcBJLo1rqVg&usqp=CAU',
  //     storename: 'Sunshine Inn'
  //   },
  //   {
  //     roomid: '201',
  //     roomImage:
  //       'https://www.alalyonnaise.fr/var/site/storage/images/_aliases/all_wide_width_2400/1/5/9/7/857951-3-fre-FR/53413e4aba3b-Anahera-c-Anahera-2.jpg',
  //     storename: 'Moonlight Suites'
  //   },
  //   {
  //     roomid: '202',
  //     roomImage: 'https://blog.serviceideas.com/hubfs/Blog%20Images/Coffee-Shop.jpg',
  //     storename: 'Moonlight Suites'
  //   }
  // ]
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 1500
    // draggable: true // Enable drag functionality
  }
  return (
    <div className='w-full bg-[#f5f0ec]'>
      {/* <div className='relative w-full '>
        <div className='w-full bg-white-100 h-[620px]'>
          <img src={ImgHeader} alt='imageheader' className='w-full  object-cover header__image' />
        </div>
        <div className='lg:absolute inset-0 flex flex-col lg:gap-10 justify-center items-center'>
          <p className='lg:text-yellow-50 font-paytoneone text-7xl mb-10 text-center text mt-20 lg:mt-0 text-[#3D4449] '>
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
      </div> */}
      {/* <div className='relative w-full overflow-hidden'>
        <Slider {...settings} className='w-full'>
          {rooms.map((room) => (
            <div key={room.roomid} className='relative w-full h-[620px]'>
              <div
                className='w-full h-full bg-cover bg-center'
                style={{
                  backgroundImage: `url(${room.roomImage})`
                }}
              >
                <div className='absolute inset-0 bg-black bg-opacity-40 flex flex-col justify-center items-center'>
                  <p className='lg:text-yellow-50 font-paytoneone text-7xl mb-10 text-center text-[#3D4449]'>
                    {room.storename}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </Slider>

        Search Form
        <div className='absolute inset-0 flex flex-col lg:mt-48 lg:gap-10 justify-center items-center'>
          <FormSearch
            initialLocation={formValues.location}
            initialTypeSpace={formValues.typeSpace}
            initialPersons={formValues.persons}
            onSearchChange={handleSearchChange}
          />
        </div>
      </div> */}
      <div className='relative w-full overflow-hidden '>
        {rooms && rooms.length > 0 ? (
          /* Render Slider if there are rooms */
          <>
            <Slider {...settings} className='w-full'>
              {rooms.map((room) => (
                <div key={room.roomId} className='relative w-full h-[620px]'>
                  <Link to={`/detail/${room.roomId}`} className='w-full h-full'>
                    <div
                      className='w-full h-full bg-cover bg-center'
                      style={{
                        backgroundImage: `url(${room.roomImage})`
                      }}
                    >
                      <div className='absolute inset-0 bg-black bg-opacity-40 flex flex-col justify-center items-center'>
                        <Link
                          to={`/detail/${room.roomId}`}
                          className='lg:text-yellow-50 font-paytoneone text-7xl mb-10 text-center text-[#3D4449]'
                        >
                          {room.storeName}
                        </Link>
                      </div>
                    </div>
                  </Link>
                </div>
              ))}
            </Slider>

            {/* Search Form Overlay */}
            <div className='absolute inset-0 flex flex-col lg:mt-48 lg:gap-10 justify-center items-center'>
              <FormSearch
                initialLocation={formValues.location}
                initialTypeSpace={formValues.typeSpace}
                initialPersons={formValues.persons}
                onSearchChange={handleSearchChange}
              />
            </div>
          </>
        ) : (
          /* Render Default View if there are no rooms */
          <div className='relative w-full'>
            <div className='w-full bg-white-100 h-[620px]'>
              <img src={ImgHeader} alt='imageheader' className='w-full object-cover header__image' />
            </div>
            <div className='lg:absolute inset-0 flex flex-col lg:gap-10 justify-center items-center'>
              <p className='lg:text-yellow-50 font-paytoneone text-7xl mb-10 text-center text mt-20 lg:mt-0 text-[#3D4449]'>
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
        )}
      </div>
      {/* <Slider {...settings} className='w-full max-w-lg px-4'>
          {rooms.map((room) => (
            <div key={room.roomid} className='text-center'>
              <img src={room.roomImage} alt={room.storename} className='w-full h-64 object-cover rounded-md' />
              <p className='mt-4 text-lg font-semibold text-gray-700'>{room.storename}</p>
            </div>
          ))}
        </Slider> */}
      <div className='container mx-auto lg:px-10 my-10 flex flex-col'>
        <div className='flex justify-between  items-center lg:px-14 md:px-0 px-36 mb-10'>
          {/* <h2 className='text-2xl font-semibold'>{cardData?.length || 0} Available Spaces</h2> */}
          <h2 className='text-2xl font-semibold'>{totalAvailable} Available Spaces</h2>
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
          <FilterComponent
            currentFilters={filters}
            onFilterChange={handleFilterChange}
            onClearFilters={handleClearFilters}
          />
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
          <div className='flex justify-center items-center flex-col my-10'>
            <img
              className='w-96'
              src='https://cdni.iconscout.com/illustration/premium/thumb/no-search-found-illustration-download-in-svg-png-gif-file-formats--not-seach-available-nothing-error-state-pack-seo-web-illustrations-2133696.png?f=webp'
              alt='not available search'
            />
            <div className='text-center text-lg font-semibold text-gray-500'>No rooms available at the moment. </div>
            <div className='text-center text-xl font-bold text-[#647C6C]'>Please change your search conditions!</div>
          </div>
        ) : (
          <Row gutter={[32, 16]} justify='center'>
            {cardData?.map((card, index) => (
              <Col key={index} sm={24} md={12} lg={8}>
                <div className='mb-10'>
                  <CardSpace
                    roomId={card.roomId}
                    address={card.address}
                    storeName={card.storeName}
                    roomName={card.roomName}
                    description={card.description}
                    imgSrc={card.image}
                    price={card.pricePerHour}
                    capacity={card.capacity}
                    area={card.area}
                    type={card.type}
                    isOvernight={card.isOvernight}
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
          {cardData.length > 0 && (
            <Pagination
              current={currentPage}
              total={totalPages * pageSize} // Assuming total number of items is totalPages * pageSize
              pageSize={pageSize}
              onChange={handlePaginationChange}
              className='m-auto'
            />
          )}
        </ConfigProvider>
      </div>
    </div>
  )
}

export default RoomPage

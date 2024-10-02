import { ConfigProvider, Select, Spin } from 'antd'
import { useLocation, useNavigate } from 'react-router-dom'
import logo from '../../../assets/LOGO SS ()-01.png'
import { useEffect, useState } from 'react'
import studySpaceAPI from '../../../lib/studySpaceAPI'

function SearchPage({ isSearchOpen, toggleSearch }: any) {
  const { Option } = Select
  const navigate = useNavigate()
  const location = useLocation() // To get the current URL and query params
  const [locations, setLocations] = useState<string[]>([])
  const [loadingLocations, setLoadingLocations] = useState(true)
  // const locations = [
  //   'All',
  //   'District 1',
  //   'District 2',
  //   'District 3',
  //   'District Bình Thạnh',
  //   'Thủ Đức City',
  //   'District 9',
  //   'District 7',
  //   'District 10',
  //   'District 8',
  //   'District 5'
  // ]
  useEffect(() => {
    // Fetch locations from API
    setLoadingLocations(true)
    studySpaceAPI.get('/Stores/address')
      .then(response => {
        setLocations(response.data.data)
        console.log("loation", response.data.data)
      })
      
      .catch(error => {
        console.error('Error fetching locations:', error)
      })
      .finally(() => {
        setLoadingLocations(false)
      })

   
  }, [])
  // const handleChange = (value: any) => {
  //   // Save the selected location to localStorage
  //   localStorage.removeItem('selectedLocation')

  //   // localStorage.setItem('selectedLocation', value);
  //   // Navigate to RoomPage with the selected location
  //   // navigate('/room', { state: { location: value } });
  //   navigate(`/room?location=${encodeURIComponent(value)}`)
  //   toggleSearch();
  // }

  const handleChange = (selectedLocation: string) => {
    // Parse the current query parameters
    const searchParams = new URLSearchParams(location.search)

    // Update or add the 'location' query param
    searchParams.set('location', selectedLocation)

    // Preserve existing query params like 'type'
    navigate({
      pathname: '/room',
      search: `?${searchParams.toString()}`
    })

    toggleSearch()
  }
  return (
    <div className='flex h-screen items-center justify-center py-40 bg-black'>
      <div className='fixed inset-0 z-[1000] flex flex-col justify-center items-center bg-white'>
        <div className='flex justify-between items-center gap-10 mt-4 w-4/5 m-auto'>
          <img
            className='max-h-16 ml-10 w-auto my-auto -mt-4 object-contain cursor-pointer'
            src={logo}
            alt='logo'
            onClick={toggleSearch}
          />
          <div className='w-full'>
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
              <Select
                showSearch
                size='large'
                onChange={handleChange}
                style={{ width: '100%' }}
                placeholder='Where are you looking for space?'
                loading={loadingLocations} // Show loading state
                disabled={loadingLocations} // Disable select while loading
                filterOption={(input, option: any) => {
                  if (!option || typeof option.children !== 'string') {
                    return false
                  }
                  return option.children.toLowerCase().includes(input.toLowerCase())
                }}
                dropdownRender={(menu) => (
                  <>
                    {loadingLocations ? (
                      <div className='flex items-center justify-center p-2'>
                        <Spin size="small" />
                        <span className='ml-2'>Loading locations...</span>
                      </div>
                    ) : (
                      menu
                    )}
                    {locations.length === 0 && !loadingLocations && (
                      <div className='text-black/60'>No matching locations found. Please change location!</div>
                    )}
                  </>
                )}
              >
                {locations.map((location) => (
                  <Option key={location} value={location}>
                    {location}
                  </Option>
                ))}
              </Select>
            </ConfigProvider>
          </div>
          <button className='' onClick={toggleSearch}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  )
}

export default SearchPage

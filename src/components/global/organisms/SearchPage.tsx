import { ConfigProvider, Select } from 'antd'
import { useLocation, useNavigate } from 'react-router-dom'
import logo from '../../../assets/LOGO SS ()-01.png'

function SearchPage({ isSearchOpen, toggleSearch }: any) {
  const { Option } = Select
  const navigate = useNavigate()
  const location = useLocation() // To get the current URL and query params
  const locations = [
    'All',
    'District 1',
    'District 2',
    'District 3',
    'District Bình Thạnh',
    'Thủ Đức City',
    'District 9',
    'District 7',
    'District 10',
    'District 8',
    'District 5'
  ]

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
    <div className='flex h-screen items-center justify-center py-40 bg-black  '>
      <div className='fixed inset-0 z-[1000] flex flex-col justify-center items-center bg-white'>
        <div className='flex justify-between items-center gap-10 mt-4 w-4/5 m-auto'>
          {/* <Link to='/'> */}
          <img
            className='max-h-16 ml-10 w-auto my-auto -mt-4 object-contain cursor-pointer'
            src={logo}
            alt='logo'
            onClick={toggleSearch}
          />

          {/* <p className='font-greatvibes text-5xl mr-3 text-[#3D4449] cursor-pointer' onClick={toggleSearch}>StudySpace</p> */}
          {/* </Link> */}
          <div className=' w-full'>
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
              {/* <AutoComplete
          
            style={{ width: '100%' }}
            options={locations.map(location => ({ value: location }))}
           
            filterOption={(inputValue, option) =>
              option.value.toLowerCase().includes(inputValue.toLowerCase())
            }
            notFoundContent='No matching locations found. Please change location!'
          >
            <Input
              size='large'
              prefix={<Search className='w-4 h-4 mr-2' />}
               placeholder='Where are you looking for space?'
              className='border-[#647C6C] pl-[10px]' 
            />
          </AutoComplete> */}
              <Select
                showSearch
                size='large'
                onChange={handleChange}
                style={{ width: '100%' }}
                placeholder='Where are you looking for space?'
                filterOption={(input, option: any) => {
                  if (!option || typeof option.children !== 'string') {
                    return false
                  }
                  return option.children.toLowerCase().includes(input.toLowerCase())
                }}
                dropdownRender={(menu) => (
                  <>
                    {menu}
                    {locations.length === 0 && (
                      <div className=''>No matching locations found. Please change location!</div>
                    )}
                  </>
                )}
                notFoundContent={
                  <div className='text-black/60'>No matching locations found. Please change location!</div>
                }
              >
                {locations.map((location) => (
                  <Option key={location} value={location}>
                    {location}
                  </Option>
                ))}
              </Select>
            </ConfigProvider>
          </div>
          {/* <Link to='/'> */}
          <button className=' ' onClick={toggleSearch}>
            Cancel
          </button>
          {/* </Link> */}
        </div>
      </div>
    </div>
  )
}

export default SearchPage

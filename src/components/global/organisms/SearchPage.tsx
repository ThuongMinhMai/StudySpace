import { AutoComplete, ConfigProvider, Select, Input } from 'antd'
import { Search } from 'lucide-react'
import React from 'react'
import { Link } from 'react-router-dom'

function SearchPage() {
  const { Option } = Select
  const locations = [
    'Quận 1',
    'Quận 2',
    'Quận 3',
    'Quận Bình Thạnh',
    'Thành phố Thủ Đức',
    'Quận 9',
    'Quận 7',
    'Quận 10',
    'Quận 8',
    'Quận 5'
  ]
  return (
    <div className='flex justify-between items-center gap-10 mt-4 w-4/5 m-auto'>
      <Link to='/'>
        <p className='font-greatvibes text-5xl mr-3 text-[#3D4449]'>StudySpace</p>
      </Link>
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
            style={{ width: '100%' }}
            placeholder="Where are you looking for space?"
            filterOption={(input, option) => {
              if (!option || typeof option.children !== 'string') {
                return false;
              }
              return option.children.toLowerCase().includes(input.toLowerCase());
            }}
            dropdownRender={menu => (
              <>
                {menu}
                {locations.length === 0 && (
                  <div className="">
                    No matching locations found. Please change location!
                  </div>
                )}
              </>
            )}
            notFoundContent={
              <div className="text-black/60">
                No matching locations found. Please change location!
              </div>
            }
          >
            {locations.map(location => (
              <Option key={location} value={location}>
                {location}
              </Option>
            ))}
          </Select>
        </ConfigProvider>
      </div>
      <Link to='/'>
        <button className=' '>Cancel</button>
      </Link>
    </div>
  )
}

export default SearchPage

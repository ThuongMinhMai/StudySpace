import React from 'react'
import { Link } from 'react-router-dom'
import { Button, Input, Select, Space } from 'antd'
import { Search, Star } from 'lucide-react'
import SearchPage from './SearchPage'
function Header({ isSearchOpen, toggleSearch }: any) {
  const options = [
    {
      value: 'diachi',
      label: 'Địa chỉ'
    },
    {
      value: 'soluong',
      label: 'Số lượng người'
    },
    {
      value: 'soluong',
      label: 'Số lượng người'
    }
  ]
  return (
    <div>
    {isSearchOpen && <SearchPage isSearchOpen={isSearchOpen} toggleSearch={toggleSearch} />}

      <div className='fixed top-0 bg-white py-4 w-full right-0 left-0 z-50 flex justify-between items-center gap-10 lg:px-40 m-auto border-b-2'>
        <Link to='/'>
          <p className='font-greatvibes text-5xl mr-3 text-[#3D4449]'>StudySpace</p>
        </Link>
        <div
        onClick={toggleSearch}
          className='flex justify-center items-center gap-4 border-[#3D4449] border-[1px] w-1/3 rounded-full py-3 cursor-pointer'
        >
          {/* <div className='flex justify-center items-center gap-4 border-[#3D4449] border-[1px] w-1/3 rounded-full py-3'> */}
          <Search className='w-4 h-4 mt-1' />
          <p className='hidden lg:block'>Where are you looking for space?</p>
          {/* </div> */}
        </div>
        {/* <input placeholder='What are you looking for?' className='w-full border-black' /> */}
        <button className=' text-nowrap bg-[#D1C6B9] px-10 py-2 rounded-full'>Sign In</button>
      </div>
    </div>
  )
}

export default Header

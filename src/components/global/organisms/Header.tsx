import React from 'react'
import { Link } from 'react-router-dom'
import { Button, Input, Select, Space } from 'antd';
import { Star } from 'lucide-react';
function Header() {
  const { Search } = Input;

const options = [
  {
    value: 'diachi',
    label: 'Địa chỉ',
  },
  {
    value: 'soluong',
    label: 'Số lượng người',
  },
  {
    value: 'soluong',
    label: 'Số lượng người',
  },
];
  return (
    <div className='flex justify-between items-center gap-10 mt-4 w-4/5 m-auto'>
      <Link to='/'>
        <p className='font-greatvibes text-5xl mr-3 text-[#3D4449]'>StudySpace</p>
      </Link>
      <div>
        <Space direction='vertical' size='middle'>
         
         
          <Space.Compact>
            <Select defaultValue='Địa chỉ' options={options} />
            <Input defaultValue='Tìm cái gì nè' />
          </Space.Compact>
         
        </Space>
      </div>
      {/* <input placeholder='What are you looking for?' className='w-full border-black' /> */}
      <button className=' text-nowrap bg-[#D1C6B9] px-10 py-2 rounded-full'>Sign In</button>
    </div>
  )
}

export default Header

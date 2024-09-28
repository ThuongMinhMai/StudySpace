import React from 'react'
import { Card, ConfigProvider, Skeleton } from 'antd';
function SkeletonCarder() {
  return (
    <Card className='card-space border-none rounded-none relative min-w-80 mx-auto shadow-lg max-w-[350px]' style={{ borderRadius: '0px', width: '350px' }}> 
    <div className='relative'>
      <Skeleton.Image className='h-56 w-full' />
    </div>
    <div className='flex items-center justify-between space-x-4 text-sm mb-4'>
      {/* <Skeleton.Input style={{ width: 60 }} active /> */}
      {/* <Skeleton.Input style={{ width: 80 }} active /> */}
      <Skeleton.Input style={{ width: 60 }} active />
      {/* <div className='h-8 w-20 bg-gray-200'> */}

      {/* </div> */}
    </div>
  
    <Skeleton active paragraph={{ rows: 2 }} />
    <button className='w-full mt-5 py-3 text-base rounded-md font-medium border-2 border-[#647C6C] text-[#647C6C] hover:bg-[#647C6C] hover:text-white transition-all'>
      <Skeleton.Button style={{ width: 200 }} active />
    </button>
  </Card>
  )
}

export default SkeletonCarder
import { CigaretteOff, MilkOff, Speech } from 'lucide-react'
import React from 'react'

function HouseRule() {
  return (
    <div>
      <div className='text-2xl mb-6'>House Rules</div>
      <div className='flex flex-col gap-5'>
        <div className='flex justify-start items-center'>
          <CigaretteOff className='mr-2' color='#647C6C' fill='#647C6C' />
          <p>No smoking area</p>
        </div>
        <div className='flex justify-start items-center'>
          <Speech className='mr-2' color='#647C6C' fill='#647C6C' />
          <p>Don’t talk too loudly</p>
        </div>
        <div className='flex justify-start items-center'>
          <MilkOff className='mr-2' color='#647C6C' fill='#647C6C' />
          <p>No food from outside</p>
        </div>
      </div>
    </div>
  )
}

export default HouseRule

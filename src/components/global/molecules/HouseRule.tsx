// Assuming you are using React
import { TriangleAlert } from 'lucide-react'
import React from 'react'

interface HouseRuleProps {
  houseRule: string[]
}

const HouseRule: React.FC<HouseRuleProps> = ({ houseRule }) => {
  return (
    <div>
      <div className='text-2xl mb-6 font-medium'>House Rules</div>
      <div className='flex flex-col gap-5'>
        {houseRule.map((rule, index) => (
          <div className='flex justify-start items-center' key={index}>
            <TriangleAlert className='mr-2' color='white' fill='#647C6C' />
            <p>{rule}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default HouseRule

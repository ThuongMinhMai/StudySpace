import { AirVent, Coffee, LampDesk, Printer, Sofa, User } from 'lucide-react'
import React from 'react'

function Amentities() {
  return (
    <div>
        <div className='text-2xl mb-4'>Amentities</div>
          <p className='mb-10'>Omnesque iudicabit pri no, ad mel quaeque facilis atomorum.</p>
          <div className='grid grid-cols-3 gap-4'>
            <div className='flex justify-start items-center'>
              <Sofa className='mr-2' color='#647C6C' fill='#647C6C' /> <p>2 desk</p>
            </div>
            <div className='flex justify-start items-center'>
              <Coffee className='mr-2' color='#647C6C' fill='#647C6C' /> <p>Free ice-tea</p>
            </div>
            <div className='flex justify-start items-center'>
              <Printer className='mr-2' color='white' fill='#647C6C' /> <p>Tissue</p>
            </div>
            <div className='flex justify-start items-center'>
              <AirVent className='mr-2' color='#647C6C' fill='#647C6C' /> <p>Air condition</p>
            </div>
            <div className='flex justify-start items-center'>
              <LampDesk className='mr-2' color='#647C6C' fill='#647C6C' /> <p>Lamp</p>
            </div>
            <div className='flex justify-start items-center'>
              <User className='mr-2' color='#647C6C' fill='#647C6C' /> <p>2 desk</p>
            </div>
            <div className='flex justify-start items-center'>
              <User className='mr-2' color='#647C6C' fill='#647C6C' /> <p>2 desk</p>
            </div>
          </div>
    </div>
  )
}

export default Amentities
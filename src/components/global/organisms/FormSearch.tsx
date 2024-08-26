import { CalendarDays } from 'lucide-react'
import React from 'react'

function FormSearch() {
  return (
    <section className='section__container booking__container'>
    <form
      action='/'
      className='booking__form p-8 flex gap-4 items-center justify-center flex-wrap bg-white rounded-lg -translate-y-1/2 shadow-lg'
    >
      <div className='input__group '>
        <span>
          <CalendarDays />
        </span>
        <div>
          <label htmlFor='check-in'>CHECK-IN</label>
          <input
            className='block w-full max-w-[150px] py-1.5 text-dark text-sm outline-none border-none'
            type='text'
            placeholder='Check In'
          />
        </div>
      </div>
      <div className='input__group'>
        <span>
          <CalendarDays />
        </span>
        <div>
          <label htmlFor='check-out'>CHECK-OUT</label>
          <input
            className='block w-full max-w-[150px] py-1.5 text-dark text-sm outline-none border-none'
            type='text'
            placeholder='Check Out'
          />
        </div>
      </div>
      <div className='input__group'>
        <span>
          <CalendarDays />
        </span>
        <div>
          <label htmlFor='guest'>GUEST</label>
          <input
            className='block w-full max-w-[150px] py-1.5 text-dark text-sm outline-none border-none'
            type='text'
            placeholder='Guest'
          />
        </div>
      </div>
      <div className='input__group input__btn'>
        <button className='btn'>CHECK OUT</button>
      </div>
    </form>
  </section>
  )
}

export default FormSearch
import React from 'react'
import about from '../../../assets/about.jpg'
import ellip from '../../../assets/ellip.svg'
import './AboutUs.css'
import bubble1 from "../../../assets/bubble1.svg"
import bubble2 from "../../../assets/bubble2.svg"
function AboutUs() {
  return (
    <>
      <div className=' relative flex flex-col items-end mb-28'>
    
        <div className='box absolute top-0 left-0'></div>

        <div className='h-[800px] mt-24 float-right w-fit relative'>
          <img src={ellip} alt='ellip' className='h-full object-contain' />
        </div>
        <div className="absolute -left-96 top-[500px] transform -rotate-90 font-bold text-7xl z-10 tracking-[10px]">
        <p
          className='font-paytoneone mb-4 text-center relative'
          style={{
            background: 'linear-gradient(90deg, #464C52, #C6A083)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent'
          }}
        >
          <span className='absolute top-40 left-4 w-[120px] h-[120px] bg-white/70 rounded-full blur-[25px] -translate-x-1/2 -translate-y-1/2'></span>
          <span>Professional Comfort</span>
        </p>
      </div>
        
        {/* <section className='section__container overflow-hidden grid gap-8 about__container bg-black  ' id='about'>
          <div className='about__image '>
            <img className='max-w-[450px] mx-auto rounded-sm' src={about} alt='about' />
          </div>
          <div className='about__content'>
            <p className='section__subheader'>ABOUT US</p>
            <h2 className='section__header'>The Best Holidays Start Here!</h2>
            <p className='section__description'>
              With a focus on quality accommodations, personalized experiences, and seamless booking, our platform is
              dedicated to ensuring that every traveler embarks on their dream holiday with confidence and excitement.
            </p>
            <div className='about__btn'>
              <button className='btn'>Read More</button>
            </div>
          </div>
        </section> */}

        <section className='section__container banner__container absolute top-[400px] lg:right-[200px]'>
          {/* <div className='banner__content bg-white p-8 flex gap-8 items-center justify-evenly flex-wrap rounded-lg shadow-lg'>
            <div className='banner__card text-center flex-1 flex-shrink-0 basis-[180px] '>
              <h4 className='text-2xl font-semibold'>25+</h4>
              <p className='text-gray-500'>Properties Available</p>
            </div>
            <div className='banner__card text-center flex-1 flex-shrink-0 basis-[180px] '>
              <h4 className='text-2xl font-semibold'>25+</h4>
              <p className='text-gray-500'>Properties Available</p>
            </div>
            <div className='banner__card text-center flex-1 flex-shrink-0 basis-[180px]'>
              <h4 className='text-2xl font-semibold'>350+</h4>
              <p className='text-gray-500'>Bookings Completed</p>
            </div>
            <div className='banner__card text-center flex-1 flex-shrink-0 basis-[180px]'>
              <h4 className='text-2xl font-semibold'>600+</h4>
              <p className='text-gray-500'>Happy Customers</p>
            </div>
          </div> */}

          <section
            className='section__container overflow-hidden about__container bg-white min-w-3/5 room__card float-right rounded-3xl h-fit '
            id='about'
          >
            <div className='about__content px-14 py-5 flex flex-col gap-6'>
              <p className='section__subheader bg-[#EBE6DF] py-3 w-fit text-lg font-bold px-10 text-[#C5B5A6] rounded-2xl'>
                ABOUT US
              </p>
              <div>
                <h2 className='section__header text-2xl font-bold mb-3'>StudySpace</h2>
                <p className='section__description'>
                  With a focus on quality accommodations, personalized experiences.
                </p>
              </div>
              <div>
                <h2 className='section__header text-2xl font-bold mb-3'>StudySpace</h2>
                <p className='section__description'>
                  With a focus on quality accommodations, personalized experiences.
                </p>
              </div>

              <div className='flex justify-between items-center about__btn'>
                <div className='flex flex-col gap-3 justify-center items-center text-[#C5B5A6]'>
                  <h4 className='text-5xl font-semibold section__header'>25k</h4>
                  <p className='section__description'>Properties Available</p>
                </div>
                <div className='flex flex-col gap-3 justify-center items-center text-[#C5B5A6]'>
                  <h4 className='text-5xl font-semibold section__header'>350k</h4>
                  <p className='section__description'>Bookings Completed</p>
                </div>
                <div className='flex flex-col gap-3 justify-center items-center text-[#C5B5A6]'>
                  <h4 className='text-5xl font-semibold section__header'>600k</h4>
                  <p className='section__description'>Happy Customers</p>
                </div>
              </div>
            </div>
           
          </section>
         
          <img src={bubble1} className='absolute w-80 -right-28 -top-28'/>
          <img src={bubble2} className='absolute w-72 top-80 -left-32 z-[-1]'/>
        </section>
      </div>
    </>
  )
}

export default AboutUs

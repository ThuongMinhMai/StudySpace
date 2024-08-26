import React from 'react'
import about from '../../../assets/about.jpg'

function AboutUs() {
  return (
    <section className='section__container overflow-hidden grid gap-8 about__container ' id='about'>
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
  </section>
  )
}

export default AboutUs
import React from 'react'
import ScrollReveal from 'scrollreveal'
import AboutUs from '../organisms/AboutUs'
import Explore from '../organisms/Explore'
import Faq from '../organisms/Faq'
import Feature from '../organisms/Feature'
import Footer from '../organisms/Footer'
// import FormSearch from '../organisms/FormSearch'
import HeaderHomePage from '../organisms/HeaderHomePage'
import Offer from '../organisms/Offer'
import Test from '../organisms/Test'
const HomePage = () => {
  React.useEffect(() => {
    const scrollRevealOption = {
      distance: '50px',
      origin: 'bottom',
      duration: 1000
    }
    const revealElements = [
      { selector: '.header__container p', options: { ...scrollRevealOption } },
      { selector: '.header__container h1', options: { ...scrollRevealOption, delay: 500 } },
      { selector: '.about__image img', options: { ...scrollRevealOption, origin: 'left' } },
      { selector: '.about__content .section__subheader', options: { ...scrollRevealOption, delay: 500 } },
      { selector: '.about__content .section__header', options: { ...scrollRevealOption, delay: 1000 } },
      { selector: '.about__content .section__description', options: { ...scrollRevealOption, delay: 1500 } },
      { selector: '.about__btn', options: { ...scrollRevealOption, delay: 2000 } },
      { selector: '.room__card', options: { ...scrollRevealOption, interval: 500 } },
      { selector: '.service__list li', options: { ...scrollRevealOption, interval: 500, origin: 'right' } }
    ]

    revealElements.forEach(({ selector, options }) => {
      ScrollReveal().reveal(selector, options)
    })

    // Cleanup function
    return () => {
      revealElements.forEach(({ selector }) => {
        const elements = document.querySelectorAll(selector)
        elements.forEach((el) => {
          const htmlElement = el as HTMLElement
          htmlElement.style.opacity = ''
          htmlElement.style.transform = ''
        })
      })
    }
  }, [])

  return (
    <div className='body'>
      
     
      <HeaderHomePage />
     
      {/* <FormSearch /> */}
      <AboutUs />
      <Feature />
      <Explore />
      <Offer />
      {/* <Testimonial /> */}
      <Test/>
      <Faq/>
      <Footer />
    </div>
  )
}

export default HomePage

import { Outlet } from 'react-router-dom'
import Header from '../../../components/global/organisms/Header'
import Footer from '../organisms/Footer'
import React from 'react'
import ScrollReveal from 'scrollreveal'

function RootLayout({ isSearchOpen, toggleSearch }:any) {
  React.useEffect(() => {
    const scrollRevealOption = {
      distance: '50px',
      origin: 'bottom',
      duration: 1000
    }
    const revealElements = [
      { selector: '.header__image', options: { ...scrollRevealOption } },
      { selector: '.header_room', options: { ...scrollRevealOption ,delay:300} },
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
    <div className="h-screen relative">
      {/* Pass isSearchOpen and toggleSearch to Header */}
      <Header isSearchOpen={isSearchOpen} toggleSearch={toggleSearch} />
      <div className="flex min-h-[70%] pt-10">
        {/* The Outlet will pass context to nested routes like RoomPage */}
        <Outlet context={{ isSearchOpen, toggleSearch }} />
      </div>
      <Footer />
    </div>
  );
}

export default RootLayout
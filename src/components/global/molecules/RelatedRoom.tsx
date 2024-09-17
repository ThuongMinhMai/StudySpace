import React from 'react'
import { Col, Row } from 'antd'
import CardSpace from '../organisms/CardSpace'
import CardReated from './CardRelated'

function RelatedRoom() {
  const cardData = [
    {
      title: 'Card 1',
      description: 'Description 1',
      imgSrc:
        'https://www.eposaudio.com/contentassets/2af3669017f34ae58049ce43c127bd3b/expand_idealmeetingroom_still-life_01.jpg?width=1300'
    },
    {
      title: 'Card 2',
      description: 'Description 2',
      imgSrc: 'https://zoomgov.com/docs/image/zoomrooms/overview-03.png'
    },
    {
      title: 'Card 3',
      description: 'Description 3',
      imgSrc: 'https://media-cdn.tripadvisor.com/media/photo-s/1b/3f/c1/f1/kj-coffee-shop-es-un.jpg'
    },
    {
      title: 'Card 4',
      description: 'Description 4',
      imgSrc: 'https://www.doanhchu.com/wp-content/uploads/2015/01/coffee-shop-1.jpg'
    },
    {
      title: 'Card 5',
      description: 'Description 5',
      imgSrc:
        'https://interiorai.com/cdn-cgi/image/format=jpeg,fit=cover,width=1536,quality=75/https://r2-us-west.interiorai.com/1706794679-afdb958b2cbdae693c621f5a1685e465-2.png'
    },
    {
      title: 'Card 6',
      description: 'Description 6',
      imgSrc: 'https://i.pinimg.com/736x/3d/8b/e8/3d8be817b8a1b70452890e02c8279d1f.jpg'
    }
  ]
  return (
    <div className=''>
      <div className='text-2xl font-medium mb-10' >Relacted Room</div>

      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full'>
        {cardData.map((card, index) => (
          <div className='mb-10' key={index}>
            <CardSpace title={card.title} description={card.description} imgSrc={card.imgSrc} />
          </div>
        ))}
      </div>
    </div>
  )
}

export default RelatedRoom

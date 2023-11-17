import { useState } from 'react'
import Carousel from 'react-bootstrap/Carousel'
import { Image } from 'react-bootstrap'

function ControlledCarousel() {
  const [index, setIndex] = useState(0)

  const handleSelect = (selectedIndex: any) => {
    setIndex(selectedIndex)
  }

  return (
    <Carousel activeIndex={index} onSelect={handleSelect}>
      <Carousel.Item interval={10000}>
        <Image
          src="https://images.unsplash.com/photo-1602722053020-af31042989d5?q=80&w=3870&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt="First slide"
          fluid
          style={{ objectFit: 'contain', height: '100%' }}
        />
        <Carousel.Caption>
          <h3></h3>
          <p></p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item interval={10000}>
        <Image
          src="https://plus.unsplash.com/premium_photo-1664202525979-80d1da46b34b?q=80&w=3871&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt="Second slide"
          fluid
          style={{ objectFit: 'cover', height: '100%' }}
        />
        <Carousel.Caption>
          <h3></h3>
          <p></p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item interval={10000}>
        <Image
          src="https://images.unsplash.com/photo-1588581939864-064d42ace7cd?q=80&w=3870&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt="Third slide"
          fluid
          style={{ objectFit: 'cover', height: '100%' }}
        />
        <Carousel.Caption>
          <h3></h3>
          <p></p>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
  )
}

export default ControlledCarousel

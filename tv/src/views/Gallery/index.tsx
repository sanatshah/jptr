import { Container, Image, Text } from './styles'

import forest from "./waterfall.jpeg"

import { useEffect } from 'react'
import { ImageContainer } from './styles'

export function Gallery() {

  useEffect(() => {
  })

  return (
    <Container>
      <ImageContainer>
        <Image
          src={forest}
          alt="Forest"
        />
      </ImageContainer>
    </Container>
  )
}
 

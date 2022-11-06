import { Container, Image, Text } from './styles'

import logo from "./jupiter.png"

export function Loading() {
  return (
    <Container>
      <Image
        src={logo}
        alt="ReactJS logo"
      />
      <Text>Booting up...</Text>
    </Container>
  )
}
 

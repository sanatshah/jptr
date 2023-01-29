import { Container, Image, Text } from './styles'

import logo from "./jupiter.png"

//import bootupSound from "./bootup.wav"
//import { Howl } from "howler"
import { useEffect } from 'react'

/*
const bootup = new Howl({
  src: [ bootupSound ]
})*/

export function Loading() {

  /*
  useEffect(() => {
    bootup.play()
    bootup.loop()
    return () => {
      bootup.stop()
    }
  })*/

  return (
    <Container>
      <Image
        src={logo}
        alt="ReactJS logo"
      />
      <Text>Syncing...</Text>
    </Container>
  )
}
 

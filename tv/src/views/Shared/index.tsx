import { Container, Image, Text } from './styles'

import logo from "./jupiter.png"
import { Toolbar } from '../../components/Toolbar'
import { PortalSpace } from '../../components/PortalSpace'
import { useEffect, useState } from 'react'
import { Gallery } from '../Gallery'

/*
import { Howl } from 'howler'
import openSound from "./enter.wav"
const open = new Howl({
  src: [ openSound ]
})*/

export const Shared = () => {
  const [ isInactive, setIsInactive ] = useState(true)

  useEffect(() => {
    window.Main.on('message', (data: any) => {
      switch(data) {
        case 'ENTER':
          setIsInactive( isInactive => {
           
            if (isInactive) {
              //open.play()
            }

            return false
          })
          break;
      }
    })

  }, [])


  return (
    <>
      {isInactive ? (
        <Gallery />
      ) : (
        <>
          <PortalSpace />
          <Toolbar />
        </>
      )}
    </>
  )
}
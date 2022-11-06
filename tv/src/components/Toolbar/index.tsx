import { ReactNode, ButtonHTMLAttributes, useState, useEffect } from 'react'

import { Container, EndTag, ImgButton } from './styles'

import g from './g.png'
import sunny from './sunny.png'

import Sound from "react-sound"
import selectionChange from "./selectionChange2.wav"

interface ToolbarItem {
  src?: string,
  Component? : ReactNode
}


export const Toolbar = () => {

  const items: ToolbarItem[] = [{ src: g }, {src: sunny}, { Component: <EndTag>Open</EndTag>}]
  const [ currentSelectedItem, setCurrentSelectedItem ] = useState(0)

  useEffect(() => {

    window.Main.on('message', (data: any) => {
      console.log("got data!!: ", data)
      switch(data) {
        case 'LEFT':
          setCurrentSelectedItem(current => {
            console.log("\n\n\ncurrent: ", current)
            console.log(" new current: ", current + 1 > items.length - 1 ? current + 1 % items.length - 1 : current +1)
            return current - 1 < 0 ? items.length -1 : current - 1
          })
          break;
        case 'RIGHT':
          console.log("right!!")
          setCurrentSelectedItem(current => {
            if (current + 1 > items.length -1) {
              return 0 
            } else {
              return current + 1
            }
          })
          break;
      }
    })

  }, [])

  console.log("right: ", currentSelectedItem)

  return (
    <Container>
      <Sound
        url={selectionChange}
        playStatus={Sound.status.PLAYING}
      />
      {items.map((item: ToolbarItem, idx) => {
          if (currentSelectedItem === idx) {
            if (item.src) {
            return (
              <div style={{position: 'relative'}}>
                <ImgButton key={idx} src={item.src}/>
                <div style={{ position: 'absolute', right: '40px', height: '10px', width: '10px',  borderRadius: 100, backgroundColor: 'white'}}/>
              </div>
            )

            } else {
            return (
              <>
                {item.Component}
                <div style={{ position: 'absolute', height: '10px', width: '10px', right: '50px', top: '67px', borderRadius: 100, backgroundColor: 'white'}}/>
              </>
            )

            }
          } else {
            return item.src ? <ImgButton key={idx} src={item.src}/>: item.Component
          }

      })}
    </Container>
  )
}

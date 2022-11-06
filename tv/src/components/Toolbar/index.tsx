import { ReactNode, ButtonHTMLAttributes, useState, useEffect } from 'react'

import { Container, EndTag, ImgButton } from './styles'

import g from './g.png'
import sunny from './sunny.png'
import add from './addicon.png'

import selectionChange from "./selectionChange2.wav"
import openSound from "./openandclose.wav"
import closeSound from "./close.wav"
import { Howl } from 'howler'

interface ToolbarItem {
  src?: string,
  Component? : ReactNode
}

const hoverSound = new Howl({
  src: [ selectionChange ]
})

const open = new Howl({
  src: [ openSound ]
})

const close = new Howl({
  src: [ closeSound ]
})

export const PlaceWrapper = ({
  Component,
  right=0,
  top=0,
  bottom=0,
  left=0
}: {Component : ReactNode, right?:number, top?: number, bottom?: number, left?: number}) => {

  return (
    <div style={{position: 'relative'}}>
      {Component}
      <div style={{ position: 'absolute', right, top, bottom, left, height: '10px', width: '10px',  borderRadius: 100, backgroundColor: 'white'}}/>
    </div>
  )
}



export const Toolbar = () => {

  const items: ToolbarItem[] = [{ src: g }, {src: sunny}, { Component: <EndTag>Open</EndTag>}]
  const [ currentSelectedItem, setCurrentSelectedItem ] = useState(0)
  const [ currentMenuSelectedItem, setCurrentMenuSelectedItem ] = useState(0)

  const [ expandedToolbar, setExpandedToolbar ] = useState(true)
  const [ showToolbarContent, setShowToolbarContent ] = useState(false)


  useEffect(() => {

    window.Main.on('message', (data: any) => {
      switch(data) {
        case 'LEFT':
          setCurrentSelectedItem(current => {
            return current - 1 < 0 ? items.length -1 : current - 1
          })
          hoverSound.play()
          break;
        case 'RIGHT':
          setCurrentSelectedItem(current => {
            if (current + 1 > items.length -1) {
              return 0 
            } else {
              return current + 1
            }
          })
          hoverSound.play()
          break;
        case 'ENTER':
          console.log("got enter: ")
          setExpandedToolbar(expanded => {
            const newValue = !expanded

            if (newValue) {
              open.play()
              setShowToolbarContent(false)
            } else {
              close.play()
              setTimeout(() => setShowToolbarContent(true), 915)
            }


            return newValue;
          })

          break;
      }
    })

  }, [])

  return (
    <Container style={ expandedToolbar ? { height: 'calc(100vh - 60px)', width: 'calc(100vw - 60px)', padding: '3vw'}: {}}>
      {!expandedToolbar && showToolbarContent && items.map((item: ToolbarItem, idx) => {
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
                <div style={{ position: 'absolute', height: '10px', width: '10px', right: '43px', top: '67px', borderRadius: 100, backgroundColor: 'white'}}/>
              </>
            )
            }
          } else {
            return item.src ? <ImgButton key={idx} src={item.src}/>: item.Component
          }
      })}
      {expandedToolbar && (
        <div style={{display: 'flex', flexDirection: 'column', height: '100%'}}>
          <div>
            <h1 style={{ color : "white", fontSize: "5vh"}}>Members</h1>
            <div style={{height: '3vh'}} />
            {[g, sunny, add].map((pic, idx) => <ImgButton key={idx} src={pic} style={{width: '5vw', margin: '1vw'}} />)}
          </div>
          <div style={{height: '8vw'}}></div>
          <div>
            <h1 style={{ color : "white",fontSize: "5vh"}}>Guests</h1>
            <ol style={{marginLeft: '2vw'}}>
            Note:
              <li>
                Guests will be automatically picked up if they have a jupiter browser on their phone
              </li>
              <li>
                Once a guest is out of the bluetooth range of this homenode, they will removed as a guest 
              </li>
            </ol>
            <div style={{height: '3vh'}} />
            {[add].map((pic, idx) => <ImgButton key={idx} src={pic} style={{width: '5vw', margin: '1vw'}} />)}
          </div>
        </div>
      )}
    </Container>
  )
}

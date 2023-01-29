import React from 'react';
import { useLocalStorage } from 'usehooks-ts'
import { BACKGROUND_THEME } from '../config/theme'

export const GradientBackground = () => {
  const [ savedBackgroundTheme] = useLocalStorage("background-theme", "default")
  const backgroundTheme = BACKGROUND_THEME.forest
  return (
    <div style={{
        position: "absolute",
        top: "0%",
        right: "0%",
        margin:0,
        bottom: "auto",
        width: "100vw",
        height: "100vh",
        backgroundImage: "none",
        backgroundSize: "none",
        backgroundRepeat: "repeat"
    }}>
      <div style={{
        "position":"absolute","top":"11%","right":"-14%","width":"45vw","height":"45vh","borderTopLeftRadius":"50%","borderTopRightRadius":"50%","borderBottomLeftRadius":"50%","borderBottomRightRadius":"50%","backgroundColor":backgroundTheme[1],"filter":"blur(120px)"
      }}/>
      <div style={{
        "position":"absolute","left":"-14%","top":"10%","width":"46vw","height":"46vh","borderTopLeftRadius":"50%","borderTopRightRadius":"50%","borderBottomLeftRadius":"50%","borderBottomRightRadius":"50%","backgroundColor":backgroundTheme[2],"filter":"blur(120px)"
      }}/>
      <div style={{
        "position":"absolute","left":"46%","top":"auto","right":"0%","bottom":"31%","width":"44vw","height":"44vh","borderTopLeftRadius":"50%","borderTopRightRadius":"50%","borderBottomLeftRadius":"50%","borderBottomRightRadius":"50%","backgroundColor":backgroundTheme[3],"filter":"blur(120px)"
      }}/>
      <div style={{
        "position":"absolute","top":"30%","width":"52vw","height":"52vh","borderTopLeftRadius":"50%","borderTopRightRadius":"50%","borderBottomLeftRadius":"50%","borderBottomRightRadius":"50%","backgroundColor":backgroundTheme[4],"filter":"blur(120px)","mixBlendMode":"normal"
      }}/>
    </div>
  )
}
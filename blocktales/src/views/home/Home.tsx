import React from 'react';
import { Toolbar } from '../../components/Toolbar';
import { Homepage } from './Homepage';

export const GradientBackground = () => {
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
          /* cover */
        backgroundRepeat: "repeat"
          /* no-repeat */
    }}>
      <div style={{
        "position":"absolute","top":"11%","right":"-14%","width":"45vw","height":"45vh","borderTopLeftRadius":"50%","borderTopRightRadius":"50%","borderBottomLeftRadius":"50%","borderBottomRightRadius":"50%","backgroundColor":"rgb(235 74 230)","filter":"blur(120px)"
      }}/>
      <div style={{
        "position":"absolute","left":"-14%","top":"10%","width":"46vw","height":"46vh","borderTopLeftRadius":"50%","borderTopRightRadius":"50%","borderBottomLeftRadius":"50%","borderBottomRightRadius":"50%","backgroundColor":"rgb(74 101 235)","filter":"blur(120px)"
      }}/>
      <div style={{
        "position":"absolute","left":"46%","top":"auto","right":"0%","bottom":"31%","width":"44vw","height":"44vh","borderTopLeftRadius":"50%","borderTopRightRadius":"50%","borderBottomLeftRadius":"50%","borderBottomRightRadius":"50%","backgroundColor":"rgb(241 220 118)","filter":"blur(120px)"
      }}/>
      <div style={{
        "position":"absolute","top":"30%","width":"52vw","height":"52vh","borderTopLeftRadius":"50%","borderTopRightRadius":"50%","borderBottomLeftRadius":"50%","borderBottomRightRadius":"50%","backgroundColor":"hsla(262.03125, 79.71%, 60.58%, 1.00)","filter":"blur(120px)","mixBlendMode":"normal"
      }}/>
      <div style={{

      }}/>
      <div style={{

      }}/>


    </div>
  )
}

function Home() {
  return (
      <div className="App" style={{
        position: 'relative',
        width: '100vw',
        height: '100vh',
        backgroundColor: '#e9e9e9'
      }}>
        <Toolbar />
        <GradientBackground />
        <Homepage />
      </div>
  );
}

export default Home;

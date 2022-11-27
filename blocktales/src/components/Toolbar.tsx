//import { Web3Button, useConnectModal } from '@web3modal/react'
import React from 'react';

export const Toolbar = () => {
  return (
    <div style={{
      display: "flex",
      width: "100vw",
      height: "100px",
      alignItems:'center',
      backgroundColor: "white"
    }}>
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        width: '200px',
        height: '70px',
        borderRadius: '50px',
        marginLeft: "100px",
        marginTop: '33px'
      }}>
        <h1 style={{fontSize: "28px", fontWeight: '800', marginTop: "-5px", marginLeft: "10px"}}>bk</h1>
      </div>
    </div>
  )
}
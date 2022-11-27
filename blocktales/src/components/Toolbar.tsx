//import { Web3Button, useConnectModal } from '@web3modal/react'
import React from 'react';
import { Search } from './Search';

import Logo from "./assets/logo.png";
import { Img } from '@chakra-ui/image';

export const Toolbar = () => {

  return (
    <div style={{
      display: "flex",
      width: "100vw",
      height: "100px",
      justifyContent:"center",
      alignItems:'center'
    }}>
    <div style={{
      display: 'flex',
      justifyContent: 'space-between',
      width: '90%',
      height: '70px',
      padding: '20px',
      backgroundColor: "white",
      borderRadius: '50px'
    }}>
      <h1 style={{fontSize: "28px", fontWeight: '800', marginTop: "-5px", marginLeft: "10px"}}>BlockTales</h1>
    </div>

    </div>

  )

}
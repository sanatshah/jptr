import { Web3Button, useConnectModal } from '@web3modal/react'
import React from 'react';
import { Search } from './Search';

import Logo from "./logo.png";
import { Img } from '@chakra-ui/image';

export const Toolbar = () => {
  const { isOpen, open, close } = useConnectModal()

  return (
    <div style={{
      display: 'flex',
      justifyContent: 'space-between',
      width: '100%',
      height: '100px',
      padding: '20px'
    }}>
      <Img src={Logo} />
      <Web3Button />
    </div>

  )

}
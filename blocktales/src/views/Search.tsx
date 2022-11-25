
import { Input } from '@chakra-ui/react';
import { Web3Button, useConnectModal } from '@web3modal/react'
import React from 'react';

export const Search = () => {

  return (
    <div >
        <Input css={{width: '800px', marginBottom: "20px"}} variant="outline" placeholder='Search by Address or ENS' />
    </div>

  )

}
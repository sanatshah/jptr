

import { Button, Input, Menu, MenuButton, MenuItem, MenuList, Tab, TabList, TabPanel, TabPanels, Tabs } from '@chakra-ui/react';
//import { Web3Button, useConnectModal, useAccount } from '@web3modal/react'
import React from 'react';
import { ArticleList } from './ArticleList';
import { Search } from './Search';

//const provider = new AlchemyProvider("goerli");
//const wallet = Wallet.fromMnemonic("twelve words here");
//await publishCast(wallet, provider, "Hello, Farcaster!");

export const Homepage = () => {
  //const { account } = useAccount()
  //console.log("Address: ", account.address)
  //console.log("isConnected: ", account.isConnected)
  return (
    <div style={{
      display: 'grid',
      height: 'calc(100% - 200px)',
      width: "100%",
      justifyContent: 'center',
      alignContent: 'flex-start',
    }}>
      <Search />
      <div style={{ border: '1px dotted #5e1a91', width: "800px", height: "80vh", padding: '20px', overflowY: 'auto'}} >
          <Tabs css={{ width: "100%", }}variant='soft-rounded' >
            <div style={{display: 'flex', justifyContent: 'space-between', width: '100%', position: "sticky", top: "-21px", backgroundColor: "#e9e9e9", padding: "20px"}}>
            <TabList>
                <Tab>Trending</Tab>
                <Tab>News</Tab>
                <Tab>Hacks</Tab>
                <Tab>Whales</Tab>

            </TabList>
                <Menu>
                  <MenuButton as={Button}>
                    Sort 
                  </MenuButton>
                  <MenuList>
                    <MenuItem>New</MenuItem>
                    <MenuItem>Controversial</MenuItem>
                    <MenuItem>Top</MenuItem>
                  </MenuList>
                </Menu>
              </div>
            <TabPanels>
              <TabPanel>
                <ArticleList />
              </TabPanel>
              <TabPanel>
                <p>two!</p>
              </TabPanel>
            </TabPanels>
          </Tabs>

      </div>
     
    </div>
  )

}
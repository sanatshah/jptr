

import { Button, Input, Menu, MenuButton, MenuItem, MenuList, Tab, TabList, TabPanel, TabPanels, Tabs } from '@chakra-ui/react';
//import { Web3Button, useConnectModal, useAccount } from '@web3modal/react'
import React from 'react';
import { ArticleList } from './PostList';
import { Search } from './../../components/Search';
import { Chrono } from "react-chrono"
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink } from '@chakra-ui/react';

  const items = [{
      title: "May 2022",
      cardTitle: "Dunkirk",
      url: "http://www.history.com",
      cardSubtitle:"Men of the British Expeditionary Force (BEF) wade out to..",
      cardDetailedText: "Men of the British Expeditionary Force (BEF) wade out to..",
    },
  {
      title: "July 2022",
      cardTitle: "Dunkirk",
      url: "http://www.history.com",
      cardSubtitle:"Men of the British Expeditionary Force (BEF) wade out to..",
      cardDetailedText: "Men of the British Expeditionary Force (BEF) wade out to..",
    },
  {
      title: "October 2022",
      cardTitle: "Dunkirk",
      url: "http://www.history.com",
      cardSubtitle:"Men of the British Expeditionary Force (BEF) wade out to..",
      cardDetailedText: "Men of the British Expeditionary Force (BEF) wade out to..",
    }
  ];

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
      marginTop: "40px"
    }}>
      <Search />
      <div style={{ width: "1000px", height: "80vh", backgroundColor: '#b6b6b6'}} >
          <Tabs css={{ width: "100%", }}variant='soft-rounded' >
            <div style={{display: 'flex', justifyContent: 'space-between', width: '100%', position: "sticky", top: "-21px", backgroundColor: "rgb(0 0 0 / 65%)", padding: "20px"}}>
            <TabList>
                <Tab>New</Tab>
                <Tab>Top</Tab>
            </TabList>
                {/*<Menu>
                  <MenuButton as={Button}>
                    Sort 
                  </MenuButton>
                  <MenuList>
                    <MenuItem>New</MenuItem>
                    <MenuItem>Controversial</MenuItem>
                    <MenuItem>Top</MenuItem>
                  </MenuList>
                </Menu>*/}
              </div>
            <TabPanels style={{backgroundColor: '#b6b6b6'}}>
              <TabPanel>
                <Chrono items={items as any} />
              </TabPanel>
              <TabPanel>
                <ArticleList />
              </TabPanel>
            </TabPanels>
          </Tabs>

      </div>
     
    </div>
  )

}
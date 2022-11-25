import React from 'react';
import { Web3Modal } from '@web3modal/react'
import { Toolbar } from './views/Toolbar';
import { Homepage } from './views/Homepage';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink } from '@chakra-ui/react';
import { Card } from './components/Card';

const config = {
  projectId: '53f57bac7dd366a79f4083f23b2b773b',
  theme: "dark",
  accentColor: 'default',
  ethereum: {
    appName: 'jupiter'
  }
}

// #5e1a91

export const Article = () => {
  return (
      <div style={{width: '100vw', height: '100vh', backgroundColor: '#e9e9e9'}}>
        <Toolbar />
        <div style={{ display: 'flex', flexDirection: "row"}}>
          <div style={{ display: 'flex', justifyContent: 'center', alignContent: "center", flexDirection: 'column', paddingLeft: "10vw"}}>
            <div style={{ width: "60vw", marginBottom: "20px"}}>
              <Breadcrumb>
                <BreadcrumbItem>
                  <BreadcrumbLink href='/'>Home</BreadcrumbLink>
                </BreadcrumbItem>

                <BreadcrumbItem>
                  <BreadcrumbLink href='#'>[Article Name Here]</BreadcrumbLink>
                </BreadcrumbItem>
              </Breadcrumb>
            </div>
            <div style={{ border: '1px dotted #5e1a91', width: "60vw", height: "80vh", padding: '20px', overflowY: 'auto'}} >
            </div>

          </div>
          <div style={{ marginLeft: '40px'}}>
            <p style={{marginTop: "20px", marginBottom: "20px"}}>Commentary</p>
            <Card>
              <div style={{width: "400px", height: "400px"}}>

              </div>
            </Card>

          </div>

        </div>
        <Web3Modal config={config as any} />
      </div>
  );
}

export default Article;

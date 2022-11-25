import React from 'react';
//import { Web3Modal } from '@web3modal/react'
import { Toolbar } from './views/Toolbar';
import { Homepage } from './views/Homepage';

/*
        <Web3Modal config={config as any} />
const config = {
  projectId: '53f57bac7dd366a79f4083f23b2b773b',
  theme: "dark",
  accentColor: 'default',
  ethereum: {
    appName: 'jupiter'
  }
}*/

// #5e1a91

function App() {
  return (

      <div className="App" style={{ width: '100vw', height: '100vh', backgroundColor: '#e9e9e9'}}>
        <Toolbar />
        <Homepage />
      </div>
  );
}

export default App;

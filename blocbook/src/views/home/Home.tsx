import React from 'react';
import { GradientBackground } from '../../components/GradientBackground';
import { Toolbar } from '../../components/Toolbar';
import { Homepage } from './Homepage';

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

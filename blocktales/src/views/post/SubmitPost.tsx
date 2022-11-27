import { Button } from '@chakra-ui/react';
import React from 'react';
import { Link } from 'react-router-dom';
import { DelayRender } from '../../components/DelayRender';
import { HomeContainer } from '../../components/HomeContainer';
import { Toolbar } from '../../components/Toolbar';
import { GradientBackground } from '../../components/GradientBackground';
import { Editor } from '../../components/editor/Editor';

export const SubmitPost = () => {
  return (
      <div className="App" style={{
        position: 'relative',
        width: '100vw',
        height: '100vh',
        backgroundColor: '#e9e9e9'
      }}>
        <Toolbar />
        <GradientBackground />
        <HomeContainer
          header={(
            <div style={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: "space-between",
              width: '100%',
              position: 'relative'
            }}>
              <div>
              <DelayRender>
                <div style={{
                  position: 'absolute',
                  top: "-80px",
                  right: "-40px"
                }}>
                  {/*<Button variant={'ghost'}>Save</Button>*/}
                </div>
                  <Link to="/">
                <Button colorScheme={'whiteAlpha'} variant={'ghost'} style={{ marginRight: "16px"}}>Cancel</Button>
                  </Link>
                </DelayRender>
              </div>
              <DelayRender>
              <Button colorScheme={'gray'} variant={'solid'}>Publish</Button>
                </DelayRender>
            </div>
          )}
        >
          <div style={{
            display: "flex",
            width: "100%",
            height: "100%",
            justifyContent: 'center',
          }}>
            <div
              style={{
                marginTop: "24px",
                width: "60%",
                height: "100%",
              }}
            >
              <DelayRender>
                <Editor />
              </DelayRender>
            </div>
          </div>
        </HomeContainer>
      </div>
  );
}
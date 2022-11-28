import { Button } from '@chakra-ui/react';
import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { DelayRender } from '../../components/DelayRender';
import { HomeContainer } from '../../components/HomeContainer';
import { Toolbar } from '../../components/Toolbar';
import { GradientBackground } from '../../components/GradientBackground';
import { Editor } from '../../components/editor/Editor';
import { _ } from "@homenode/jscore/dist"
import { Page } from '@homenode/jscore/dist/apps/blockbook/Blockbook';

interface PostProps{
  id: string
}

export const Post = (props) => {
  const { postId } = useParams();
  let page: Page | undefined;
  if (postId) {
    page = _.m().apps.blockbook?.getPage(postId)
    console.log("page: ", page)
  }

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
              <div
                style={{
                  position: 'absolute',
                  top: "-66px",
                  left: "-20px"
                }}
              >
                <Link to="/">
                  <Button>Back</Button>
                </Link>
              </div>
              <DelayRender>
                {page && (
                  <div>
                    <div 
                      style={{
                        display: 'flex',
                        flexDirection: 'column'
                      }}                  
                    >
                      <p>Published by : @llhungrub</p>
                      <p>Likes: {page.socialActivity?.likes} - Comments: {page.socialActivity?.comments}</p>
                    </div>
                    
                  </div>
                )}
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
                {page && <Editor disabled blocks={page.sections as any}/>}
              </DelayRender>
            </div>
          </div>
        </HomeContainer>
      </div>
  );
}
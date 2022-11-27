

import React from 'react';
import { Tab, TabList, TabPanel, TabPanels, Tabs } from '@chakra-ui/react';
import { observer } from 'mobx-react-lite'

import { ArticleList } from './PostList';
import { Search } from './../../components/Search';

import { _ } from "@homenode/jscore/dist"

import {
  Timeline,
  Events,
  TextEvent,
  createTheme,
  themes
} from '@merc/react-timeline';

const customTheme = createTheme(themes.default, {
  card: {
    backgroundColor: '#efefef',
  },
  date: {
    backgroundColor: 'rebeccapurple',
  },
  marker: {
    borderColor: 'rebeccapurple',
  },
  timelineTrack: {
    backgroundColor: 'rebeccapurple',
  },
});

export const Homepage = observer(() => {
  const posts = _.m().modules.social?.network?.posts ?? []

  console.log("posts: ", posts)
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
            <div style={{display: 'flex', justifyContent: 'space-between', width: '100%', position: "sticky", top: "-21px", backgroundColor: "rgb(255 255 255 / 18%)", padding: "20px"}}>
            <TabList>
                <Tab>History</Tab>
                <Tab>New</Tab>
                <Tab>Top</Tab>
            </TabList>
            </div>
              <TabPanels style={{backgroundColor: '#b6b6b6', overflowY: 'auto'}}>
                <TabPanel style={{backgroundColor: '#b6b6b6', overflowY: 'auto'}}>
                  <Timeline theme={customTheme}>
                  <Events>
                    {posts?.map((value, i) => {
                      return (
                        <TextEvent key={i} date={"1/1/" + (10 + i).toString()} text={value} />
                      )
                    })}
                  </Events>
                </Timeline>
              </TabPanel>
                <TabPanel>
                  <ArticleList />
                </TabPanel>
                <TabPanel>
                  <ArticleList />
                </TabPanel>
            </TabPanels>
          </Tabs>

      </div>
     
    </div>
  )

})
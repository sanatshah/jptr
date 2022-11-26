

import React from 'react';
import { Chrono } from "react-chrono"
import { Tab, TabList, TabPanel, TabPanels, Tabs } from '@chakra-ui/react';

import { ArticleList } from './PostList';
import { Search } from './../../components/Search';

import { TwitterTweetEmbed } from 'react-twitter-embed'

import {
  Timeline,
  Events,
  UrlButton,
  ImageEvent,
  TextEvent,
  YouTubeEvent,
  Event,
  TweetEvent,
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

export const Homepage = () => {
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
                <Tab>New</Tab>
                <Tab>Top</Tab>
            </TabList>
              </div>
            <TabPanels style={{backgroundColor: '#b6b6b6', overflowY: 'auto'}}>
              <TabPanel style={{backgroundColor: '#b6b6b6', overflowY: 'auto'}}>
                <Timeline theme={customTheme}>
                <Events>
                  <TextEvent date="1/1/19" text="**Markdown** is *supported*" />

                  <ImageEvent
                    date="4/13/19"
                    text="You can embed images..."
                    src="https://res.cloudinary.com/dovoq8jou/image/upload/v1564772194/jellyfish.jpg"
                    alt="jellyfish swimming"
                    credit="Photo by [@tavi004](https://unsplash.com/@tavi004)"
                  >
                    <div>
                      <UrlButton href="https://unsplash.com/search/photos/undersea">
                        View more undersea photos
                      </UrlButton>
                    </div>
                  </ImageEvent>

                  <YouTubeEvent
                    date="6/18/19"
                    id="6UnRHtwHGSE"
                    name="General Tso's Chicken recipe"
                    text="... and YouTube videos!"
                  />

                  <ImageEvent
                    date="4/13/19"
                    text="You can embed images..."
                    src="https://res.cloudinary.com/dovoq8jou/image/upload/v1564772194/jellyfish.jpg"
                    alt="jellyfish swimming"
                    credit="Photo by [@tavi004](https://unsplash.com/@tavi004)"
                  >
                    <div>
                      <UrlButton href="https://unsplash.com/search/photos/undersea">
                        View more undersea photos
                      </UrlButton>
                    </div>
                  </ImageEvent>
                </Events>
              </Timeline>
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
import { Button } from '@chakra-ui/react';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { DelayRender } from '../../components/DelayRender';
import { HomeContainer } from '../../components/HomeContainer';
import { Toolbar } from '../../components/Toolbar';
import { GradientBackground } from '../../components/GradientBackground';
import { Editor } from '../../components/editor/Editor';
import { _ } from "@homenode/jscore/dist"
import { Page, Section } from "@homenode/jscore/dist/apps/blockbook/Blockbook"
import { OutputData } from '@editorjs/editorjs';
import toast from 'react-hot-toast';

const createPage = (savedData: OutputData): Page => {
  console.log("savedData: ", savedData)
  const transactions: string[] = []
  const addresses: string[] = []
  const sections: Section[] = []

  savedData.blocks.forEach((block, i) => {
    switch (block.type) {

      case 'Txn':
        transactions.push(block.data)
        sections.push({
          id: i.toString(),
          data: {
            address: block.data
          } 
        })
        break;

      case 'Address':
        addresses.push(block.data)
        sections.push({
          id: i.toString(),
          data: {
            address: block.data
          } 
        })
        break;

      case 'Text':
        sections.push({
          id: i.toString(),
          data: {
            text: block.data
          } 
        })
        break;

      case 'Gif':
        break;

      default:
        break;
    }
  })


  return {
    transactions,
    addresses,
    sections
  }
}

export const SubmitPost = () => {
  const [ saveData, setSaveData ] = useState<OutputData | undefined>()
  const [ isPublishing, setIsPublishing ] = useState(false)

  const publishPost = async () => {
    if (!saveData) {
      return
    }

    setIsPublishing(true)
    try {
      await _.m().apps.blockbook?.publish(createPage(saveData))
    } catch (e) {
      toast.error("Publish failed!")
    }
    setIsPublishing(false)
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
              <Button disabled={isPublishing} colorScheme={'gray'} variant={'solid'} onClick={publishPost}>Publish</Button>
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
                <Editor onNewEditorData={(saveData) => setSaveData(saveData)}/>
              </DelayRender>
            </div>
          </div>
        </HomeContainer>
      </div>
  );
}
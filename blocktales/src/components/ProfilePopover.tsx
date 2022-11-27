import { Popover, PopoverTrigger, Button, PopoverContent, PopoverHeader, PopoverArrow, PopoverCloseButton, PopoverBody, PopoverFooter, ButtonGroup } from "@chakra-ui/react"
import { Box } from "framer-motion"
import React from "react"

export const ProfilePopover = () => {
  const initialFocusRef = React.useRef()
  return (
    <Popover
      initialFocusRef={initialFocusRef as any}
      placement='bottom'
      closeOnBlur={false}
    >
      <PopoverTrigger>
        <Button>Trigger</Button>
      </PopoverTrigger>
      <PopoverContent color='white' bg='blue.800' borderColor='blue.800'>
        <PopoverHeader pt={4} fontWeight='bold' border='0'>
          Manage Your Channels
        </PopoverHeader>
        <PopoverArrow />
        <PopoverCloseButton />
        <PopoverBody>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do
          eiusmod tempor incididunt ut labore et dolore.
        </PopoverBody>
      </PopoverContent>
    </Popover>
  )
}
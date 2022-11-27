import React from 'react';
import { Button, Input } from '@chakra-ui/react';

interface SearchProps {
  onPostClick: () => Promise<void>
}

export const Search = ({ onPostClick }: SearchProps) => {
  const [ isButtonClicked, setIsButtonClicked] = React.useState(false)
  return (
    <div style={{
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginBottom: "16px"
    }}>
        <Input style={{ marginRight: "16px"}}variant="outline" placeholder='Lookup address(es)' />
        <Button disabled={isButtonClicked} onClick={async () => {
          setIsButtonClicked(true)
          await onPostClick()
          setIsButtonClicked(false)
        }}>Post</Button>
    </div>

  )

}
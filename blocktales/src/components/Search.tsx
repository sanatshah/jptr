import React from 'react';
import { Button, Input } from '@chakra-ui/react';

import { _ } from '@homenode/jscore/dist'
import { observer } from 'mobx-react-lite';
import toast from 'react-hot-toast';
import { Link } from 'react-router-dom';
import { DelayRender } from './DelayRender';

interface SearchProps {
  onPostClick: () => Promise<void>
}

export const Search = observer(({ onPostClick }: SearchProps) => {
  const [ isButtonClicked, setIsButtonClicked] = React.useState(false)
  const connectedToFarcaster = !!_.m().modules.social?.network?.hasUser()
  return (
    <div style={{
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginBottom: "16px"
    }}>
        <div>
          {false && <Input style={{ marginRight: "16px"}}variant="outline" placeholder='Lookup address(es)' />}
        </div>
        {connectedToFarcaster && (
          <Link to="/post">
            <Button disabled={isButtonClicked} onClick={async () => {
              setIsButtonClicked(true)
              await onPostClick()
              setIsButtonClicked(false)
            }}>Post</Button>
          </Link>)
        }
    </div>

  )
})
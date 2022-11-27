import React from 'react';
import { Button, Input } from '@chakra-ui/react';

import { _ } from '@homenode/jscore/dist'
import { observer } from 'mobx-react-lite';
import { Link } from 'react-router-dom';

export const Search = observer(() => {
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
          <Link to="/publish">
            <Button>Create Page</Button>
          </Link>)
        }
    </div>

  )
})
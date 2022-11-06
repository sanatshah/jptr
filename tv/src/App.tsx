import { useEffect, useState } from 'react'
import { GlobalStyle } from './styles/GlobalStyle'

import { Loading} from './views/Loading'
import { Setup } from './views/Setup'
import { Shared } from './views/Shared'

export function App() {

  const [ isBooted, setIsBooted ] = useState(false)
  const [ isSetup, setIsSetup ] = useState(true)

  useEffect(() => {
    setTimeout(() => setIsBooted(true), 2000)
  }, [])

  return (
    <>
      <GlobalStyle />
      { !isSetup ? <Setup /> : (
        !isBooted ? <Loading /> : <Shared/>
      )}
    </>
  )
}
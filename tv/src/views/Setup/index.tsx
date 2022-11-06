import { Container, Image, Text } from './styles'

import logo from "./jupiter.png"
import { Toolbar } from '../../components/Toolbar'
import { PortalSpace } from '../../components/PortalSpace'
import QRCode from 'react-qr-code'

export const Setup = () => {
  return (
    <Container>
      <div>
        <Image
          src={logo}
          alt="ReactJS logo"
        />
      </div>
      <div style={{width: '40%'}}>
          <h3 style={{marginTop: '20px'}}>Step 1: Download the Jupiter Browser on your phone and connect your wallet </h3>
          <h3 style={{marginTop: '20px'}}>Step 2: Scan the following QR code  </h3>
          <div style={{ width: 'fit-content', marginTop: '5vh', border: '3px solid #A61815', borderRadius: '20px', padding: '20px'}}>
            <QRCode value="hey" bgColor='#C8D8E1' size={180}/>
          </div>
      </div>
    </Container>
  )
}
 

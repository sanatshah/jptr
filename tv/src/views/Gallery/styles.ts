import styled, { keyframes } from 'styled-components'

const ellipsis = keyframes`
  to {
    width: 1.25em;
  }
`

export const Container = styled.div`
  height: 100vh;
  width: 100v2;
  padding: 20;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: #e2e2e2;
`

export const ImageContainer = styled.div`
  box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25) inset;
  width: 90vw;
  height: 90vh;
`

export const Image = styled.img`
  width: 90vw;
  height: 90vh;
  border-radius: 11px;
`

export const Text = styled.p`
  margin-top: 36px;
  font-size: 1vw;

  &:after {
    overflow: hidden;
    display: inline-block;
    vertical-align: bottom;
    -webkit-animation: ${ellipsis} steps(4,end) 900ms infinite;      
    animation: ${ellipsis} steps(4,end) 900ms infinite;
    content: "\2026"; /* ascii code for the ellipsis character */
    width: 0px;
  }
`

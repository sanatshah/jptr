import styled, { keyframes } from 'styled-components'

const ellipsis = keyframes`
  to {
    width: 1.25em;
  }
`

export const Container = styled.div`
  height: 100vh;
  padding: 25px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  button {
    margin-top: 24px;
  }
`

export const Image = styled.img`
  width: 5vw;
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

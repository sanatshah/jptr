import styled, { keyframes } from 'styled-components'

export const Container = styled.div`
  height: 100vh;
  padding: 25px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-evenly;

  button {
    margin-top: 24px;
  }
`

export const Image = styled.img`
  width: 10vw;
`

export const Text = styled.p`
  margin-top: 36px;
  font-size: 18px;
`

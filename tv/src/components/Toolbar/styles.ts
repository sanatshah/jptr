import styled from 'styled-components'

export const Container = styled.div`
  width: 40vw;
  height: 10vh;
  transition: height 1.2s;

  
  display: flex;
  align-items: center;
  padding: 20px;

  background: #85B3F8;
  border-radius: 20px;
  border: 0;

  box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
  
  position: absolute;
  left: 0;
  bottom: 30px;
  margin: auto;
  right: 0;
`

export const ImgButton = styled.img`
  width: 4vw; 
  margin-right: 1vw;
  &:hover {
    filter: brightness(0.9);
  }

  &:active {
    filter: brightness(0.7);
  }

`

export const EndTag = styled.p`
  position: absolute;
  right: 5%;
  top: 35%;
  color: white;
  font-size: 1vw;
`

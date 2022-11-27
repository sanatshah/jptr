import React from 'react'

export const Card = ({ children }: { children : React.ReactNode}) => {

  return(
    <div style={{ padding: 20, height: "fit-content", borderRadius: "5px", backgroundColor: '#ffffff' }}>
      {children}
    </div>

  )

}
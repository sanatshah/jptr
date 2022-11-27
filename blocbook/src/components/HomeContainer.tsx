

import React from 'react';

export const HomeContainer = ({ header, children }: { header: React.ReactNode, children: React.ReactNode}) => {
  return (
    <div style={{
      display: 'grid',
      height: 'calc(100% - 200px)',
      width: "100%",
      justifyContent: 'center',
      alignContent: 'flex-start',
      marginTop: "40px"
    }}>
      <div style={{ width: "1000px", height: "80vh", backgroundColor: '#b6b6b6', marginTop: '56px', marginLeft: "-14px"}} >
        <div style={{
          display: 'flex',
          minHeight:'80px',
          justifyContent: 'space-between',
          width: '100%',
          position: "sticky",
          top: "-21px",
          backgroundColor: "rgb(255 255 255 / 16%)",
          padding: "20px"
        }}>
          {header}

        </div>
        {children}
      </div>
    </div>
  )

}
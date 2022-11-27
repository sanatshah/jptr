

import React from 'react';

const showStyle = { visibility: "visible", opacity: 1}
export const DelayRender = ({ children }: { children: React.ReactNode}) => {
  const [shouldRender, setShouldRender ] = React.useState(false)

  React.useEffect(() => {
    setTimeout(() => setShouldRender(true), 500)
  }, [])

  const style = {
      visibility: 'hidden',
      opacity: 0,
      transition: "visibility 0s, opacity 0.03s linear",
      ...(shouldRender ? showStyle: {})
    }

  return (
    <div style={style as any}>
      {children}
    </div>
  )

}
import React from "react"

export const StatusIndicator = ({ isUp, describe }) => {
  const indicatorColor = status => {
    if (status == null) return 'gray'
    else return status ? 'green' : 'red'
  }

  const indicator =
    <div style={{
      width: 1 + 'em',
      height: 1 + 'em',
      borderRadius: 100 + '%',
      backgroundColor: indicatorColor(isUp),
    }}
    ></div>

  const indicatorWithDescription =
      <>
        {indicator} Service is {isUp ? 'available' : 'down'}
      </>

  return describe ? indicatorWithDescription : indicator
}

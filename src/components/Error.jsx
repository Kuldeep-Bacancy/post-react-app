import React from 'react'

function Error({message}) {
  return (
    <div className="absolute top-0 left-0 w-full h-full bg-red-200 opacity-90 flex items-center justify-center" id="errorComponent">
      <div className="text-red-700">
        <p className="font-bold">Error: {message}</p>
        <p>Please try again later.</p>
      </div>
    </div>
  )
}

export default Error
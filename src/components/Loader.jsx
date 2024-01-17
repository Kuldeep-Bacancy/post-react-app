import React from 'react'

function Loader() {
  return (
    <div className="absolute top-0 left-0 w-full h-full bg-gray-100 opacity-75 flex items-center justify-center" id="loader">
      <div className="loader ease-linear border-t-4 border-blue-500 border-solid rounded-full w-12 h-12"></div>
    </div>
  )
}

export default Loader
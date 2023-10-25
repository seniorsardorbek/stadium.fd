import React from 'react'
import './loader.css'
function Loader() {
  return (
    <div className='absolute h-full w-full bg-white dark:bg-gray-900 left-0 top-0   right-0 bottom-0' >
      <ul className="loader " >
        <li><span className='dark:text-white text-gray-800' >m</span></li>
        <li><span className='dark:text-white text-gray-800' >y</span></li>
        <li><span className='dark:text-white text-gray-800' >A</span></li>
        <li><span className='dark:text-white text-gray-800' >r</span></li>
        <li><span className='dark:text-white text-gray-800' >e</span></li>
        <li><span className='dark:text-white text-gray-800' >n</span></li>
        <li><span className='dark:text-white text-gray-800' >a</span></li>
      </ul>
    </div>
  )
}

export default Loader
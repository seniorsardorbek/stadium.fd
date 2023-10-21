import React from 'react'
import './loader.css'
function Loader() {
  return (
    <div className='absolute h-full w-full bg-white left-0 top-0  right-0 bottom-0' >
      <ul className="loader" >
        <li><span>m</span></li>
        <li><span>y</span></li>
        <li><span>A</span></li>
        <li><span>r</span></li>
        <li><span>e</span></li>
        <li><span>n</span></li>
        <li><span>a</span></li>
      </ul>
    </div>
  )
}

export default Loader
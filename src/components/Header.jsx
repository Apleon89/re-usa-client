import React from 'react'
import GoBack from './GoBack'
import './Header.css'

function Header(props) {
  return (
    <div className="title-container">
        <GoBack />
        <h3>{props.name}</h3>
        <div className="divStyle"></div>
      </div>
  )
}

export default Header
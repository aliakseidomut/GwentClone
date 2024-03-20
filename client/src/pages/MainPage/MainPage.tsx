import React from 'react'
import './MainPage.scss'
import gwentBgLogo from '../../assets/images/gwentBgLogo.png'
import { Link } from 'react-router-dom'

export const MainPage:React.FC = () => {
  return (
    <div className='MainPage'>
      <img src={gwentBgLogo} alt="" />
      <div className="buttonContainer">
        <button>Play</button>
      </div>
      <Link className='Link' to='/myCards'>My cards</Link>
    </div>
  )
}

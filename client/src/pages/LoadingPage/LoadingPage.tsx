import React from 'react'
import './LoadingPage.scss'
import witcherLogo from '../../assets/images/witcherLogo.png'


export const LoadingPage:React.FC = () => {
  return (
    <div className='LoadingPage'>
      <div className='container'>
        <img src={witcherLogo} alt="" />
        <h1>Loading</h1>
      </div>
    </div>
  )
}
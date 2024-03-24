import React from 'react'
import './MyCardsPage.scss'
import { CardsPageHeader } from '../../components/CardsPageHeader/CardsPageHeader'
import { Cards } from '../../components/Cards/Cards'

export const MyCardsPage:React.FC = () => {
  return (
    <div className='MyCardsPage'>
      <CardsPageHeader />
      <Cards />
    </div>
  )
}

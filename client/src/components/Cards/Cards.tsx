import React from 'react'
import './Cards.scss'
import { cardsInfo } from '../../assets/cards.js'
import { Card } from '../../components/Card/Card'

export const Cards:React.FC = () => {  
    return (
        <div className='Cards'>
            {cardsInfo.map(el => <Card />)}
        </div>
    )
}

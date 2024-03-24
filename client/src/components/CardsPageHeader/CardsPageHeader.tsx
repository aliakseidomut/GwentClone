import React, { useState } from 'react'
import './CardsPageHeader.scss'
import { BiSolidLeftArrow, BiSolidRightArrow } from "react-icons/bi";

interface Fraction {
    name: string,
    description: string
}

export const CardsPageHeader:React.FC = () => {  
    const fractions: Fraction[] = [
        {
            name: 'Kingdom of the north',
            description: 'The Northern Kingdoms draw a card from their deck after each round won'
        },
        {
            name: 'Nilfgaard',
            description: 'Nilfgaard wins if there is a draw'
        }
    ]
    const [fractionNum, setFractionNum] = useState(0);

    return (
        <div className='CardsPageHeader'>
            <BiSolidLeftArrow
                className='arrow'
                size={30}
                onClick={() => setFractionNum(Math.abs((fractionNum - 1) % fractions.length))}
            />
            <div className='fractionDescription'>
                <h1>{fractions[fractionNum].name}</h1>
                <p>{fractions[fractionNum].description}</p>
            </div>
            <BiSolidRightArrow
                className='arrow'
                size={30}
                onClick={() => setFractionNum((fractionNum + 1) % fractions.length)} 
            />
        </div>
    )
}

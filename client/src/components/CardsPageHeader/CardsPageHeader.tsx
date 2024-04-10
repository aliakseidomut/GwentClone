import React from 'react'
import './CardsPageHeader.scss'
import { BiSolidLeftArrow, BiSolidRightArrow } from "react-icons/bi";
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import { DeckData } from '../../types/interfaces';
import { setCurrentDeck } from '../../redux/features/deck/decksSlice';

export const CardsPageHeader:React.FC = () => {  
    const decks: DeckData[] = useSelector((state: RootState) => state.decks.decks) || []
    const currentDeckNum: number = useSelector((state: RootState) => state.decks.currentDeckNum) || 0
    const dispatch = useDispatch();

    return (
        <div className='CardsPageHeader'>
            <BiSolidLeftArrow
                className='arrow'
                size={30}
                onClick={() => dispatch(setCurrentDeck({currentDeckNum: Math.abs((currentDeckNum - 1) % decks.length)}))}
            />
            <div className='fractionDescription'>
                <h1>{decks[currentDeckNum].fraction.name}</h1>
                <p>{decks[currentDeckNum].fraction.ability}</p>
            </div>
            <BiSolidRightArrow
                className='arrow'
                size={30}
                onClick={() => dispatch(setCurrentDeck({currentDeckNum: (currentDeckNum + 1) % decks.length}))}
            />
        </div>
    )
}

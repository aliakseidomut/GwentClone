import React, { useEffect, useState } from 'react';
import './MyCardsPage.scss';
import { CardsPageHeader } from '../../components/CardsPageHeader/CardsPageHeader';
import { Cards } from '../../components/Cards/Cards';
import { Filters } from '../../components/Filters/Filters';
import { useDispatch, useSelector } from 'react-redux';
import { getDecks } from '../../redux/features/deck/decksSlice';
import { AppDispatch, RootState } from '../../redux/store';
import axios from "../../utils/axios";
import { CardData } from '../../types/interfaces';

export const MyCardsPage: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const decks = useSelector((state: RootState) => state.decks.decks);
  const currentDeckNum = useSelector((state: RootState) => state.decks.currentDeckNum) || 0;
  const [cardsCollection, setCardsCollection] = useState([]);

  useEffect(() => {
    dispatch(getDecks());
    axios.get('/cards')
      .then(response => {
        setCardsCollection(response.data.cards);
      })
      .catch(err => {
        console.log(err);
      });
  }, [dispatch]);
  
  const [colFilterName, setColFilter] = useState('all');
  const [deckFilterName, setDeckFilter] = useState('all');

  const handleSetColFilter = (filter: string) => {
    setColFilter(filter)
  }

  const handleSetDeckFilter = (filter: string) => {
    setDeckFilter(filter)
  }

  if (!decks[0] || !cardsCollection) {
    return <h1>Loading</h1>;
  }

  const filteredCollection = cardsCollection.filter((el: CardData) => 
    (el.fraction === decks[currentDeckNum].fraction.name || el.fraction === 'Neutral') &&
    (
      colFilterName === 'all' ||
      (el.hero && colFilterName === 'Heroes') ||
      el.type === colFilterName
    )
  )

  const filteredDeck = decks[currentDeckNum].cards.filter((el: CardData) => 
      deckFilterName === 'all' ||
      (el.hero && deckFilterName === 'Heroes') ||
      el.type === deckFilterName
  )

  return (
    <div className='MyCardsPage'>
      <CardsPageHeader />
      
      <div className='main'>
        <div className='collection'>
          <Filters onSetFilter={ handleSetColFilter } filterType="collection" />
          <Cards cards={filteredCollection} containerName={'collection'}  />
        </div>

        <div className='deck'>
          <Filters onSetFilter={ handleSetDeckFilter } filterType="deck" />
          <Cards cards={filteredDeck} containerName={'deck'} />
        </div>
      </div>
    </div>
  );
};

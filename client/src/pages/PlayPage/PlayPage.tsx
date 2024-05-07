import React, { useEffect, useState } from 'react';
import './PlayPage.scss';
import { AppDispatch, RootState } from '../../redux/store';
import { useDispatch, useSelector } from 'react-redux';
import { LoadingPage } from '../LoadingPage/LoadingPage';
import { getRoom } from '../../redux/features/room/roomSlice';
import { UserInfo } from '../../components/UserInfo/UserInfo';
import { io } from 'socket.io-client';
import { UserGameState } from '../../types/interfaces';
import { CardsOutPlay } from '../../components/CardsOutPlay/CardsOutPlay';

const socket = io('http://localhost:3002');

export const PlayPage: React.FC = () => {
const dispatch: AppDispatch = useDispatch();
const decks = useSelector((state: RootState) => state.decks.decks);
const currentDeckNum = useSelector((state: RootState) => state.decks.currentDeckNum) || 0;
const roomId = useSelector((state: RootState) => state.room.room?._id);
const user = useSelector((state: RootState) => state.auth.user);

const [gameState, setGameState] = useState(null);

useEffect(() => {
  dispatch(getRoom());
  if (!localStorage.getItem('gameState')){
    socket.emit('join', {
      roomId,
      userData: {
        username: user?.username,
        deck: decks[currentDeckNum],
      },
    });
  }

  socket.on('gameState', ({ gameState }) => {
    const userGameState: UserGameState = gameState.filter(el => el.username === user?.username);
    const opponentGameState: UserGameState = gameState.filter(el => el.username !== user?.username);
    
    setGameState({user: userGameState, opponent: opponentGameState});
  });
}, [currentDeckNum, decks, dispatch, roomId, user]);

useEffect(() => {
  const savedGameState = localStorage.getItem('gameState');
  
  if (savedGameState) {
    setGameState(JSON.parse(savedGameState));
  } else {
    socket.on('gameState', ({ gameState }) => {
      const userGameState: UserGameState = gameState.filter(el => el.username === user?.username)[0];
      const opponentGameState: UserGameState = gameState.filter(el => el.username !== user?.username)[0];
      
      setGameState({user: userGameState, opponent: opponentGameState});
      
      localStorage.setItem('gameState', JSON.stringify({user: userGameState, opponent: opponentGameState}));
    });
  }
}, [])

if (!gameState || !gameState.user || !gameState.opponent) {
  return <LoadingPage />;
}

  return (
    <div className="PlayPage">
      <div className="info">
        <UserInfo user={gameState.opponent}/>
        
        <div className='specialCards'></div>

        <UserInfo user={gameState.user} />
      </div>
      <div className="table"></div>
      <div className="cardsOutPlay">
        <CardsOutPlay cardsInDeck={gameState.opponent.cardsInDeck} lostCards={gameState.opponent.lostCards} />
        <CardsOutPlay cardsInDeck={gameState.user.cardsInDeck} lostCards={gameState.user.lostCards} />
      </div>
    </div>
  );
};
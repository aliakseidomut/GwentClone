import { useDispatch, useSelector } from 'react-redux';
import { CardData } from '../../types/interfaces';
import './Card.scss'
import { AppDispatch, RootState } from '../../redux/store';
import { deleteCard, pushCard } from '../../redux/features/deck/decksSlice';

interface Props {
    cardData: CardData,
    containerName: string
}

export const Card = ({ cardData, containerName }: Props) => {
    function getImgUrl(fileName: string){
        const ext = '.png'
        const imgUrl = new URL(`../../assets/images/cardsImages/${fileName}${ext}`, import.meta.url).href
        return imgUrl
    }
    
    const dispatch: AppDispatch = useDispatch();
    const decks = useSelector((state: RootState) => state.decks.decks);
    const currentDeckNum = useSelector((state: RootState) => state.decks.currentDeckNum) || 0;

    const handleClick = () => {
        if (containerName === 'collection') {
            dispatch(pushCard({ deckId: decks[currentDeckNum]._id, cardId: cardData._id }));
        } else if (containerName === 'deck') {
            dispatch(deleteCard({ deckId: decks[currentDeckNum]._id, cardId: cardData._id }));
        }
    }    

    return (
        <div className='Card' onClick={handleClick}>
            <img src={getImgUrl(cardData.name.split(' ').join(''))} alt="" />
        </div>
    );
};

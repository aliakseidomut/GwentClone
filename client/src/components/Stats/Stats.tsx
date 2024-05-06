import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import './Stats.scss'
import { useNavigate } from 'react-router-dom';
import { connectUser } from '../../redux/features/room/roomSlice';
import { warning } from '../../utils/toastify';

export const Stats = () => {      
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const decks = useSelector((state: RootState) => state.decks.decks);
    const currentDeckNum = useSelector((state: RootState) => state.decks.currentDeckNum) || 0;
    
    function getImgUrl(fileName: string){
        const ext = '.png'
        const imgUrl = new URL(`../../assets/images/cardsImages/${fileName}${ext}`, import.meta.url).href
        return imgUrl
    }

    const handleClick = () => {
        if (isCorrectUnitCards) {
            dispatch(connectUser());
            navigate('/play');
        } else {
            warning('Колода должна содержать минимум 22 карты отрядов');
        }
    }

    const unitCards = decks[currentDeckNum].cards.filter(el => el.type === 'CloseCombat' || el.type === 'RangedCombat' || el.type === 'SiegeCombat')
    const specialCards = decks[currentDeckNum].cards.filter(el => el.type === 'SpecialCard' || el.type === 'WeatherCard')
    const heroCards = decks[currentDeckNum].cards.filter(el => el.hero)
    const unitsTotalPower = unitCards.reduce((acc, cur) => acc + cur.power , 0)

    const isCorrectUnitCards = unitCards.length >= 22;

    return (
        <div className='Stats'>
            <h2>Leader</h2>
            <img src={getImgUrl(decks[currentDeckNum].fraction.leader.name.split(' ').join(''))} alt="" />
            <ul>
                <li>{`Cards in the deck: ${decks[currentDeckNum].cards.length}`}</li>
                <li>{`Unit Cards: ${isCorrectUnitCards ? unitCards.length : unitCards.length + '/' + 22}`}</li>
                <li>{`Special cards: ${specialCards.length}`}</li>
                <li>{`Total unit card strength: ${unitsTotalPower}`}</li>
                <li>{`Heroes: ${heroCards.length}`}</li>
            </ul>

            <button onClick={ handleClick }>Play</button>
        </div>
    )
}

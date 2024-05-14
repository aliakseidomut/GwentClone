import { CardData } from '../../types/interfaces'
import './CardsOutPlay.scss'

interface Props {
    lostCards: CardData[]
    cardsInDeck: CardData[]
    fraction: string
}

export const CardsOutPlay = ({lostCards, cardsInDeck, fraction}:Props) => {  
    function getImgUrl(fileName: string){
        const ext = '.png'
        const imgUrl = new URL(`../../assets/images/cardsImages/${fileName}${ext}`, import.meta.url).href
        return imgUrl
    }

    return (
        <div className='CardsOutPlay'>
            <div className='lostCards'>
                {
                    lostCards.length !== 0 ?
                    <img src={getImgUrl(lostCards[lostCards.length - 1].name.split(' ').join(''))} className={'lostCard'} /> :
                    <div className='empty'></div>
                }
                
            </div>

            <div className='cardsInDeck'>
                {
                    cardsInDeck.length !== 0 ?
                    <img src={getImgUrl(fraction.split(' ').join(''))} className={'deckCard'} /> :
                    <div className='empty'></div>
                }

                <h2>{cardsInDeck.length}</h2>
            </div>
        </div>
    )
}
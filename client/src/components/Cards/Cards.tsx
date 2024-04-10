import './Cards.scss'
import { Card } from '../../components/Card/Card'
import { CardData } from '../../types/interfaces'

interface Props {
    cards: CardData[],
    containerName: string
}

export const Cards = ({ cards, containerName }: Props) => {  
    return (
        <div className='Cards'>
            {cards.map((el) => <Card cardData={el} containerName={containerName} />)}
        </div>
    )
}

import { CardData } from '../../types/interfaces'
import './CardsOnTable.scss'

interface Props {
    userStatus: string
    cardsOnTable: CardData[]
}

export const CardsOnTable = ({userStatus, cardsOnTable}: Props) => {  
    function getImgUrl(fileName: string){
        const ext = '.png'
        const imgUrl = new URL(`../../assets/images/cardsImages/${fileName}${ext}`, import.meta.url).href
        return imgUrl
    }
    
    
    return (
        <div className={`${userStatus}CardsOnTable`}>
            <div className='CloseCombat'>
                {
                    cardsOnTable.filter(el => el.type === 'CloseCombat').map(el => <img src={getImgUrl(el.name.split(' ').join(''))} />)
                }
            </div>
            
            <div className='RangedCombat'>
                {
                    cardsOnTable.filter(el => el.type === 'RangedCombat').map(el => <img src={getImgUrl(el.name.split(' ').join(''))} />)
                }
            </div>

            <div className='SiegeCombat'>
                {
                    cardsOnTable.filter(el => el.type === 'SiegeCombat').map(el => <img src={getImgUrl(el.name.split(' ').join(''))} />)
                }
            </div>
        </div>
    )
}
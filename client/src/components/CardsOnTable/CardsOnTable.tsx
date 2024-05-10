import './CardsOnTable.scss'

interface Props {
    userStatus: string
}

export const CardsOnTable = ({userStatus}: Props) => {  
    return (
        <div className={`${userStatus}CardsOnTable`}>
            <div className='CloseCombat'></div>
            <div className='RangedCombat'></div>
            <div className='SiegeCombat'></div>
        </div>
    )
}
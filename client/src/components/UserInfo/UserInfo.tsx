import { TbCardsFilled } from 'react-icons/tb';
import { UserGameState } from '../../types/interfaces';
import './UserInfo.scss';

interface Props {
  user: UserGameState
}

export const UserInfo = ({ user }: Props) => {
  console.log(user.username)

  return (
    <div className='UserInfo'>
      <div className='text'>
        <h2 className='username'>{user.username}</h2>
        <h2 className='fraction'>{user.fraction}</h2>
      </div>
      
      <div className='stats'>
        <div className='cardsNum'>
          <TbCardsFilled className='icon' size={30} />
          <h2>{user.currentCards.length}</h2>
        </div>
        
        <div className='rounds'>
          <div className='circle'></div>
          <div className='circle'></div>
        </div>
      </div>

    
      <h2 className='totalPower'>{user.totalPower}</h2>
    </div>
  );
};
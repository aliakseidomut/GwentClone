import React, { useEffect } from 'react'
import './MainPage.scss'
import gwentBgLogo from '../../assets/images/gwentBgLogo.png'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from '../../redux/store'
import { FiLogOut } from "react-icons/fi";
import { logout } from '../../redux/features/auth/authSlice'

export const MainPage:React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  
  const isAuth: boolean = useSelector((state: RootState) => Boolean(state.auth.token))

  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuth) {
      navigate('/')
    }
  }, [isAuth, navigate])

  return (
    <div className='MainPage'>
      <FiLogOut size={35} className='logout' onClick={()=>{dispatch(logout())}} />
      <img src={gwentBgLogo} alt="" />
      <div className="buttonContainer">
        <Link className='button' to='/myCards'>Play</Link>
      </div>
    </div>
  )
}

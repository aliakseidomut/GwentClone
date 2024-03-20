import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import './LoginPage.scss'
import { AnyAction, ThunkDispatch } from '@reduxjs/toolkit'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from 'redux/store'
import { warning } from '../../utils/toastify'
import { User } from 'types/user'
import { loginUser } from '../../redux/features/auth/authSlice'

export const LoginPage:React.FC = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const navigate = useNavigate();

  const dispatch: ThunkDispatch<any, any, AnyAction> = useDispatch()

  const isAuth: boolean = useSelector((state: RootState) => Boolean(state.auth.token))
  const serverError: string | null = useSelector((state: RootState) => state.auth.error)

  useEffect(() => {
    if (serverError) {
      warning(serverError)
    }
    
    if (isAuth) {
      navigate('/main')
    }
  }, [isAuth, navigate, serverError])

  const handleSubmit = () => {
    const user: User = {
      username,
      password
    }

    try {
      dispatch(loginUser(user))
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <div className='LoginPage'>
      <h1>Login</h1>
      <div className='form'>
        <input required={true} placeholder='Name' type="text" value={username} onChange={e => setUsername(e.target.value)} />
        <input required={true} placeholder='Password' type="password" value={password} onChange={e => setPassword(e.target.value)} />
        <input type="submit" value="Submit" onClick={handleSubmit} />
        <Link className='Link' to='/'>Register</Link>
      </div>
    </div>
  )
}

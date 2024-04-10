import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { registerUser } from '../../redux/features/auth/authSlice'
import { UserData } from '../../types/interfaces'
import { AppDispatch, RootState } from '../../redux/store'
import './RegistrationPage.scss'
import { warning } from '../../utils/toastify'
import { getDecks } from '../../redux/features/deck/decksSlice'

export const RegistrationPage:React.FC = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [repeatPassword, setRepeatPassword] = useState('')

  const navigate = useNavigate();

  const dispatch: AppDispatch = useDispatch()

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
    const user: UserData = {
      username,
      password
    }

    try {
      if (password.length < 8) {
        warning('Пароль должен содержать не менее 8 символов');
        throw new Error('Пароль должен содержать не менее 8 символов')
      } else if (password !== repeatPassword) {
        warning('Пароли не совпадают')
        throw new Error('Пароли не совпадают')
      }
      dispatch(registerUser(user))
      dispatch(getDecks())
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <div className='RegistrationPage'>
      <h1>Registration</h1>
      <div className='form'>  
        <input required={true} placeholder='Name' type="text" value={username} onChange={e => setUsername(e.target.value)} />
        <input required={true} placeholder='Password' type="password" value={password} onChange={e => setPassword(e.target.value)} />
        <input required={true} placeholder='Repeat password' type="password" value={repeatPassword} onChange={e => setRepeatPassword(e.target.value)} />
        <input type="submit" value="Submit" onClick={handleSubmit} />
        <Link className='Link' to='/login'>Already have an account?</Link>
      </div>
    </div>
  )
}

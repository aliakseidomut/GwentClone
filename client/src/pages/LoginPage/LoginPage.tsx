import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import './LoginPage.scss'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from '../../redux/store'
import { warning } from '../../utils/toastify'
import { UserData } from '../../types/interfaces'
import { loginUser } from '../../redux/features/auth/authSlice'

export const LoginPage:React.FC = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

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

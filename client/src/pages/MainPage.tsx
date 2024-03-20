import React from 'react'
import { useSelector } from 'react-redux'
import { RootState } from '../redux/store'

export const MainPage:React.FC = () => {
  const state = useSelector((state: RootState) => state.auth)
  
  console.log(state)

  return (
    <div>
      <h1></h1>
    </div>
  )
}

import React from 'react'
import { Navigate } from 'react-router-dom'

const ProtectRoute = ({children}) => {
  const user = window.localStorage.getItem('user')
  if(!user)
  return <Navigate to='/auth/login' />

  return children
}

export default ProtectRoute
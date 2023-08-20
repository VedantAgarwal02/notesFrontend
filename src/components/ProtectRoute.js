import Cookies from 'js-cookie'
import React from 'react'
import { Navigate } from 'react-router-dom'

const ProtectRoute = ({children}) => {
  const user = window.localStorage.getItem('user')
  const token=Cookies.get('token')
  if(!user || !token)
  return <Navigate to='/auth/login' />

  return children
}

export default ProtectRoute
import React from 'react'
import SharedNavbar from './SharedNavbar'
import { Outlet } from 'react-router-dom'

const SharedLayout = () => {
  return (
    <div>
        <SharedNavbar />
        <Outlet />
    </div>
  )
}

export default SharedLayout
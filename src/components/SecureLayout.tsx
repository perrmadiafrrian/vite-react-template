import { memo } from 'react'
import { Navigate, Outlet, useLocation } from 'react-router-dom'
import useUser from '../hooks/useUser'

const SecureLayout = memo(() => {
  const user = useUser((s) => s.user)
  const location = useLocation()

  if (!user) return <Navigate to={'/auth'} state={{ from: location }} replace />

  return <Outlet />
})

export default SecureLayout

import { memo, useCallback, useEffect, useMemo, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import useUser from '../hooks/useUser'

const InsecurePage = memo(() => {
  const navigate = useNavigate()
  const location = useLocation()
  const assignUser = useUser((s) => s.assign)
  const user = useUser((s) => s.user)
  const [processing, setProcessing] = useState(false)

  const from = useMemo(
    () => location.state?.from?.pathname || '/',
    [location.state?.from?.pathname]
  )

  const handleSignIn = useCallback(() => {
    setProcessing(true)
    assignUser()
  }, [assignUser])

  useEffect(() => {
    if (user) navigate(from, { replace: true })
  }, [from, navigate, user])

  return (
    <div className="flex flex-col justify-center items-center w-full p-4 space-y-4">
      <h1 className="text-lg">Insecure Page</h1>
      <button
        disabled={processing}
        onClick={handleSignIn}
        className="btn btn-primary"
      >
        Sign In
      </button>
    </div>
  )
})

export default InsecurePage

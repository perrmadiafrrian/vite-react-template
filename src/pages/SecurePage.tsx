import { memo, useCallback, useState } from 'react'
import useUser from '../hooks/useUser'
import { Link } from 'react-router-dom'

const SecurePage = memo(() => {
  const revoke = useUser((s) => s.revoke)
  const [processing, setProcessing] = useState(false)

  const handleSignOut = useCallback(() => {
    setProcessing(true)
    revoke()
  }, [revoke])

  return (
    <div className="flex flex-col justify-center items-center w-full space-y-4">
      <h1 className="text-lg">Secure Page</h1>
      <Link to={'/counter'} className="btn btn-secondary">
        Go to Counter Page
      </Link>
      <button
        disabled={processing}
        onClick={handleSignOut}
        className="btn btn-ghost"
      >
        Sign Out
      </button>
    </div>
  )
})

export default SecurePage

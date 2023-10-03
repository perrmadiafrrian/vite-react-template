import { memo } from 'react'
import { Link } from 'react-router-dom'
import useCounter from '../hooks/useCounter'

const CounterPage = memo(() => {
  const count = useCounter((s) => s.count)
  const { increment, decrement } = useCounter((s) => ({
    increment: s.increment,
    decrement: s.decrement,
  }))

  return (
    <div className="flex flex-col justify-center items-center w-full space-y-4">
      <h1 className="text-lg">Counter Page</h1>
      <div>{count}</div>
      <div className="flex space-x-2">
        <button onClick={increment} className="btn btn-sm btn-primary">
          +
        </button>
        <button onClick={decrement} className="btn btn-sm btn-primary">
          -
        </button>
      </div>
      <Link to={'/'} className="btn btn-secondary">
        Go to Secure Page
      </Link>
    </div>
  )
})

export default CounterPage

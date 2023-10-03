import { Suspense, lazy } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import SecureLayout from './components/SecureLayout.tsx'

const CounterPage = lazy(() => import('./pages/CounterPage.tsx'))
const InsecurePage = lazy(() => import('./pages/InsecurePage.tsx'))
const SecurePage = lazy(() => import('./pages/SecurePage.tsx'))

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<SecureLayout />}>
          <Route
            path=""
            element={
              <Suspense>
                <SecurePage />
              </Suspense>
            }
          />
          <Route
            path="counter"
            element={
              <Suspense>
                <CounterPage />
              </Suspense>
            }
          />
        </Route>
        <Route
          path="/auth"
          element={
            <Suspense>
              <InsecurePage />
            </Suspense>
          }
        />
      </Routes>
    </BrowserRouter>
  )
}

export default App

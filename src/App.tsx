import { createBrowserRouter, RouterProvider } from 'react-router'
import Root from './pages/Root'
import ErrorPage from './pages/ErrorPage'
import { lazy, Suspense } from 'react'


const Login = lazy(() => import('./pages/authen/Login'))
const Signup = lazy(() => import('./pages/authen/Signup'))

const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: '/login',
        element: <Suspense fallback={<div>Loading...</div>}><Login /></Suspense>
      },
        {
          path: '/signup',
          element: <Suspense fallback={<div>Loading...</div>}><Signup /></Suspense>
        }
    ]
  }
])


export default function App() {
  return <RouterProvider router={router} />
}

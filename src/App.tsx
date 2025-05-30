import { createBrowserRouter, RouterProvider } from 'react-router'
import Root from './pages/Root'
import ErrorPage from './pages/ErrorPage'
import { lazy, Suspense } from 'react'
import Fallback from './components/fallback'

const Post = lazy(() => import('./pages/post/Posts'))
const Detail = lazy(() => import('./pages/post/Detail'))

const Login = lazy(() => import('./pages/authen/Login'))
const Signup = lazy(() => import('./pages/authen/Signup'))

const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <Suspense fallback={<Fallback />}><Post /></Suspense>,
        loader: () => import('./pages/post/Posts/loader').then(i => i.loader()),
        action: args => import('./pages/post/Posts/postFormAction').then(i => i.postFormAction(args))
      },
      {
        path: 'post/:id',
        element: <Suspense fallback={<Fallback />}><Detail /></Suspense>,
        loader: args => import('./pages/post/Detail/loader').then(i => i.loader(args))
      },
      {
        path: 'post/delete/:id',
        action: args => import('./pages/post/Delete/action').then(i => i.deleteAction(args))
      },
      {
        path: '/login',
        element: <Suspense fallback={<Fallback />}><Login /></Suspense>,
        action: args => import('./pages/authen/loginAction').then(i => i.loginAction(args))
      },
      {
        path: '/signup',
        element: <Suspense fallback={<Fallback />}><Signup /></Suspense>,
        action: args => import('./pages/authen/signupAction').then(i => i.signupAction(args))
      },

    ]
  }
])


export default function App() {
  return <RouterProvider router={router} />
}




import { Login, Home } from 'pages'
import { Navigate, useRoutes } from 'react-router-dom'

export default function Router() {
  return useRoutes([
    {
      path: '/login',
      element: <Login />,
    },
    {
      path: '/',
      element: <Home />,
    },
    {
      path: '/404',
      element: <>not found</>,
    },
    {
      path: '*',
      element: <Navigate to='/404' replace />,
    }
  ])
}



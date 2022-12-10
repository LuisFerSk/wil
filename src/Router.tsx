import { Login, Home, Loader } from 'pages'
import { Navigate, useRoutes } from 'react-router-dom'
import { authContext } from 'provider/Auth'
import { useContext } from 'react';

export default function Router() {
  const authsContext = useContext(authContext)

  const { user } = authsContext;

  function noAutenticado() {
    if (user === undefined) {
      return <Loader />
    }
    if (user === null) {
      return <Login />;
    }
    if (user) {
      return <Navigate to='/' replace />;
    }
  }

  function autenticado() {
    if (user === undefined) {
      return <Loader />
    }
    if (user === null) {
      return <Navigate to='/login' replace />;
    }
    if (user) {
      return <Home />;
    }
  }
  return useRoutes([
    {
      path: '/login',
      element: noAutenticado(),
    },
    {
      path: '/',
      element: autenticado(),
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



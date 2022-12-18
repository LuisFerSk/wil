import { Login, Home, Loader, User, Equipment } from 'pages'
import { Navigate, useRoutes } from 'react-router-dom'
import { authContext } from 'provider/Auth'
import { useContext } from 'react';

export default function Router(): React.ReactElement<any, string | React.JSXElementConstructor<any>> | null {
  const authsContext = useContext(authContext)

  const { user } = authsContext;

  function noAutenticado(): JSX.Element | undefined {
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

  function autenticado(): JSX.Element | undefined {
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
      children: [
        {
          path: "/",
          element: <Navigate to='/home' replace />
        },
        {
          path: "/equipment",
          element: <Equipment />
        },
        {
          path: "/user",
          element: <User />
        },
        {
          path: "/home",
          element: <>Home</>
        }
      ]
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



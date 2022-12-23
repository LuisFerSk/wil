import { Login, Home, Loader, User, Equipment, Maintenance, NotFound, Support } from 'pages'
import { Navigate, useRoutes } from 'react-router-dom'
import { authContext } from 'provider/Auth'
import { useContext } from 'react';
import { roles } from 'constants';

export default function Router(): React.ReactElement<any, string | React.JSXElementConstructor<any>> | null {
  const _authContext = useContext(authContext)
  const { user } = _authContext;

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
          element: <User />,
        },
        {
          path: "/maintenance",
          element: <Maintenance />
        },
        {
          path: "/support",
          element: user?.role === roles.administrator ? <Support /> : <Navigate to='/404' replace />
        },
        {
          path: "/home",
          element: <>Home</>
        }
      ]
    },
    {
      path: '/404',
      element: <NotFound />,
    },
    {
      path: '*',
      element: <Navigate to='/404' replace />,
    }
  ])
}



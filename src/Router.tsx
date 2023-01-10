import { User, Equipment, Maintenance, NotFound, Dashboard } from 'pages'
import { Navigate, useRoutes } from 'react-router-dom'
import { AuthGuard, NotAuthGuard, SupportGuard } from 'guards';

export default function Router(): React.ReactElement<any, string | React.JSXElementConstructor<any>> | null {
  return useRoutes([
    {
      path: '/login',
      element: <NotAuthGuard />,
    },
    {
      path: '/',
      element: <AuthGuard />,
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
          element: <SupportGuard />
        },
        {
          path: "/home",
          element: <Dashboard />
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



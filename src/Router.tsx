import { Equipment, Maintenance, NotFound, Dashboard, PrinterScanner } from 'pages'
import { Navigate, useRoutes } from 'react-router-dom'
import { AuthGuard, NotAuthGuard, SupportGuard } from 'guards';

export default function Router(): JSX.Element | null {
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
          path: "/printer-scanner",
          element: <PrinterScanner />
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



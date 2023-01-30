import { lazy, Suspense } from 'react'

import { Navigate, useRoutes } from 'react-router-dom'
import { SupportGuard, AuthGuard } from 'guards';
import { CircularProgress, Grid } from '@mui/material';
import { Loader } from 'pages';

export default function Router() {
  const Maintenance = lazy(() => import('pages/maintenance'));
  const Equipment = lazy(() => import('pages/equipment'));
  const NotFound = lazy(() => import('pages/404'));
  const Dashboard = lazy(() => import('pages/dashboard'));
  const PrinterScanner = lazy(() => import('pages/printerScanner'));
  const NotAuthGuard = lazy(() => import('guards/NotAuthGuard'));

  return useRoutes([
    {
      path: '/login',
      element: (
        <Suspense fallback={
          <Loader />
        }>
          <NotAuthGuard />
        </Suspense>
      ),
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
          element: (
            <Suspense fallback={
              <Grid textAlign='center'>
                <CircularProgress color='primary' />
              </Grid>
            }>
              <Equipment />
            </Suspense>
          )
        },
        {
          path: "/printer-scanner",
          element: (
            <Suspense fallback={
              <Grid textAlign='center'>
                <CircularProgress color='primary' />
              </Grid>
            }>
              <PrinterScanner />
            </Suspense>
          )
        },
        {
          path: "/maintenance",
          element: (
            <Suspense fallback={
              <Grid textAlign='center'>
                <CircularProgress color='primary' />
              </Grid>
            }>
              <Maintenance />
            </Suspense>
          )
        },
        {
          path: "/support",
          element: <SupportGuard />
        },
        {
          path: "/home",
          element: (
            <Suspense fallback={
              <Grid textAlign='center'>
                <CircularProgress color='primary' />
              </Grid>
            }>
              <Dashboard />
            </Suspense>
          )
        }
      ]
    },
    {
      path: '/404',
      element: (
        <Suspense fallback={
          <Grid textAlign='center'>
            <CircularProgress color='primary' />
          </Grid>
        }>
          <NotFound />
        </Suspense>
      ),
    },
    {
      path: '*',
      element: <Navigate to='/404' replace />,
    }
  ])
}



import { lazy, Suspense } from 'react'
import { Navigate, useRoutes } from 'react-router-dom'
import { CircularProgress, Grid } from '@mui/material'

import { SupportGuard, AuthGuard } from 'guards'
import { Loader } from 'pages'

export default function Router() {
  const NotFound = lazy(() => import('pages/notFound/NotFound'));
  const Dashboard = lazy(() => import('pages/dashboard/Dashboard'));
  const NotAuthGuard = lazy(() => import('guards/NotAuthGuard'));
  const SupportTableEquipment = lazy(() => import('pages/supportTableEquipment/SupportTableEquipment'));
  const AdminTableEquipmentPage = lazy(() => import('pages/adminTableEquipment/AdminTableEquipmentProvider'));
  const RegisterEquipmentPage = lazy(() => import('pages/registerEquipment/RegisterEquipmentPage'))
  const ViewEquipmentPage = lazy(() => import('pages/viewEquipment/ViewEquipmentPage'))
  const UpdateEquipmentPage = lazy(() => import('pages/updateEquipment/UpdateEquipmentPage'))
  const AdminTablePrinterScannerPage = lazy(() => import('pages/adminTablePrinterScanner/AdminTablePrinterScannerProvider'))
  const RegisterPrinterScannerPage = lazy(() => import('pages/registerPrinterScanner/RegisterPrinterScannerPage'))
  const ViewPrinterScannerPage = lazy(() => import('pages/viewPrinterScanner/ViewPrinterScannerPage'))
  const UpdatePrinterScannerPage = lazy(() => import('pages/updatePrinterScanner/UpdatePrinterScanner'))
  const MaintenancePage = lazy(() => import('pages/maintenance/MaintenanceProvider'));
  const ViewMaintenancePage = lazy(() => import('pages/viewMaintenance/ViewMaintenancePage'))
  const SupportPage = lazy(() => import('pages/support/SupportProvider'))

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
        },
        {
          path: "/equipment",
          element: (
            <SupportGuard
              adminElement={
                <Suspense fallback={
                  <Grid textAlign='center'>
                    <CircularProgress color='primary' />
                  </Grid>
                }>
                  <AdminTableEquipmentPage />
                </Suspense>
              }
              supportElement={
                <Suspense fallback={
                  <Grid textAlign='center'>
                    <CircularProgress color='primary' />
                  </Grid>
                }>
                  <SupportTableEquipment />
                </Suspense>
              }
            />
          ),
        },
        {
          path: "/equipment/register",
          element: (
            <Suspense fallback={
              <Grid textAlign='center'>
                <CircularProgress color='primary' />
              </Grid>
            }>
              <RegisterEquipmentPage />
            </Suspense>
          )
        },
        {
          path: "/equipment/view/:id",
          element: (
            <Suspense fallback={
              <Grid textAlign='center'>
                <CircularProgress color='primary' />
              </Grid>
            }>
              <ViewEquipmentPage />
            </Suspense>
          )
        },
        {
          path: "/equipment/update/:id",
          element: (
            <SupportGuard
              adminElement={
                <Suspense fallback={
                  <Grid textAlign='center'>
                    <CircularProgress color='primary' />
                  </Grid>
                }>
                  <UpdateEquipmentPage />
                </Suspense>
              }
              supportElement={
                <Navigate to='/404' replace />
              }
            />
          )
        },
        {
          path: "/printer-scanner",
          element: (
            <SupportGuard
              adminElement={
                <Suspense fallback={
                  <Grid textAlign='center'>
                    <CircularProgress color='primary' />
                  </Grid>
                }>
                  <AdminTablePrinterScannerPage />
                </Suspense>
              }
              supportElement={
                <Suspense fallback={
                  <Grid textAlign='center'>
                    <CircularProgress color='primary' />
                  </Grid>
                }>
                  <SupportTableEquipment />
                </Suspense>
              }
            />
          )
        },
        {
          path: "/printer-scanner/register",
          element: (
            <Suspense fallback={
              <Grid textAlign='center'>
                <CircularProgress color='primary' />
              </Grid>
            }>
              <RegisterPrinterScannerPage />
            </Suspense>
          )
        },
        {
          path: "/printer-scanner/view/:id",
          element: (
            <Suspense fallback={
              <Grid textAlign='center'>
                <CircularProgress color='primary' />
              </Grid>
            }>
              <ViewPrinterScannerPage />
            </Suspense>
          )
        },
        {
          path: "/printer-scanner/update/:id",
          element: (
            <SupportGuard
              adminElement={
                <Suspense fallback={
                  <Grid textAlign='center'>
                    <CircularProgress color='primary' />
                  </Grid>
                }>
                  <UpdatePrinterScannerPage />
                </Suspense>
              }
              supportElement={
                <Navigate to='/404' replace />
              }
            />
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
              <MaintenancePage />
            </Suspense>
          )
        },
        {
          path: "/maintenance/view/:id",
          element: (
            <Suspense fallback={
              <Grid textAlign='center'>
                <CircularProgress color='primary' />
              </Grid>
            }>
              <ViewMaintenancePage />
            </Suspense>
          )
        },
        {
          path: "/support",
          element: <SupportGuard
            adminElement={
              <Suspense fallback={
                <Grid textAlign='center'>
                  <CircularProgress color='primary' />
                </Grid>
              }>
                <SupportPage />
              </Suspense>
            }
            supportElement={
              <Navigate to='/404' replace />
            }
          />
        },
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



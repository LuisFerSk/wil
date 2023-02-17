import { lazy, Suspense } from 'react'

import { CircularProgress, Grid } from '@mui/material';

import { roles } from "constants";
import { authContext } from "provider/Auth";
import { useContext } from "react";
import { Navigate } from "react-router-dom";

export default function SupportGuard() {
    const _authContext = useContext(authContext)
    const { user } = _authContext;

    const Support = lazy(() => import('pages/support/Support'))

    if (user?.role === roles.administrator) {
        return (
            <Suspense fallback={
                <Grid textAlign='center'>
                    <CircularProgress color='primary' />
                </Grid>
            }>
                <Support />
            </Suspense>
        )
    }

    return <Navigate to='/404' replace />
}
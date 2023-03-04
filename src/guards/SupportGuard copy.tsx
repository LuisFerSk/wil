import { lazy, Suspense } from 'react'
import { Navigate } from "react-router-dom";
import { CircularProgress, Grid } from '@mui/material';
import { useContext } from "react";

import { AuthContext } from "provider/Auth";
import { ROLES } from "constants";

interface Props {
    adminElement: JSX.Element,
    supportElement: JSX.Element
}

export default function SupportGuard(props: Props) {
    const { adminElement, supportElement } = props;
    const authContext = useContext(AuthContext)
    const { user } = authContext;


    const Support = lazy(() => import('pages/support/SupportPage'))

    if (user?.role === ROLES.administrator) {
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

    if (user?.role === ROLES.support) {
        return supportElement;
    }

    return <Navigate to='/404' replace />
}
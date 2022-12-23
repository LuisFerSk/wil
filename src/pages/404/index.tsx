import { Logo } from 'components'

import { Button, Grid, Typography } from '@mui/material'

import { useNavigate } from 'react-router-dom'

export default function NotFound(): JSX.Element {
    const navigate = useNavigate()

    return (
        <Grid
            container
            direction="column"
            justifyContent="center"
            alignItems="center"
            style={{
                minHeight: '100vh',
                backgroundRepeat: 'no-repeat',
                backgroundSize: '100% 100%',
            }}
        >
            <Grid item xs={12} textAlign='center'>
                <Logo height={150} />
            </Grid>
            <Typography variant='h2'>
                404
            </Typography>
            <Typography variant='h2'>
                Pagina no encontrada
            </Typography>
            <Button onClick={() => navigate('/')}>Volver al inicio</Button>
        </Grid >
    )
}
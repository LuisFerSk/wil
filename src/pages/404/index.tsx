import { Logo } from 'components'
import { Button, Grid, Typography } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import { useTheme } from '@mui/material/styles';

export default function NotFound(): JSX.Element {
    const navigate = useNavigate()

    const theme = useTheme()

    return (
        <Grid
            container
            direction="column"
            justifyContent="center"
            alignItems="center"
            spacing={3}
            style={{
                minHeight: '100vh',
                backgroundRepeat: 'no-repeat',
                backgroundSize: '100% 100%',
            }}
        >
            <Grid item xs={12} textAlign='center'>
                <Typography variant='h3'>
                    Lo sentimos, página no encontrada!
                </Typography>

            </Grid>
            <Grid item xs={12} textAlign='center' color={theme.palette.grey[600]}>
                <Typography variant='body1' >
                    Lo sentimos, no pudimos encontrar la página que estás buscando.
                </Typography>
                <Typography variant='body1'>
                    ¿Quizás has escrito mal la URL? Asegúrese de revisar su ortografía.
                </Typography>
            </Grid>
            <Grid item xs={12} textAlign='center'>
                <Logo height={150} />
            </Grid>
            <Grid item xs={12} textAlign='center'>
                <Button variant='contained' onClick={() => navigate('/')}>
                    Volver al inicio
                </Button>
            </Grid>
        </Grid >
    )
}
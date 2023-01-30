import { CircularProgress, Grid } from "@mui/material";

export default function Loader() {
    return (
        <Grid sx={{ height: '100vh' }}
            container
            direction="column"
            justifyContent="center"
            alignItems="center"
        >
            <CircularProgress />
            Cargando
        </Grid>

    )
}
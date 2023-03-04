import { CircularProgress, Grid } from "@mui/material";

interface Props {
    height?: string
}

export default function Loader(props: Props) {
    return (
        <Grid sx={{ height: props?.height || '100vh' }}
            container
            direction="column"
            justifyContent="center"
            alignItems="center"
        >
            <CircularProgress />
        </Grid>
    )
}
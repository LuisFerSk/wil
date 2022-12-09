import { Paper, PaperProps, Typography } from '@mui/material'

interface SeachNotFoundProps extends PaperProps {
    searchQuery?: string
}

function SearchNotFound(props: SeachNotFoundProps): JSX.Element {
    const { searchQuery = '', ...other } = props
    return (
        <Paper {...other}>
            <Typography gutterBottom align='center' variant='subtitle1'>
                No se encontro
            </Typography>
            <Typography variant='body2' align='center'>
                No se encontraron resultados para &nbsp;
                <strong>&quot;{searchQuery}&quot;</strong>. Intente comprobar si hay errores tipográficos o utilice palabras completas.
            </Typography>
        </Paper>
    )
}

export default SearchNotFound;
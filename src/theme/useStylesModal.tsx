import { Theme } from '@mui/material';
import { makeStyles } from '@mui/styles'

const useStylesModal = makeStyles((theme: Theme) => ({
    modal: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    paper: {
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
    },
    close: {
        float: 'right'
    },
}))

export default useStylesModal;
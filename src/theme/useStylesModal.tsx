import { useTheme } from '@mui/material/styles';
import { makeStyles } from '@mui/styles'

const useStylesModal = makeStyles(() => {
    const theme = useTheme()
    return {
        modal: {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
        },
        paper: {
            boxShadow: theme.shadows[5],
            padding: theme.spacing(2, 4, 3),
            maxHeight: '90vh',
            overflow: 'auto',
        },
        close: {
            float: 'right'
        },


    }
})

export default useStylesModal;
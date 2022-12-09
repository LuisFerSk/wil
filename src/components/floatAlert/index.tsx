import { Snackbar, Alert, AlertColor } from '@mui/material'

interface FloatAlertProps {
    children: JSX.Element,
    isOpen: boolean,
    close: () => void,
    severity: AlertColor
}

function FloatAlert(props: FloatAlertProps): JSX.Element {
    const { children, isOpen, close, severity } = props
    return (
        <Snackbar
            open={isOpen}
            onClose={close}
            autoHideDuration={3000}
            anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'center'
            }}>
            <Alert elevation={6} variant='filled' onClose={close} severity={severity}>
                {children}
            </Alert>
        </Snackbar>
    )
}

export default FloatAlert;

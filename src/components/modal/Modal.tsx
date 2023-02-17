import { Icon } from '@iconify/react';
import closeIcon from '@iconify/icons-mdi/close';
import { Modal as MaterialModal, IconButton, Grid, Typography, Paper } from '@mui/material'
import useStylesModal from 'theme/useStylesModal';

interface Props {
    isOpen: boolean
    onClose: () => void
    title: string | null
    children: JSX.Element | null
}

export default function Modal(props: Props) {
    const { isOpen, onClose, title, children } = props

    const classes = useStylesModal()

    return (
        <Grid container spacing={3}>
            <MaterialModal
                open={isOpen}
                onClose={close}
                className={classes.modal}
                aria-labelledby='simple-modal-title'
                aria-describedby='simple-modal-description'
            >
                <Grid item xs={11} md={11} sm={10} lg={10}>
                    <Paper className={classes.paper}>
                        <div id='simple-modal-title' >
                            <Typography variant='h6'>
                                {title}
                                <IconButton
                                    className={classes.close}
                                    onClick={onClose}
                                    color='error'
                                    aria-label='close'
                                >
                                    <Icon icon={closeIcon} />
                                </IconButton>
                            </Typography>
                        </div>
                        <Grid item xs={12} id='simple-modal-description'>
                            {children}
                        </Grid>
                    </Paper>
                </Grid>
            </MaterialModal>
        </Grid>
    )
}

import { Icon } from '@iconify/react';
import closeIcon from '@iconify/icons-mdi/close';
import { Card, Modal as MaterialModal, IconButton, Grid, Typography } from '@mui/material'

import useStyles from '../../theme/useStylesModal'

interface ModalProps {
    isOpen: boolean
    onClose: () => void
    title: string | null
    children: JSX.Element | null
}

export default function Modal(props: ModalProps): JSX.Element {
    const { isOpen, onClose, title, children } = props

    const classes = useStyles()

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
                    <Card className={classes.paper} sx={{ maxHeight: '90vh', overflow: 'auto' }}>
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
                        <Grid
                            item
                            xs={12}
                            md={12}
                            sm={12}
                            lg={12}
                            id='simple-modal-description'
                        >
                            {children}
                        </Grid>
                    </Card>
                </Grid>
            </MaterialModal>
        </Grid>
    )
}

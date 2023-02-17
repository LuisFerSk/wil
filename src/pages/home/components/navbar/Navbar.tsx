import { lazy, Suspense } from 'react'

import { Icon } from '@iconify/react'
import menu2Fill from '@iconify/icons-eva/menu-2-fill'
import { Box, Stack, IconButton, Grid, CircularProgress } from '@mui/material'

import AccountPopover from '../accountPopover/AccountPopover'
import { MHidden, Modal } from 'components'
import { RootStyleNavbar, ToolbarStyle } from './style'
import { useFloat } from 'hooks'

interface Props {
    onOpenSidebar: () => void
}

export default function Navbar(props: Props) {
    const { onOpenSidebar } = props;

    const modalState = useFloat({ initialState: false })

    const ChangePassword = lazy(() => import('components/changePassword/ChangePassword'))

    return (
        <RootStyleNavbar>
            <ToolbarStyle>
                <MHidden width='lgUp'>
                    <IconButton onClick={onOpenSidebar} sx={{ mr: 1, color: 'text.primary' }}>
                        <Icon icon={menu2Fill} />
                    </IconButton>
                </MHidden>
                <Box sx={{ flexGrow: 1 }} />
                <Stack direction='row' alignItems='center' spacing={{ xs: 0.5, sm: 1.5 }}>
                    <AccountPopover openModal={modalState.open} />
                </Stack>
            </ToolbarStyle>
            <Modal title={'Modificar mi contraseña'} isOpen={modalState.isOpen} onClose={modalState.close}>
                <Suspense fallback={
                    <Grid textAlign='center'>
                        <CircularProgress color='primary' />
                    </Grid>
                }>
                    <ChangePassword />
                </Suspense>
            </Modal>
        </RootStyleNavbar>
    )
}
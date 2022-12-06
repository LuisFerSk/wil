import { Icon } from '@iconify/react'
import menu2Fill from '@iconify/icons-eva/menu-2-fill'
import { Box, Stack, IconButton } from '@mui/material'

import AccountPopover from '../accountPopover'
import { MHidden, Modal } from 'components'
import { RootStyle, ToolbarStyle } from './style'
import ChangeMePassword from 'screens/user/changeMePassword'
import { useFloat } from 'hooks'


interface NavbarProps {
    onOpenSidebar: () => void
}

export default function Navbar(props: NavbarProps): JSX.Element {
    const { onOpenSidebar } = props;

    const modalState = useFloat({ initialState: false })

    return (
        <>
            <RootStyle>
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
            </RootStyle>
            <Modal title={'Modificar Contraseña'} isOpen={modalState.isOpen} onClose={modalState.close}>
                <></>
            </Modal>
        </>
    )
}
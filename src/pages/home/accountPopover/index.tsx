import { useContext, useRef, useState } from 'react'

import { Icon, IconifyIcon } from '@iconify/react'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Button, Box, MenuItem, Typography, Grid } from '@mui/material'

import { MenuPopover } from 'components'
import formTextboxPassword from '@iconify/icons-mdi/form-textbox-password';
import { authContext } from 'provider/Auth';

type MenuOption = {
    label: string
    icon: IconifyIcon
}[]

const MENU_OPTIONS: MenuOption = [
    {
        label: 'Actualizar Contraseña',
        icon: formTextboxPassword,
    }
]

interface AccountPopoverProps {
    openModal: Function
}

export default function AccountPopover(props: AccountPopoverProps): JSX.Element {
    const { openModal } = props;

    const anchorRef = useRef(null)
    const [open, setOpen] = useState(false)

    const authsContext = useContext(authContext)
    const { user, logout } = authsContext;

    function handleOpen() {
        setOpen(true)
    }
    function handleClose() {
        setOpen(false)
    }

    return (
        <>
            <Button
                ref={anchorRef}
                onClick={handleOpen}
                sx={{
                    padding: 2,
                    height: 44,
                }}
            >
                <Grid container justifyContent="flex-end" maxHeight={60}>
                    <Typography variant='subtitle1' noWrap>
                        {user}
                    </Typography>
                    <ExpandMoreIcon />
                </Grid>
            </Button>
            <MenuPopover
                open={open}
                onClose={handleClose}
                anchorEl={anchorRef.current}
                sx={{ width: 220 }}
            >
                {MENU_OPTIONS.map((option) => (
                    <MenuItem
                        key={option.label}
                        onClick={handleClose}
                    >
                        <Grid
                            container
                            onClick={() => openModal()}
                            sx={{ typography: 'body2', py: 2 }}
                        >
                            <Box
                                component={Icon}
                                icon={option.icon}
                                sx={{
                                    mr: 2,
                                    width: 24,
                                    height: 24,
                                }}
                            />
                            {option.label}
                        </Grid>
                    </MenuItem>
                ))}
                <Box sx={{ p: 2, pt: 1.5 }}>
                    <Button
                        fullWidth
                        color='inherit'
                        variant='outlined'
                        onClick={() => {
                            logout()
                        }}
                    >
                        Cerrar sesión
                    </Button>
                </Box>
            </MenuPopover>
        </>
    )
}
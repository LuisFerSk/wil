import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { Box, Drawer } from '@mui/material'

import { Logo, Scrollbar, NavSection, MHidden } from 'components'
import { sidebarConfigAdministrador } from './SidebarConfig'
import { DRAWER_WIDTH, RootStyle } from './style'

interface SidebarProps {
    isOpenSidebar: boolean
    onCloseSidebar: () => void
}

export default function Sidebar(props: SidebarProps): JSX.Element {
    const { isOpenSidebar, onCloseSidebar } = props

    const { pathname } = useLocation()

    useEffect(() => {
        if (isOpenSidebar) {
            onCloseSidebar()
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [pathname])

    const renderContent = (
        <Scrollbar
            sx={{
                height: '100%',
                '& .simplebar-content': { height: '100%', display: 'flex', flexDirection: 'column' }
            }}
        >
            <Box sx={{ px: 2.5, py: 3 }} textAlign="center">
                <Box sx={{ display: 'inline-flex' }}>
                    <Logo />
                </Box>
            </Box>
            <NavSection marginTop={5} navConfig={sidebarConfigAdministrador} />
            <Box sx={{ flexGrow: 1 }} />
        </Scrollbar>
    )

    return (
        <RootStyle>
            <MHidden width='lgUp'>
                <Drawer
                    open={isOpenSidebar}
                    onClose={onCloseSidebar}
                    PaperProps={{
                        sx: { width: DRAWER_WIDTH }
                    }}
                >
                    {renderContent}
                </Drawer>
            </MHidden>
            <MHidden width='lgDown'>
                <Drawer
                    open
                    variant='persistent'
                    PaperProps={{
                        sx: {
                            width: DRAWER_WIDTH,
                            bgcolor: 'background.default'
                        }
                    }}
                >
                    {renderContent}
                </Drawer>
            </MHidden>
        </RootStyle>
    )
}
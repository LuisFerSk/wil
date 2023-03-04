import { useContext, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { Box, Drawer, useTheme } from '@mui/material'

import { Logo, Scrollbar, NavSection, MHidden } from 'components'
import { sidebarConfigSupport, sidebarConfigAdministrator } from './SidebarConfig'
import { DRAWER_WIDTH, RootStyleSidebar } from './style'
import { AuthContext } from 'provider/Auth'
import { ROLES } from 'constants'

interface Props {
    isOpenSidebar: boolean
    onCloseSidebar: () => void
}

export default function Sidebar(props: Props) {
    const { isOpenSidebar, onCloseSidebar } = props

    const { pathname } = useLocation()

    const authContext = useContext(AuthContext)
    const { user } = authContext;

    const theme = useTheme()

    function getNavConfig() {
        if (user?.role === ROLES.administrator) {
            return sidebarConfigAdministrator
        }

        if (user?.role === ROLES.support) {
            return sidebarConfigSupport
        }

        return []
    }

    useEffect(() => {
        if (isOpenSidebar) {
            onCloseSidebar()
        }
    }, [pathname])

    const renderContent = (
        <Scrollbar
            sx={{
                height: '100%',
                '& .simplebar-content': { height: '100%', display: 'flex', flexDirection: 'column' },
            }}
        >
            <Box sx={{ px: 2.5, py: 3 }} textAlign="center">
                <Box sx={{ display: 'inline-flex' }}>
                    <Logo />
                </Box>
            </Box>
            <NavSection marginTop={5} navConfig={getNavConfig()} />
            <Box sx={{ flexGrow: 1 }} />
        </Scrollbar>
    )

    return (
        <RootStyleSidebar>
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
                            bgcolor: theme.palette.grey[100]
                        }
                    }}
                >
                    {renderContent}
                </Drawer>
            </MHidden>
        </RootStyleSidebar>
    )
}
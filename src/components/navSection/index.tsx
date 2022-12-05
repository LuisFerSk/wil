import { matchPath, useLocation } from 'react-router-dom'
import { Box, List } from '@mui/material'
import { SidebarConfigInterface } from 'interfaces'
import { BoxProps } from '@mui/system'
import NavItem from './navItem'

interface NavSectionProps extends BoxProps {
    navConfig: SidebarConfigInterface
}

export default function NavSection(props: NavSectionProps): JSX.Element {
    const { navConfig, ...other } = props;
    const { pathname } = useLocation()
    const match = (path: string) => (path ? !!matchPath({ path, end: false }, pathname) : false)

    return (
        <Box {...other}>
            <List disablePadding>
                {navConfig.map(item => (
                    <NavItem key={item.title} item={item} active={match} />
                ))}
            </List>
        </Box>
    )
}
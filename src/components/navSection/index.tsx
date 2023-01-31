import { matchPath, useLocation } from 'react-router-dom'
import { Box, List } from '@mui/material'
import { BoxProps } from '@mui/system'
import NavItem from './navItem'
import { ItemSidebarProps } from 'interfaces'

interface Props extends BoxProps {
    navConfig: ItemSidebarProps[]
}

export default function NavSection(props: Props) {
    const { navConfig, ...other } = props;
    const { pathname } = useLocation()

    function match(path: string) {
        return path ? !!matchPath({ path, end: false }, pathname) : false;
    }

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
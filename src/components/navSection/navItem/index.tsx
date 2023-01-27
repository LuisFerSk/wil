import { useState } from 'react'
import { Icon } from '@iconify/react'
import { alpha, useTheme } from '@mui/material/styles'
import arrowIosForwardFill from '@iconify/icons-eva/arrow-ios-forward-fill'
import arrowIosDownwardFill from '@iconify/icons-eva/arrow-ios-downward-fill'
import { NavLink as RouterLink } from 'react-router-dom'
import { Box, Collapse, List, ListItemText } from '@mui/material'
import { ItemSidebarProps } from 'interfaces'
import { activeSubStyle, ListItemIconStyle, ListItemStyle } from './style'

interface NavItemProps {
    item: ItemSidebarProps
    active: (path: string) => boolean
}

function NavItem(props: NavItemProps): JSX.Element {
    const { item, active } = props
    const theme = useTheme()
    const isActiveRoot = active(item.path)
    const [open, setOpen] = useState<boolean>(isActiveRoot)
    const { title, path, icon, info, children } = item;

    const handleOpen = () => {
        setOpen(prev => !prev)
    }

    const activeRootStyle = {
        color: 'primary.main',
        fontWeight: 'fontWeightMedium',
        bgcolor: alpha(theme.palette.primary.main, theme.palette.action.selectedOpacity),
        '&:before': { display: 'block' },
    }

    if (children) {
        return (
            <>
                <ListItemStyle
                    onClick={handleOpen}
                    sx={{
                        ...(isActiveRoot ? activeRootStyle : undefined)
                    }}
                >
                    <ListItemIconStyle>{icon ? icon : null}</ListItemIconStyle>
                    <ListItemText disableTypography primary={title} />
                    {info ? info : null}
                    <Box
                        component={Icon}
                        icon={open ? arrowIosDownwardFill : arrowIosForwardFill}
                        sx={{ width: 16, height: 16, ml: 1 }}
                    />
                </ListItemStyle>

                <Collapse in={open} timeout='auto' unmountOnExit>
                    <List component='div' disablePadding>
                        {children.map(rowChildren => {
                            const isActiveSub = active(rowChildren.path)

                            return (
                                <ListItemStyle
                                    to={rowChildren.path}
                                    component={RouterLink}
                                    key={rowChildren.title}
                                    sx={{
                                        ...(isActiveSub ? activeSubStyle : undefined)
                                    }}
                                >
                                    <ListItemIconStyle>
                                        <Box
                                            component='span'
                                            sx={{
                                                width: 4,
                                                height: 4,
                                                display: 'flex',
                                                borderRadius: '50%',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                bgcolor: 'text.disabled',
                                                transition: themeTransition => themeTransition.transitions.create('transform'),
                                                ...(isActiveSub && {
                                                    transform: 'scale(2)',
                                                    bgcolor: 'primary.main',
                                                })
                                            }}
                                        />
                                    </ListItemIconStyle>
                                    <ListItemText disableTypography primary={rowChildren.title} />
                                </ListItemStyle>
                            )
                        })}
                    </List>
                </Collapse>
            </>
        )
    }

    return (
        <ListItemStyle
            component={RouterLink}
            to={path}
            sx={{
                ...(isActiveRoot ? activeRootStyle : null)
            }}
        >
            <ListItemIconStyle>{icon ? icon : null}</ListItemIconStyle>
            <ListItemText disableTypography primary={title} />
            {info ? info : null}
        </ListItemStyle>
    )
}

export default NavItem
import { Icon, IconifyIcon } from '@iconify/react'
import personFill from '@iconify/icons-eva/person-fill'
import homeIcon from '@iconify/icons-material-symbols/home';
import personSupport24Filled from '@iconify/icons-fluent/person-support-24-filled';
import scheduledMaintenance from '@iconify/icons-mdi/scheduled-maintenance';
import DesktopWindowsIcon from '@mui/icons-material/DesktopWindows';

import { SidebarConfigInterface } from 'interfaces'

function getIcon(name: IconifyIcon) {
    return (
        <Icon icon={name} width={22} height={22} />
    )
}

export const sidebarConfigUser: SidebarConfigInterface = [
    {
        title: 'Home',
        path: '/home',
        icon: getIcon(homeIcon),
    },
    {
        title: 'Equipos',
        path: '/equipment',
        icon: <DesktopWindowsIcon />,
    },
    {
        title: 'Usuarios',
        path: '/user',
        icon: getIcon(personFill),
    },
    {
        title: 'Mantenimientos',
        path: '/maintenance',
        icon: getIcon(scheduledMaintenance),
    },
]

export const sidebarConfigAdministrador: SidebarConfigInterface = [
    ...sidebarConfigUser,
    {
        title: 'Soportes',
        path: '/support',
        icon: getIcon(personSupport24Filled),
    }
]

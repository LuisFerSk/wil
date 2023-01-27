import { Icon, IconifyIcon } from '@iconify/react'
import printerIcon from '@iconify/icons-mdi/printer';
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

export const sidebarConfigSupport: SidebarConfigInterface = [
    {
        title: 'Home',
        path: '/home',
        icon: getIcon(homeIcon),
    },
    {
        title: 'Impresoras y scanners',
        path: '/printer-scanner',
        icon: getIcon(printerIcon),
    },
    {
        title: 'Equipos',
        path: '/equipment',
        icon: <DesktopWindowsIcon />,
    },
    {
        title: 'Mantenimientos',
        path: '/maintenance',
        icon: getIcon(scheduledMaintenance),
    },
]

export const sidebarConfigAdministrator: SidebarConfigInterface = [
    ...sidebarConfigSupport,
    {
        title: 'Soportes',
        path: '/support',
        icon: getIcon(personSupport24Filled),
    }
]

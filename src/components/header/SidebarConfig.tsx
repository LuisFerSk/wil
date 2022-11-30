import { Icon, IconifyIcon } from '@iconify/react'
import personFill from '@iconify/icons-eva/person-fill'
import pieChart2Fill from '@iconify/icons-eva/pie-chart-2-fill'
import tvUsb16Filled from '@iconify/icons-fluent/tv-usb-16-filled'

import AssignmentIndIcon from '@mui/icons-material/AssignmentInd';
import DesktopWindowsIcon from '@mui/icons-material/DesktopWindows';

import { SidebarConfigInterface } from 'interfaces'

function getIcon(name: IconifyIcon) {
    return (
        <Icon icon={name} width={22} height={22} />
    )
}

export const sidebarConfigUser: SidebarConfigInterface = [
    {
        title: 'Dashboard',
        path: '/dashboard/app',
        icon: getIcon(pieChart2Fill),
    },
    {
        title: 'Funcionarios',
        path: '/dashboard/funcionarios',
        icon: <AssignmentIndIcon />,
    },
    {
        title: 'Equipos',
        path: '/dashboard/equipos',
        icon: <DesktopWindowsIcon />,
    },
    {
        title: 'Periféricos',
        path: '/dashboard/periferico',
        icon: getIcon(tvUsb16Filled),
    },
]

export const sidebarConfigAdministrador: SidebarConfigInterface = [
    ...sidebarConfigUser,
    {
        title: 'Usuarios',
        path: '/dashboard/usuarios',
        icon: getIcon(personFill),
    }
]

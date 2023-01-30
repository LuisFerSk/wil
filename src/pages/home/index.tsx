import { useState } from 'react'
import { styled } from '@mui/material/styles'
import { Outlet } from 'react-router-dom'
import Navbar from './navbar'
import Sidebar from './sidebar'

const RootStyle = styled('div')({
    display: 'flex',
    minHeight: '100%',
    overflow: 'hidden'
})

const MainStyle = styled('div')(({ theme }) => ({
    flexGrow: 1,
    overflow: 'auto',
    minHeight: '100%',
    paddingTop: 88,
    paddingBottom: theme.spacing(10),
    backgroundColor: theme.palette.grey[100],
    [theme.breakpoints.up('lg')]: {
        paddingTop: 116,
        paddingLeft: theme.spacing(2),
        paddingRight: theme.spacing(2)
    }
}))

export default function Home() {
    const [open, setOpen] = useState<boolean>(false)

    return (
        <RootStyle>
            <Navbar onOpenSidebar={() => setOpen(true)} />
            <Sidebar isOpenSidebar={open} onCloseSidebar={() => setOpen(false)} />
            <MainStyle>
                <Outlet />
            </MainStyle>
        </RootStyle>
    )
}
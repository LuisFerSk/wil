import { alpha, AppBar, Toolbar } from "@mui/material";
import { styled } from '@mui/material/styles'

const APPBAR_MOBILE = 64;

export const RootStyle = styled(AppBar)(({ theme }) => ({
    boxShadow: 'none',
    backdropFilter: 'blur(6px)',
    WebkitBackdropFilter: 'blur(6px)', // Fix on Mobile
    backgroundColor: alpha('#fff', 0.72),

}))

export const ToolbarStyle = styled(Toolbar)(({ theme }) => ({
    minHeight: APPBAR_MOBILE,
}))
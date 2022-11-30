import { Box } from "@mui/material"
import ImgLogo from 'assets/logo.png'

interface LogoProps {
    height?: number
    width?: number
}

function Logo(props: LogoProps) {
    const { height = 50, width } = props;
    return (
        <Box component='img' src={ImgLogo} sx={{ height, width }} />
    )
}

export default Logo
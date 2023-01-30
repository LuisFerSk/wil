import { Box } from "@mui/material"
import ImgLogo from 'assets/logo.png'

interface Props {
    height?: number
    width?: number
}

export default function Logo(props: Props) {
    const { height = 50, width } = props;
    return (
        <Box component='img' src={ImgLogo} sx={{ height, width }} />
    )
}
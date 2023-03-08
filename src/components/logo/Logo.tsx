import { Box } from "@mui/material"
import ImgLogo from 'assets/logo.png'

interface Props {
    height?: number
    width?: number
}

export default function Logo(props: Props) {
    const { height = 50, width } = props;
    return (
        <Box
            title="logo de Coopocesar"
            alt="logo de Coopocesar"
            component='img'
            src={ImgLogo}
            width={width}
            height={height}
        />
    )
}
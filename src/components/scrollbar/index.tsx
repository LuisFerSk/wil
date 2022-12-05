import { Box, BoxProps } from '@mui/material'
import { RootStyle, SimpleBarStyle } from './style'

export default function Scrollbar(props: BoxProps): JSX.Element {
    const { children, sx, ...rest } = props

    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
        navigator.userAgent
    )

    if (isMobile) {
        return (
            <Box sx={{ overflowX: 'auto', ...sx }} {...rest}>
                {children}
            </Box>
        )
    }

    return (
        <RootStyle>
            <SimpleBarStyle timeout={500} clickOnTrack={false} sx={sx} {...rest}>
                {children}
            </SimpleBarStyle>
        </RootStyle>
    )
}
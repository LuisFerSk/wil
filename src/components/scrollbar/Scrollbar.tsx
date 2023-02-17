import { Box, BoxProps } from '@mui/material'

export default function Scrollbar(props: BoxProps) {
    const { children, sx, ...rest } = props

    return (
        <Box sx={{ overflowX: 'auto', ...sx }} {...rest}>
            {children}
        </Box>
    )
}
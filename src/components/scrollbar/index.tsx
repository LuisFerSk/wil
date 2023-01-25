import { Box } from '@mui/material'

export default function Scrollbar(props: any): JSX.Element {
    const { children, sx, ...rest } = props

    return (
        <Box sx={{ overflowX: 'auto', ...sx }} {...rest}>
            {children}
        </Box>
    )
}
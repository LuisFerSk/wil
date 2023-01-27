import { Popover, PopoverProps } from '@mui/material'
import { ArrowStyle } from './style'

export default function MenuPopover({ children, sx, ...other }: PopoverProps): JSX.Element {
    return (
        <Popover
            anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
            transformOrigin={{ vertical: 'top', horizontal: 'right' }}
            PaperProps={{
                sx: {
                    mt: 1.5,
                    ml: 0.5,
                    overflow: 'inherit',
                    width: 200,
                    ...sx,
                }
            }}
            {...other}
        >
            <ArrowStyle className='arrow' />
            {children}
        </Popover>
    )
}

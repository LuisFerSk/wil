import { Breakpoint, useMediaQuery } from '@mui/material'
import { Theme } from '@mui/material/styles';

interface MHiddenProps {
    width: 'xsDown' | 'smDown' | 'mdDown' | 'lgDown' | 'xlDown' | 'xsUp' | 'smUp' | 'mdUp' | 'lgUp' | 'xlUp';
    children: JSX.Element;
}

function getBreakpoint(width: MHiddenProps['width']): Breakpoint {
    return width.substring(0, 2) as Breakpoint;
}

function MHidden(props: MHiddenProps): JSX.Element | null {
    const { width, children } = props
    const breakpoint: Breakpoint = getBreakpoint(width)

    const hiddenUp = useMediaQuery((theme: Theme) => theme.breakpoints.up(breakpoint))
    const hiddenDown = useMediaQuery((theme: Theme) => theme.breakpoints.down(breakpoint))

    if (width.includes('Down')) {
        return hiddenDown ? null : children;
    }

    if (width.includes('Up')) {
        return hiddenUp ? null : children;
    }

    return null;
}

export default MHidden;
import { Breakpoint, useMediaQuery } from '@mui/material'
import { Theme } from '@mui/material/styles';

interface Props {
    width: 'xsDown' | 'smDown' | 'mdDown' | 'lgDown' | 'xlDown' | 'xsUp' | 'smUp' | 'mdUp' | 'lgUp' | 'xlUp';
    children: JSX.Element;
}

function getBreakpoint(width: Props['width']) {
    return width.substring(0, 2) as Breakpoint;
}

export default function MHidden(props: Props) {
    const { width, children } = props
    const breakpoint = getBreakpoint(width)

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
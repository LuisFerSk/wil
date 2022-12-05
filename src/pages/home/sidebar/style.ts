import styled from "@emotion/styled";

export const DRAWER_WIDTH = 280;

export const RootStyle = styled('div')(({ theme }: any) => ({
    [theme.breakpoints.up('lg')]: {
        flexShrink: 0,
        width: DRAWER_WIDTH
    }
}))

export const AccountStyle = styled('div')(({ theme }: any) => ({
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(2, 2.5),
    borderRadius: theme.shape.borderRadiusSm,
    backgroundColor: theme.palette.grey[200]
}))
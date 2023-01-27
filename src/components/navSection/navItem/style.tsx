import { styled } from '@mui/material/styles'
import { ListItemIcon, ListItemButton } from '@mui/material'

export const ListItemStyle = styled((props: any) => <ListItemButton disableGutters {...props} />)(({ theme }) => ({
    height: 48,
    position: 'relative',
    textTransform: 'capitalize',
    paddingLeft: theme.spacing(5),
    paddingRight: theme.spacing(2.5),
    color: theme.palette.text.secondary,
    '&:before': {
        top: 0,
        right: 0,
        width: 3,
        bottom: 0,
        content: '""',
        display: 'none',
        position: 'absolute',
        borderTopLeftRadius: 4,
        borderBottomLeftRadius: 4,
        backgroundColor: theme.palette.primary.main,
    }
}))

export const ListItemIconStyle = styled(ListItemIcon)({
    width: 22,
    height: 22,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
}) as typeof ListItemIcon;

export const activeSubStyle = {
    color: 'text.primary',
    fontWeight: 'fontWeightMedium',
}
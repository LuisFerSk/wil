import { Theme } from '@mui/material';
import { makeStyles } from '@mui/styles'

const useStylesAccordion = makeStyles((theme: Theme) => ({
    root: {
        width: '100%'
    },
    heading: {
        fontSize: theme.typography.pxToRem(15),
        flexBasis: '33.33%',
        flexShrink: 0,
        paddingLeft: theme.spacing(2),
    },
    secondaryHeading: {
        fontSize: theme.typography.pxToRem(15),
        color: theme.palette.text.secondary,
    },
}));

export default useStylesAccordion;

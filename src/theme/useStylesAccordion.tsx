import { useTheme } from '@mui/material/styles';
import { makeStyles } from '@mui/styles'

const useStylesAccordion = makeStyles(() => {
    const theme = useTheme();
    return {
        root: {
            width: '100%'
        },
        heading: {
            fontSize: theme.typography.pxToRem(15),
            flexBasis: '80%',
            flexShrink: 0,
            paddingLeft: theme.spacing(2),
        }
    }
});

export default useStylesAccordion;

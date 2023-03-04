import { Button, ButtonProps, Grid } from "@mui/material"

interface Props extends ButtonProps {
    message: string;
}

export default function TryAgain(props: Props) {
    const { message, ...rest } = props;

    return (
        <Grid container alignItems='center' textAlign='center'>
            <Grid item xs={12}>
                {message}
            </Grid>
            <Grid item xs={12}>
                <Button {...rest} />
            </Grid>
        </Grid>
    )
}
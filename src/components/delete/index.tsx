import * as Yup from 'yup'
import { useFormik, Form, FormikProvider } from 'formik'
import { Grid, TextField, Button } from '@mui/material'

import DeleteIcon from '@mui/icons-material/Delete'
import { IdType, StateMessage } from 'interfaces'

interface Props {
    value: IdType
    messageError: string
    label: string
    onSubmitFormik: Function
    children: React.ReactNode
    message: StateMessage
}

export default function Delete(props: Props) {
    const { children, onSubmitFormik, label, messageError, value, message } = props;

    const formik = useFormik({
        initialValues: { value: '' },
        onSubmit: () => onSubmitFormik(),
        validationSchema: Yup.object().shape({
            value: Yup.string().test('len', messageError, confirm => confirm === value)
        }),

    })

    const { errors, touched, handleSubmit, getFieldProps } = formik;

    return (
        <FormikProvider value={formik}>
            <Form noValidate autoComplete='off' onSubmit={handleSubmit}>
                <Grid container spacing={3}>
                    <Grid item xs={12} md={12} sm={12} lg={12}>
                        {children}
                    </Grid>
                    <Grid item xs={12} md={12} sm={12} lg={12}>
                        <TextField
                            fullWidth
                            label={label}
                            variant='outlined'
                            {...getFieldProps('value')}
                            helperText={touched.value && errors.value}
                            error={Boolean(touched.value && errors.value)}
                        />
                    </Grid>
                    <Grid item xs={12} md={12} sm={12} lg={12}>
                        <Button
                            fullWidth
                            type='submit'
                            color='error'
                            variant='outlined'
                            startIcon={<DeleteIcon />}
                        >
                            Eliminar
                        </Button>
                    </Grid>
                    <Grid item xs={12} textAlign='center'>
                        {message}
                    </Grid>
                </Grid>
            </Form>
        </FormikProvider>
    )
}

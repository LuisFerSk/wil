import { FormikProvider, Form as Formik, FormikContextType } from 'formik'

interface Props {
    children: React.ReactNode
    formik: FormikContextType<any>
}

export default function Form(props: Props) {
    const { children, formik } = props
    const { handleSubmit } = formik

    return (
        <FormikProvider value={formik}>
            <Formik autoComplete='off' onSubmit={handleSubmit}>
                {children}
            </Formik>
        </FormikProvider>
    )
}
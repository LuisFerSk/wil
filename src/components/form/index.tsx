import { FormikProvider, Form as Formik, FormikContextType } from 'formik'

interface FormProps {
    children: React.ReactNode
    formik: FormikContextType<any>
}

export default function Form(props: FormProps) {
    const { children, formik } = props
    const { handleSubmit } = formik

    return (
        <FormikProvider value={formik}>
            <Formik autoComplete='on' onSubmit={handleSubmit}>
                {children}
            </Formik>
        </FormikProvider>
    )
}
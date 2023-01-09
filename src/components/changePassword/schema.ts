import { object, string } from 'yup'

export const changePasswordSchema = object().shape({
    password: string()
        .required('La contraseña es requerida.'),
    confirmarPassword: string()
        .when(
            'password', (password, schema) =>
            schema.test({
                test: (confirmarPassword: string) => {
                    return !!confirmarPassword && confirmarPassword === password
                },
                message: 'Las contraseñas no coinciden.'
            })
        )
        .required('Es necesario confirmar la contraseña.'),
})

export const changePasswordInitialValues = {
    password: '',
    confirmarPassword: '',
}
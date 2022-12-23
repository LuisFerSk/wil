import { object, string } from 'yup'

export const supportSchema = object().shape({
    username: string()
    .test('len', 'El nombre de usuario debe tener de 5 a 50 caracteres.', value => {
        if (value !== undefined) {
            const valueLength = value.replace(/\s+/g, '').length
            return valueLength >= 5 && valueLength <= 50
        }
        return false;
    })
    .required('El nombre de usuario es requerido.'),
    password: string()
    .test('len', 'La contraseña del usuario debe tener de 8 a 50 caracteres.', value => {
        if (value !== undefined) {
            const valueLength = value.replace(/\s+/g, '').length
            return valueLength >= 8 && valueLength <= 50
        }
        return false;
    })
    .required('Password es requerido.'),
})

export const supportInitialValues = {
    username: '',
    password: ''
}

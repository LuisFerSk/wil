import { object, string } from 'yup'

export const userSchema = object().shape({
    name: string()
        .test('len', 'El nombre de usuario debe tener entre 5 a 50 caracteres.', value => {
            if (value !== undefined) {
                const valueLength = value.replace(/\s+/g, '').length;
                return valueLength >= 5 && valueLength <= 50
            }
            return false;
        })
        .required('El nombre de usuario es requerido.'),
    cc: string()
        .test('len', 'La cédula debe contener solo números.', value => {
            if (value !== undefined) {
                return /^[0-9]+$/.test(value)
            }
            return false
        })
        .test('len', 'La cédula del usuario debe tener entre 7 a 11 dígitos.', value => {
            if (value !== undefined) {
                const valueLength = value.replace(/\s+/g, '').length;
                return valueLength >= 7 && valueLength <= 11
            }
            return false;
        })
        .required('La cédula es requerida.'),
    phone: string()
        .test('len', 'El número de teléfono debe contener solo números.', value => {
            if (value !== undefined) {
                return /^[0-9]+$/.test(value)
            }
            return false
        })
        .test('len', 'El número de teléfono debe tener entre 7 a 10 dígitos.', value => {
            if (value !== undefined) {
                const valueLength = value.replace(/\s+/g, '').length;
                return valueLength >= 7 && valueLength <= 10
            }
            return false;
        })
        .required('El número de teléfono es requerido.'),
})
export const userInitialValues = {
    name: '',
    cc: '',
    phone: '',
}

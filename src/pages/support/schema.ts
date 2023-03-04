import { object, string } from 'yup'

export const supportSchema = object().shape({
    username: string()
        .min(5, 'El nombre de usuario debe tener de 5 a 50 caracteres.')
        .max(50, 'El nombre de usuario debe tener de 5 a 50 caracteres.')
        .required('El nombre de usuario es requerido.'),
    password: string()
        .min(8, 'La contraseña del usuario debe tener de 8 a 50 caracteres.')
        .max(50, 'La contraseña del usuario debe tener de 8 a 50 caracteres.')
        .required('Password es requerido.'),
})
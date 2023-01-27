import { object, string } from 'yup'

export const loginSchema = object().shape({
  password: string().required('La contraseña es requerida'),
  username: string().required('El nombre de usuario es requerido'),
})

export const loginInitialValues = {
  password: '',
  username: '',
}

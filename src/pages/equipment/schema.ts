import { number, object, string } from 'yup'

export const equipmentSchema = object().shape({
    type: string()
        .test('len', 'El tipo de equipo debe tener entre 3 a 25 caracteres.', value => {
            if (value !== undefined) {
                const valueLength = value.replace(/\s+/g, '').length
                return valueLength >= 3 && valueLength <= 25
            }
            return false;
        })
        .required('El tipo de equipo es requerido.'),
    brand: string()
        .test('len', 'La marca del equipo debe tener entre 2 a 25 caracteres.', value => {
            if (value !== undefined) {
                const valueLength = value.replace(/\s+/g, '').length
                return valueLength >= 2 && valueLength <= 25
            }
            return false;
        })
        .required('La marca es requerida.'),
    model: string()
        .test('len', 'El modelo del equipo debe tener entre 2 a 25 caracteres.', value => {
            if (value !== undefined) {
                const valueLength = value.replace(/\s+/g, '').length
                return valueLength >= 2 && valueLength <= 25
            }
            return false;
        })
        .required('El modelo del equipo es requerido.'),
    serial: string()
        .test('len', 'El numero serial del equipo debe tener entre 3 a 25 caracteres.', value => {
            if (value !== undefined) {
                const valueLength = value.replace(/\s+/g, '').length
                return valueLength >= 3 && valueLength <= 25
            }
            return false;
        })
        .required('El numero serial del equipo es requerido.'),
    monitor_serial: string()
        .test('len', 'El numero serial del monitor del equipo debe tener entre 3 a 25 caracteres.', value => {
            if (value !== undefined) {
                const valueLength = value.replace(/\s+/g, '').length
                return valueLength >= 3 && valueLength <= 25
            }
            return false;
        })
        .required('El numero serial del monitor es requerido.'),
    license_plate: string()
        .test('len', 'la placa del equipo debe tener entre 3 a 25 caracteres.', value => {
            if (value !== undefined) {
                const valueLength = value.replace(/\s+/g, '').length
                return valueLength >= 3 && valueLength <= 25
            }
            return false;
        })
        .required('la placa del equipo es requerido'),
    area: string()
        .test('len', 'El area del equipo debe tener entre 3 a 25 caracteres.', value => {
            if (value !== undefined) {
                const valueLength = value.replace(/\s+/g, '').length
                return valueLength >= 3 && valueLength <= 25
            }
            return false;
        })
        .required('El numero serial del mouse es requerido.'),
    flat: number()
        .test('len', 'El piso en donde esta ubicado el equipo debe ser un número entre 1 y 100.', value => {
            if (value !== undefined) {
                return value >= 1 || value <= 100
            }
            return false;
        })
        .required('El piso en donde esta ubicado el equipo es requerida.'),
})
export const equipmentInitialValues = {
    type: '',
    brand: '',
    model: '',
    serial: '',
    monitor_serial: '',
    license_plate: '',
    area: '',
    flat: '',
}

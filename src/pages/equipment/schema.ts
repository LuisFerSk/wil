import { object, string } from 'yup'

export const equipmentSchema = object().shape({
    type: string()
        .required('El tipo de equipo es requerido.'),
    campus: string()
        .required('La sede es requerida.'),
    brand: string()
        .test('len', 'La marca del equipo debe tener entre 2 a 25 caracteres.', value => {
            if (value) {
                const valueLength = value.replace(/\s+/g, '').length
                return valueLength >= 2 && valueLength <= 25
            }
            return false;
        })
        .required('La marca es requerida.'),
    model: string()
        .test('len', 'El modelo del equipo debe tener entre 2 a 25 caracteres.', value => {
            if (value) {
                const valueLength = value.replace(/\s+/g, '').length
                return valueLength >= 2 && valueLength <= 25
            }
            return false;
        })
        .required('El modelo del equipo es requerido.'),
    serial: string()
        .test('len', 'El numero serial del equipo debe tener entre 3 a 25 caracteres.', value => {
            if (value) {
                const valueLength = value.replace(/\s+/g, '').length
                return valueLength >= 3 && valueLength <= 25
            }
            return false;
        })
        .required('El numero serial del equipo es requerido.'),
    monitor_serial: string()
        .nullable()
        .test('len', 'El numero serial del monitor del equipo debe tener entre 3 a 25 caracteres.', value => {
            if (value) {
                const valueLength = value.replace(/\s+/g, '').length
                return valueLength >= 3 && valueLength <= 25
            }
            return true;
        }),
    license_plate: string()
        .nullable()
        .test('len', 'La placa del equipo debe contener solo números.', value => {
            if (value) {
                return /^[0-9]+$/.test(value)
            }
            return true;
        })
        .test('len', 'La placa del equipo debe tener entre 4 a 5 dígitos.', value => {
            if (value) {
                const valueLength = value.replace(/\s+/g, '').length;
                return valueLength >= 4 && valueLength <= 5
            }
            return true;
        }),
    area: string()
        .required('El numero serial del mouse es requerido.'),
    user: string()
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
        .nullable()
        .test('len', 'El número de teléfono debe contener solo números.', value => {
            if (value) {
                return /^[0-9]+$/.test(value)
            }
            return true;
        })
        .test('len', 'El número de teléfono debe tener entre 7 a 10 dígitos.', value => {
            if (value) {
                const valueLength = value.replace(/\s+/g, '').length;
                return valueLength >= 7 && valueLength <= 10
            }
            return true;
        })
})

export const equipmentInitialValues = {
    type: '',
    brand: '',
    campus: '',
    model: '',
    serial: '',
    monitor_serial: '',
    license_plate: '',
    area: '',
    user: '',
    cc: '',
    phone: '',
}

export const typesEquipments = [
    {
        label: 'Todo en uno',
        value: 'All in one'
    },
    {
        label: 'Escritorio',
        value: 'Desktop'
    },
    {
        label: 'Laptop',
        value: 'Laptop'
    },
    {
        label: 'Estación de trabajo',
        value: 'Workstation'
    },
    {
        label: 'Tablet iOS',
        value: 'Tablet iOS'
    }
]

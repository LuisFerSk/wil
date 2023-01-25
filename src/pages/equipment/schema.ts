import { EquipmentProps } from 'interfaces';
import { number, object, string } from 'yup'

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
    flat: number()
        .test('len', 'El piso debe ser un número entre 1 y 100.', value => {
            if (value) {
                return value >= 1 || value <= 100
            }
            return false;
        })
        .required('El piso en donde esta ubicado el equipo es requerida.'),
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

export const equipmentInitialValues: EquipmentProps = {
    type: '',
    brand: '',
    campus: '',
    model: '',
    serial: '',
    monitor_serial: '',
    license_plate: '',
    area: '',
    flat: '',
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

export const headquarters = [
    {
        label: 'Valledupar',
        value: 'VALLEDUPAR'
    },
    {
        label: 'Aguachica',
        value: 'AGUACHICA'
    },
    {
        label: 'Curumani',
        value: 'CURUMANI'
    },
    {
        label: 'Chimichagua',
        value: 'CHIMICHAGUA'
    },
    {
        label: 'Jagua de Ibirico',
        value: 'JAGUA DE IBIRICO'
    },
]

export const areas = [
    {
        label: 'Dirección general',
        value: 'DIRECCIÓN GENERAL'
    },
    {
        label: 'Secretaria general',
        value: 'SECRETARIA GENERAL'
    },
    {
        label: 'Oficina Jurídica',
        value: 'OFICINA JURÍDICA'
    },
    {
        label: 'Oficina Control Interno',
        value: 'OFICINA CONTROL INTERNO'
    },
    {
        label: 'Asesor Dirección General',
        value: 'ASESOR DIRECCIÓN GENERAL'
    },
    {
        label: 'Oficina de Sistemas y TICS',
        value: 'OFICINA DE SISTEMAS Y TICS'
    },
    {
        label: 'subdirección General Área de Planeación',
        value: 'SUBDIRECCIÓN GENERAL ÁREA DE PLANEACIÓN'
    },
    {
        label: 'Subdirección General Área de Gestión Ambiental',
        value: 'SUBDIRECCIÓN GENERAL ÁREA DE GESTIÓN AMBIENTAL'
    },
    {
        label: 'Subdirección General Área Administrativa y Financiera',
        value: 'SUBDIRECCIÓN GENERAL ÁREA ADMINISTRATIVA Y FINANCIERA'
    },
    {
        label: 'Gestión Financiera',
        value: 'GESTIÓN FINANCIERA'
    },
    {
        label: 'Contabilidad',
        value: 'CONTABILIDAD'
    },
    {
        label: 'Tesoreria',
        value: 'TESORERIA'
    },
    {
        label: 'Pagaduria',
        value: 'PAGADURIA'
    },
    {
        label: 'Ventanilla Única',
        value: 'VENTANILLA ÚNICA'
    },
]

import { date, number, object, string } from 'yup'

import { AREAS, HARD_DRIVE_TYPES, HEADQUARTERS, PROCESSOR_TYPES, RAM_MEMORY_TYPES, STATE, TYPES_EQUIPMENTS_SELECT } from 'constants'

export const equipmentSchema = object().shape({
    type: string()
        .oneOf(TYPES_EQUIPMENTS_SELECT.map((item) => item.value), 'El tipo de equipo no es valido.')
        .required('El tipo de equipo es requerido.'),
    processorType: string()
        .oneOf(PROCESSOR_TYPES.map((item) => item.value), 'El tipo de procesador no es valido.')
        .required('El tipo de procesador es requerido.'),
    ramMemoryCapacity: number()
        .min(1, 'La cantidad de la memoria RAM debe tener entre 1 a 3 dígitos.')
        .max(999, 'La cantidad de la memoria RAM debe tener entre 1 a 3 dígitos.')
        .required('La cantidad de la memoria RAM es requerido.'),
    ramMemoryType: string()
        .oneOf(RAM_MEMORY_TYPES.map((item) => item.value), 'El tipo de memoria RAM no es valido.')
        .required('El tipo de memoria RAM es requerido.'),
    dateOfPurchase: date()
        .required('La fecha de compra es requerida.'),
    warrantyEndDate: date()
        .when(
            'dateOfPurchase', (dateOfPurchase, schema) =>
            schema.test({
                test: (warrantyEndDate: string) => !!dateOfPurchase && warrantyEndDate > dateOfPurchase,
                message: 'La fecha de finalización de la garantía debe ser mayor que la de compra.'
            })
        )
        .required('La fecha de finalización de la garantía es requerida.'),
    monitorModel: string()
        .nullable()
        .min(3, 'El modelo del monitor debe ser una cadena de 3 a 25 caracteres.')
        .max(25, 'El modelo del monitor debe ser una cadena de 3 a 25 caracteres.'),
    hardDriveCapacity_1: number()
        .min(100, 'La capacidad del disco duro 1 debe tener de 3 a 4 dígitos.')
        .max(9_999, 'La capacidad del disco duro 1 debe tener de 3 a 4 dígitos.')
        .required('La capacidad del disco duro 1 es requerida.'),
    hardDriveType_1: string()
        .oneOf(HARD_DRIVE_TYPES.map((item) => item.value), 'El tipo del disco duro 1 no es valido.')
        .required('El tipo del disco duro 1 es requerido.'),
    hardDriveCapacity_2: number()
        .min(100, 'La capacidad del disco duro 2 debe tener de 3 a 4 dígitos.')
        .max(9_999, 'La capacidad del disco duro 2 debe tener de 3 a 4 dígitos.'),
    hardDriveType_2: string()
        .oneOf(HARD_DRIVE_TYPES.map((item) => item.value), 'El tipo del disco duro 2 no es valido.'),
    processorModel: string()
        .min(2, 'El modelo del equipo debe ser una cadena de 2 a 25 caracteres.')
        .max(25, 'El modelo del equipo debe ser una cadena de 2 a 25 caracteres.')
        .required('El modelo del procesador es requerido.'),
    campus: string()
        .oneOf(HEADQUARTERS.map((item) => item.value), 'La sede no es valida.')
        .required('La sede es requerida.'),
    brand: string()
        .min(2, 'La marca del equipo debe tener entre 2 a 25 caracteres.')
        .max(25, 'La marca del equipo debe tener entre 2 a 25 caracteres.')
        .required('La marca es requerida.'),
    model: string()
        .min(2, 'El modelo del equipo debe tener entre 2 a 25 caracteres.')
        .max(25, 'El modelo del equipo debe tener entre 2 a 25 caracteres.')
        .required('El modelo del equipo es requerido.'),
    serial: string()
        .min(3, 'El numero serial del equipo debe tener entre 3 a 25 caracteres.')
        .max(25, 'El numero serial del equipo debe tener entre 3 a 25 caracteres.')
        .required('El numero serial del equipo es requerido.'),
    monitorSerial: string()
        .nullable()
        .min(3, 'El numero serial del monitor del equipo debe tener entre 3 a 25 caracteres.')
        .max(25, 'El numero serial del monitor del equipo debe tener entre 3 a 25 caracteres.'),
    monitorLicensePlate: number()
        .nullable()
        .positive('La placa del monitor tiene que ser un numero entero positivo.')
        .integer('La placa del monitor tiene que ser un numero entero positivo.')
        .min(1_000, 'La placa del monitor debe tener entre 4 a 5 dígitos.')
        .max(99_999, 'La placa del monitor debe tener entre 4 a 5 dígitos.'),
    licensePlate: number()
        .nullable()
        .positive('La placa del equipo debe contener solo números.')
        .integer('La placa del equipo debe contener solo números.')
        .min(1_000, 'La placa del equipo debe tener entre 4 a 5 dígitos.')
        .max(99_999, 'La placa del equipo debe tener entre 4 a 5 dígitos.'),
    area: string()
        .oneOf(AREAS.map((item) => item.value), 'El area no es valida.')
        .required('El numero serial del mouse es requerido.'),
    user: string()
        .min(5, 'El nombre de usuario debe tener entre 5 a 50 caracteres.')
        .max(50, 'El nombre de usuario debe tener entre 5 a 50 caracteres.')
        .required('El nombre de usuario es requerido.'),
    cc: number()
        .positive('La cédula debe contener solo números.')
        .integer('La cédula debe contener solo números.')
        .min(1_000_000, 'La cédula del usuario debe tener entre 7 a 11 dígitos.')
        .max(99_999_999_999, 'La cédula del usuario debe tener entre 7 a 11 dígitos.')
        .required('La cédula es requerida.'),
    phone: number()
        .nullable()
        .positive('El número de teléfono debe contener solo números.')
        .integer('El número de teléfono debe contener solo números.')
        .min(1_000_000, 'El número de teléfono debe tener entre 7 a 10 dígitos.')
        .max(9_999_999_999, 'El número de teléfono debe tener entre 7 a 10 dígitos.'),
    state: string()
        .oneOf(STATE.map((item) => item.value), 'El estado no es valido.')
        .required('El estado es requerido.'),
})



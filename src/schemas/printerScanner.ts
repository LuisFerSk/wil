import { date, number, object, string } from 'yup'

import { ACQUIRED_BY_TYPES, AREAS, HEADQUARTERS, STATE, TYPES_OF_ACQUISITION, TYPES_PRINTER_SCANNER_SELECT } from 'constants'

export const printerScannerSchema = object().shape({
    type: string()
        .oneOf(TYPES_PRINTER_SCANNER_SELECT.map((item) => item.value), 'El tipo de impresora o scanner no es valid.')
        .required('El tipo de equipo es requerido.'),
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
    licensePlate: number()
        .nullable()
        .positive('La placa del equipo debe contener solo números.')
        .integer('La placa del equipo debe contener solo números.')
        .min(1_000, 'La placa del equipo debe tener entre 4 a 5 dígitos.')
        .max(99_999, 'La placa del equipo debe tener entre 4 a 5 dígitos.'),
    ip: string()
        .nullable(),
    area: string()
        .oneOf(AREAS.map((item) => item.value), 'El area no es valida.')
        .required('El numero serial del mouse es requerido.'),
    acquiredBy: string()
        .oneOf(TYPES_OF_ACQUISITION.map((item) => item.value), 'El método de adquisición no es valido.')
        .required('El método de adquisición es requerido.'),
    owner: string()
        .when(
            'acquiredBy', (acquiredBy, schema) =>
            schema.test({
                test: (value: string) => {
                    if (!!acquiredBy && !!value) {
                        return acquiredBy === ACQUIRED_BY_TYPES.renta
                    }

                    return true;
                },
                message: 'El propietario de la impresora o scanner solo se puede establecer si es rentada.'
            })
        ),
    dateOfPurchaseOrRental: date()
        .nullable(),
    warrantyEndDate: date()
        .nullable()
        .when(
            'acquiredBy', (acquiredBy, schema) =>
            schema.test({
                test: (value: string) => {
                    if (!!acquiredBy && !!value) {
                        return acquiredBy === ACQUIRED_BY_TYPES.compra
                    }

                    return true;
                },
                message: 'La fecha de finalización de la garantía no se puede establecer si la impresora o scanner es rentada.'
            })
        )
        .when(
            'dateOfPurchaseOrRental', (dateOfPurchaseOrRental, schema) =>
            schema.test({
                test: (value: string) => {
                    if (!!dateOfPurchaseOrRental && !!value) {
                        return value > dateOfPurchaseOrRental
                    }

                    return true;
                },
                message: 'La fecha de finalización de la garantía debe ser mayor que la de compra.'
            })
        )
        .when(
            'acquiredBy', (acquiredBy, schema) =>
            schema.test({
                test: (value: string) => {
                    if (!!acquiredBy && !!value) {
                        return acquiredBy === ACQUIRED_BY_TYPES.renta
                    }

                    return true;
                },
                message: 'La fecha de finalización de la garantía es requerida.'
            })
        ),
    state: string()
        .oneOf(STATE.map((item) => item.value), 'El estado no es valido.')
        .required('El estado es requerido.'),
})



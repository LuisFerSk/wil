import { verificarIPV4, verificarIPV6 } from 'utils';
import { number, object, string } from 'yup'

const patternTwoDigisAfterComma = /^\d+(\.\d{0,2})?$/;

export const equipmentSchema = object().shape({
    sectorial: number()
        .required('El sectorial es requerido.'),
    subsector: number(),
    tipo: string()
        .test('len', 'El tipo de equipo debe tener entre 8 a 10 caracteres.', value => {
            if (value !== undefined) {
                const valueLength = value.replace(/\s+/g, '').length
                return valueLength >= 8 && valueLength <= 10
            }
            return false;
        })
        .required('El tipo de equipo es requerido.'),
    referencia: string()
        .test('len', 'La referencia del equipo debe tener entre 8 a 20 caracteres.', value => {
            if (value !== undefined) {
                const valueLength = value.replace(/\s+/g, '').length
                return valueLength >= 8 && valueLength <= 20
            }
            return false;
        })
        .required('La referencia es requerida.'),
    idEquipo: string()
        .test('len', 'El id del equipo debe tener entre 8 a 50 caracteres.', value => {
            if (value !== undefined) {
                const valueLength = value.replace(/\s+/g, '').length
                return valueLength >= 8 && valueLength <= 50
            }
            return false;
        })
        .required('El id del equipo es requerido.'),
    numeroSerialCPU: string()
        .test('len', 'El numero serial del equipo debe tener entre 8 a 10 caracteres.', value => {
            if (value !== undefined) {
                const valueLength = value.replace(/\s+/g, '').length
                return valueLength >= 8 && valueLength <= 10
            }
            return false;
        })
        .required('El numero serial del equipo es requerido.'),
    numeroSerialMonitor: string()
        .test('len', 'El numero serial del monitor del equipo debe tener entre 8 a 10 caracteres.', value => {
            if (value !== undefined) {
                const valueLength = value.replace(/\s+/g, '').length
                return valueLength >= 8 && valueLength <= 10
            }
            return false;
        })
        .required('El numero serial del monitor es requerido.'),
    numeroSerialTeclado: string()
        .test('len', 'El numero serial del teclado del equipo debe tener entre 8 a 10 caracteres.', value => {
            if (value !== undefined) {
                const valueLength = value.replace(/\s+/g, '').length
                return valueLength >= 8 && valueLength <= 10
            }
            return false;
        })
        .required('El numero serial del teclado es requerido'),
    numeroSerialMouse: string()
        .test('len', 'El numero serial del mouse del equipo debe tener entre 8 a 10 caracteres.', value => {
            if (value !== undefined) {
                const valueLength = value.replace(/\s+/g, '').length
                return valueLength >= 8 && valueLength <= 10
            }
            return false;
        })
        .required('El numero serial del mouse es requerido.'),
    direccionIP: string()
        .test('len', 'La dirección ip no cumple con el formato IPV4 ni con el IPV6.', value => {
            if (value !== undefined) {
                return verificarIPV4(value) || verificarIPV6(value)
            }
            return false;
        })
        .required('La dirección ip es requerida.'),
    sistemaOperativo: string()
        .test('len', 'El sistema operativo del equipo debe tener entre 4 a 20 caracteres.', value => {
            if (value !== undefined) {
                const valueLength = value.replace(/\s+/g, '').length
                return valueLength >= 4 && valueLength <= 20
            }
            return false;
        })
        .required('El sistema operativo es requerido.'),
    tipoProcesador: string()
        .test('len', 'El tipo de procesador del equipo debe tener entre 4 a 20 caracteres.', value => {
            if (value !== undefined) {
                const valueLength = value.replace(/\s+/g, '').length
                return valueLength >= 4 && valueLength <= 20
            }
            return false;
        })
        .required('El tipo de procesador es requerido.'),
    discoDuro: string()
        .test('len', 'Este campo solo debe tener entre 7 a 20 caracteres.', value => {
            if (value !== undefined) {
                const valueLength = value.replace(/\s+/g, '').length
                return valueLength >= 7 && valueLength <= 20
            }
            return false;
        })
        .required('El nombre del disco duro es requerido.'),
    memoria: number()
        .positive('La capacidad de la memoria RAM debe ser positivo.')
        .test(
            "is-decimal",
            "Debe ser un decimal con un máximo de dos dígitos después de la coma",
            (val: any) => {
                if (val != undefined) {
                    return patternTwoDigisAfterComma.test(val);
                }
                return true;
            }
        )
        .min(1, "El valor mínimo es 1")
        .max(999, "El valor máximo es 999")
        .required('La capacidad de l memoria RAM es requerida.'),
    capacidad: number()
        .positive('La capacidad del disco duro debe ser positivo.')
        .test(
            "is-decimal",
            "Debe ser un decimal con un máximo de dos dígitos después de la coma",
            (val: any) => {
                if (val != undefined) {
                    return patternTwoDigisAfterComma.test(val);
                }
                return true;
            }
        )
        .min(1, "El valor mínimo es 1")
        .max(999, "El valor máximo es 999")
        .required('La capacidad del disco duro es requerida.'),
    espacioUsado: number()
        .positive('El espacio usado debe ser positivo.')
        .test(
            "is-decimal",
            "Debe ser un decimal con un máximo de dos dígitos después de la coma",
            (val: any) => {
                if (val != undefined) {
                    return patternTwoDigisAfterComma.test(val);
                }
                return true;
            }
        )
        .min(1, "El valor mínimo es 1")
        .max(999, "El valor máximo es 999")
        .required('El espacio del disco duro usado es requerido'),
    softwareInstalado: string()
        .test('len', 'Este campo solo puede tener entre 1 a 500 caracteres.', value => {
            if (value !== undefined) {
                const valueLength = value.replace(/\s+/g, '').length
                return valueLength >= 1 && valueLength <= 500
            }
            return false;
        })
        .required('El software instalado es requerido, '),
})

export const equipmentInitialValues = {
    sectorial: '',
    subsector: '',
    tipo: '',
    referencia: '',
    idEquipo: '',
    numeroSerialCPU: '',
    numeroSerialMonitor: '',
    numeroSerialTeclado: '',
    numeroSerialMouse: '',
    direccionIP: '',
    sistemaOperativo: '',
    tipoProcesador: '',
    memoria: '',
    discoDuro: '',
    capacidad: '',
    espacioUsado: '',
    softwareInstalado: '',
}

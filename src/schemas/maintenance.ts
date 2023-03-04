import { number, object, string, date, boolean } from 'yup'

import { QUESTIONS_OPTIONS } from 'constants';

export const maintenanceSchema = object().shape({
    equipmentId: number()
        .required('El equipo es requerido.'),
    date: date()
        .test('len', 'La fecha no puede ser mayor a la de hoy.', value => {
            if (value !== undefined) {
                const today = new Date()
                return value <= today;
            }

            return true;
        })
        .required('La fecha del mantenimiento es requerida.'),
    city: string()
        .required('La ciudad es requerida.'),
    workstation: string()
        .min(3, 'La estación de trabajo debe ser una cadena de 3 a 30 caracteres.')
        .max(20, 'La estación de trabajo debe ser una cadena de 3 a 30 caracteres.'),
    ignitionStation: boolean(),
    operatingSystemBoot: boolean(),
    HDD: boolean(),
    cdRomDvd: boolean(),
    display: boolean(),
    mouse: boolean(),
    keyboard: boolean(),
    removeIndoorDust: boolean(),
    checkInternalConnections: boolean(),
    cleanKeyboard: boolean(),
    cleanMonitor: boolean(),
    cleanMouse: boolean(),
    connectPowerPeripheralCables: boolean(),
    closePcCleanCase: boolean(),
    endIgnitionStation: boolean(),
    endOperatingSystemBoot: boolean(),
    endHdd: boolean(),
    endCdRomDvd: boolean(),
    endDisplay: boolean(),
    endMouse: boolean(),
    endKeyboard: boolean(),
    errorDescription: string()
        .max(200, 'La descripción del error encontrado debe ser una cadena de máximo 200 caracteres.'),
    checkAntiVirus: boolean(),
    deletionTemporaryCookies: boolean(),
    diskDefragmentation: boolean(),
    equipmentDelivery: boolean(),
    endErrorDescription: string()
        .max(200, 'La descripción final del error encontrado debe ser una cadena de máximo 200 caracteres.'),
    question_1: string()
        .oneOf(QUESTIONS_OPTIONS.map((item) => item.value), 'La respuesta a la primera pregunta no es valido.'),
    question_2: string()
        .oneOf(QUESTIONS_OPTIONS.map((item) => item.value), 'La respuesta a la segunda pregunta no es valido.'),
    question_3: string()
        .oneOf(QUESTIONS_OPTIONS.map((item) => item.value), 'La respuesta a la tercera pregunta no es valido.'),
    observations: string()
        .max(200, 'Las observaciones deben ser una cadena de máximo 200 caracteres.'),
})

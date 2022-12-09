import { number, object, string } from "yup"

export const descargaSchema = object().shape({
    nameFile: string().
        required('El nombre del archivo es requerido.'),
    downloadBy: number()
        .required('Debe seleccionar un filtro para la descarga.'),
    sectorial: number()
        .when('downloadBy', (downloadBy, schema) => schema.test({
            test: (sectorial: number) => sectorial && downloadBy === 2 || downloadBy === 1,
            message: 'Debe seleccionar un sectorial.'
        })),
    subsector: number()
})

export const descargaInitialValues = {
    nameFile: 'Equipos',
    downloadBy: 1,
    sectorial: '',
    subsector: '',
}
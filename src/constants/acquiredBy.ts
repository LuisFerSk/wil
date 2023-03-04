export enum ACQUIRED_BY_TYPES {
    renta = 'renta',
    compra = 'compra'
}

export const OWNER_DISABLE = Object.freeze({
    [ACQUIRED_BY_TYPES.compra]: true,
    [ACQUIRED_BY_TYPES.renta]: false
})

export const WARRANTY_END_DATE_DISABLE = Object.freeze({
    [ACQUIRED_BY_TYPES.compra]: false,
    [ACQUIRED_BY_TYPES.renta]: true
})

export const TYPES_OF_ACQUISITION = Object.freeze([
    {
        label: 'Compra',
        value: 'compra'
    },
    {
        label: 'Renta',
        value: 'renta'
    },
])
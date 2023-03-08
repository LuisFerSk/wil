export const GUARANTEE = Object.freeze([
    {
        label: 'Sin garantía',
        value: 'sin garantía'
    },
    {
        label: 'Con garantía',
        value: 'con garantía'
    },
])

export const guaranteeFilterValues = {
    noWarranty: GUARANTEE[0].value,
    withGuarantee: GUARANTEE[1].value
}
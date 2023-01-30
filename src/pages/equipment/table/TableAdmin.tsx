import { lazy, Suspense } from 'react'

import editFill from '@iconify/icons-eva/edit-fill'
import trash2Outline from '@iconify/icons-eva/trash-2-outline'
import baselineRemoveRedEye from '@iconify/icons-ic/baseline-remove-red-eye';

import { CircularProgress, Grid, TableCell } from '@mui/material'
import { FloatAlert, Modal, Table } from 'components'

import { mappingMenuItem } from 'components/table/TableFunctions'
import TableMoreMenu from 'components/table/TableMoreMenu'
import { useFloat } from 'hooks'
import { BrandStateInterface, EquipmentInterface, HeadLabelInterface, TableDataInterface, TableOptionsInterface, typeEquipment } from 'interfaces'

const headLabel: HeadLabelInterface[] = [
    { id: 'license_plate', label: 'Placa', alignRight: false },
    { id: 'serial', label: 'Serial', alignRight: false },
    { id: 'type', label: 'Tipo', alignRight: false },
    { id: 'brand', label: 'Marca', alignRight: false },
    { id: 'model', label: 'Modelo', alignRight: false },
    { id: '', label: '' }
]

interface EquipmentTableProps extends TableDataInterface<EquipmentInterface> {
    updateProps: BrandStateInterface
}

export default function EquipmentTable(props: EquipmentTableProps) {
    const EquipmentView = lazy(() => import('../view'))
    const EquipmentDelete = lazy(() => import('../delete'))
    const EquipmentUpdate = lazy(() => import('../update'))

    const { data, setData, updateProps } = props;

    const modalState = useFloat({ initialState: false })

    const alertState = useFloat({
        initialState: false,
        initialContent: '¡Se ha eliminado correctamente el equipo!'
    })

    function createTableCells(row: EquipmentInterface) {
        const { serial, type, brand, model, license_plate } = row;

        const options: TableOptionsInterface[] = [
            {
                label: 'Ver',
                icon: baselineRemoveRedEye,
                onClick: () => {
                    modalState.setTitle('Equipo')
                    modalState.setContent(
                        <Suspense fallback={
                            <Grid textAlign='center'>
                                <CircularProgress color='primary' />
                            </Grid>
                        }>
                            <EquipmentView data={row} />
                        </Suspense>
                    )
                    modalState.open()
                }
            },
            {
                label: 'Editar',
                icon: editFill,
                onClick: () => {
                    modalState.setTitle('Actualizar Equipo')
                    modalState.setContent(
                        <Suspense fallback={
                            <Grid textAlign='center'>
                                <CircularProgress color='primary' />
                            </Grid>
                        }>
                            <EquipmentUpdate
                                {...updateProps}
                                setData={setData}
                                initData={row}
                            />
                        </Suspense>
                    )
                    modalState.open()
                }
            },
            {
                label: 'Eliminar',
                icon: trash2Outline,
                onClick: () => {
                    modalState.setTitle('Eliminar Equipo')
                    modalState.setContent(
                        <Suspense fallback={
                            <Grid textAlign='center'>
                                <CircularProgress color='primary' />
                            </Grid>
                        }>
                            <EquipmentDelete
                                data={row}
                                setData={setData}
                                closeModal={modalState.close}
                                openAlert={alertState.open}
                            />
                        </Suspense>

                    )
                    modalState.open()
                }
            },
        ]


        return (
            <>
                <TableCell align='left'>{license_plate || 'Sin placa'}</TableCell>
                <TableCell align='left'>{serial}</TableCell>
                <TableCell align='left'>{typeEquipment[type]}</TableCell>
                <TableCell align='left'>{brand.name}</TableCell>
                <TableCell align='left'>{model}</TableCell>
                <TableCell padding='checkbox'>
                    <TableMoreMenu>
                        {mappingMenuItem(options)}
                    </TableMoreMenu>
                </TableCell>
            </>
        )
    }

    return (
        <>
            <Table
                createTableCells={createTableCells}
                headLabel={headLabel}
                data={data}
                selectBy='license_plate'
                searchBy='license_plate'
                searchByOther='serial'
                placeholder='Buscar por placa o serial'
            />
            <Modal title={modalState.title} isOpen={modalState.isOpen} onClose={modalState.close}>
                {modalState.content as JSX.Element}
            </Modal>
            <FloatAlert isOpen={alertState.isOpen} close={alertState.close} severity="success">
                {alertState.content as JSX.Element}
            </FloatAlert>
        </>
    )
}

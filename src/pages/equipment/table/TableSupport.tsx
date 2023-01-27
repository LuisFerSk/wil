import { TableCell } from '@mui/material'
import { Table } from 'components'

import { DataTableType, EquipmentInterface, HeadLabelInterface } from 'interfaces'

const headLabel: HeadLabelInterface[] = [
    { id: 'license_plate', label: 'Placa', alignRight: false },
    { id: 'serial', label: 'Serial', alignRight: false },
    { id: 'type', label: 'Tipo', alignRight: false },
    { id: 'brand', label: 'Marca', alignRight: false },
    { id: 'model', label: 'Modelo', alignRight: false },
    { id: '', label: '' }
]

interface EquipmentTableProps {
    data: DataTableType<EquipmentInterface>
}

export default function EquipmentTable(props: EquipmentTableProps) {
    const { data } = props;

    function createTableCells(row: EquipmentInterface) {
        const { serial, type, brand, model, license_plate } = row;

        return (
            <>
                <TableCell align='left'>{license_plate}</TableCell>
                <TableCell align='left'>{serial}</TableCell>
                <TableCell align='left'>{type}</TableCell>
                <TableCell align='left'>{brand.name}</TableCell>
                <TableCell align='left'>{model}</TableCell>
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
        </>
    )
}

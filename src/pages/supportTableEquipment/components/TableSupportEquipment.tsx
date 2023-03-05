import { Chip, TableCell } from "@mui/material"
import baselineRemoveRedEye from '@iconify/icons-ic/baseline-remove-red-eye';
import { useNavigate } from "react-router-dom"

import { EquipmentFindAllBlocSuccess } from "bloc"
import { mappingMenuItem, Table, TableMoreMenu } from "components"
import { EquipmentFindResponse } from "services/models"
import { STATE_BOOLEAN } from "constants";
import { HeadLabelInterface } from "interfaces";

interface Props {
    bloc: EquipmentFindAllBlocSuccess
}

export default function TableSupportEquipment(props: Props) {
    const { bloc } = props;

    const navigate = useNavigate()

    function createTableCells(row: EquipmentFindResponse) {
        const { id, serial, type, brand, model, licensePlate, state } = row;

        const options = [
            {
                label: 'Ver',
                icon: baselineRemoveRedEye,
                onClick: () => {
                    navigate(`/equipment/view/${id}`)
                }
            },
        ]

        return (
            <>
                <TableCell align='left'>{licensePlate || 'Sin placa'}</TableCell>
                <TableCell align='left'>{serial}</TableCell>
                <TableCell align='left'>{type}</TableCell>
                <TableCell align='left'>{brand.name}</TableCell>
                <TableCell align='left'>{model}</TableCell>
                <TableCell align='left'>
                    {STATE_BOOLEAN[state as keyof typeof STATE_BOOLEAN] ?
                        <Chip label="Activo" color='primary' size="small" />
                        :
                        <Chip label="Inactivo" variant="outlined" color='error' size="small" />
                    }
                </TableCell>
                <TableCell padding='checkbox'>
                    <TableMoreMenu>
                        {mappingMenuItem(options)}
                    </TableMoreMenu>
                </TableCell>
            </>
        )
    }

    return (
        <Table
            createTableCells={createTableCells}
            headLabel={headLabel}
            data={bloc.state}
            selectBy='licensePlate'
            searchBy='licensePlate'
            placeholder='Buscar equipo'
        />
    )
}

const headLabel:HeadLabelInterface<EquipmentFindResponse>[] = [
    { id: 'licensePlate', label: 'Placa', alignRight: false },
    { id: 'serial', label: 'Serial', alignRight: false },
    { id: 'type', label: 'Tipo', alignRight: false },
    { id: 'brand', label: 'Marca', alignRight: false },
    { id: 'model', label: 'Modelo', alignRight: false },
    { id: 'state', label: 'Estado', alignRight: false },
]
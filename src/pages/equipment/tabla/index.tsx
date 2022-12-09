import editFill from '@iconify/icons-eva/edit-fill'
import trash2Outline from '@iconify/icons-eva/trash-2-outline'

import { TableCell } from '@mui/material'
import { FloatAlert, Modal, Table } from 'components'


import { mappingMenuItem } from 'components/table/TableFunctions'
import TableMoreMenu from 'components/table/TableMoreMenu'
import { useFloat } from 'hooks'
import { EquipoInterface, TableDataInterface, TableOptionsInterface } from 'interfaces'
import DescargaEquipos from '../descarga'
import DeleteEquipment from '../eliminar'
import UpdateEquipo from '../update'

const headLabel = [
    { id: 'idEquipo', label: 'Id', alignRight: false },
    { id: 'sectorial', label: 'Sectorial', alignRight: false },
    { id: 'tipo', label: 'Tipo', alignRight: false },
    { id: '', }
]

function EquipmentTable(props: TableDataInterface<EquipoInterface>): JSX.Element {
    const { data, setData } = props;

    const { isOpen, open, close, content, setContent, title, setTitle } = useFloat({ initialState: false })

    const alertState = useFloat({
        initialState: false,
        initialContent: '¡Se ha eliminado correctamente el funcionario!'
    })


    function createTableCells(row: EquipoInterface): JSX.Element {
        const { idEquipo, tipo, sectorial } = row;

        const optionsUser: TableOptionsInterface[] = [
            {
                label: 'Editar', icon: editFill, onClick: () => {
                    setTitle('Actualizar Equipo')
                    setContent(
                        <UpdateEquipo
                            setData={setData}
                            initData={row}
                        />
                    )
                    open()
                }
            },
        ]

        const optionsAdmin: TableOptionsInterface[] = [
            ...optionsUser,
            {
                label: 'Eliminar', icon: trash2Outline, onClick: () => {
                    setTitle('Eliminar Equipo')
                    setContent(
                        <DeleteEquipment
                            setData={setData}
                            data={row}
                            closeModal={close}
                            openAlert={alertState.open}
                        />
                    )
                    open()
                }
            },
        ]

        function getOptions() {
            // if (user?.rol === roles.administrador.id) {
            //     return optionsAdmin;
            // }
            // if (user?.rol === roles.usuario.id) {
            //     return optionsUser;
            // }
            return []
        }

        const options = getOptions()

        return (
            <>
                <TableCell align='left'>{idEquipo}</TableCell>
                <TableCell align='left'>{sectorial}</TableCell>
                <TableCell align='left'>{tipo}</TableCell>
                <TableCell padding='checkbox'>
                    <TableMoreMenu>
                        {mappingMenuItem(options)}
                    </TableMoreMenu>
                </TableCell>
            </>
        )
    }

    function onDownload() {
        setTitle('Descargar excel con los equipos')
        setContent(
            <DescargaEquipos />
        )
        open()
    }

    return (
        <>
            <Table
                createTableCells={createTableCells}
                headLabel={headLabel}
                data={data}
                selectBy='idEquipo'
                searchBy='idEquipo'
                placeholder='Buscar por id'
                download={true}
                onDownload={onDownload}
            />
            <Modal title={title} isOpen={isOpen} onClose={close}>
                <>
                    {content}
                </>
            </Modal>
            <FloatAlert isOpen={alertState.isOpen} close={alertState.close} severity="success">
                {alertState.content as JSX.Element}
            </FloatAlert>
        </>
    )
}

export default EquipmentTable;

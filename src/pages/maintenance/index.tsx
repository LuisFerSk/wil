import LibraryAddIcon from '@mui/icons-material/LibraryAdd';
import { Box, Card, Grid } from "@mui/material";
import { Accordion } from "components";
import { EquipmentInterface, MaintenanceInterface } from 'interfaces';
import { useContext, useEffect, useState } from 'react';
import { authContext } from 'provider/Auth';
import TableAdmin from './table/TableAdmin';
import MaintenanceRegister from './register';
import { maintenanceFindAll } from 'services/maintenance';
import { equipmentFindAll } from 'services/equipment';

export interface ConstantsInterface {
    equipments: EquipmentInterface[] | undefined
}

const initConstants: ConstantsInterface = {
    equipments: undefined
}

export default function Maintenance() {
    const [maintenances, setMaintenances] = useState<MaintenanceInterface[] | []>([])
    const [constants, setConstants] = useState<ConstantsInterface>(initConstants)

    const _authContext = useContext(authContext)
    const { token } = _authContext;

    const Accordions = [
        {
            title: 'Agregar mantenimiento',
            icon: <LibraryAddIcon color='primary' />,
            content: <MaintenanceRegister setData={setMaintenances} {...constants} />
        }
    ]

    useEffect(() => {
        maintenanceFindAll(token).then((result) => {
            setMaintenances(result.data.info)
        })

        equipmentFindAll(token).then((result) => {
            setConstants(old => ({
                ...old,
                equipments: result.data.info
            }))
        })
    }, [])

    return (
        <Grid container spacing={6} paddingX={2}>
            <Grid item xs={12} md={12} sm={12} lg={12}>
                <Card>
                    <Accordion accordions={Accordions} indexOpen={0} />
                </Card>
            </Grid>
            <Grid item xs={12} md={12} sm={12} lg={12}>
                <Box>
                    <TableAdmin data={maintenances} setData={setMaintenances} />
                </Box>
            </Grid>
        </Grid>
    )
}
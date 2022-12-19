import LibraryAddIcon from '@mui/icons-material/LibraryAdd';
import { Box, Card, Grid } from "@mui/material";
import { Accordion } from "components";
import { MaintenanceInterface, UserInterface } from 'interfaces';
import { useContext, useEffect, useState } from 'react';
import { authContext } from 'provider/Auth';
import MaintenanceTable from './table';
import MaintenanceRegister from './register';
import { maintenanceFindAll } from 'api/maintenance';
import { userFindAll } from 'api/user';

export interface ConstantsInterface {
    users: UserInterface[] | []
}

const initConstants: ConstantsInterface = {
    users: []
}

export default function Maintenance(): JSX.Element {
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
        if (!token) {
            return;
        }

        maintenanceFindAll(token).then((result) => {
            if (result.status >= 200 || result.status < 300) {
                setMaintenances(result.data.info)
            }
        })

        userFindAll(token).then((result) => {
            if (result.status >= 200 || result.status < 300) {
                setConstants(old => ({
                    ...old,
                    users: result.data.info
                }))
            }
        })
    }, [])

    return (
        <Grid container spacing={6}>
            <Grid item xs={12} md={12} sm={12} lg={12}>
                <Card>
                    <Accordion accordions={Accordions} indexOpen={0} />
                </Card>
            </Grid>
            <Grid item xs={12} md={12} sm={12} lg={12}>
                <Box>
                    <MaintenanceTable data={maintenances} setData={setMaintenances} />
                </Box>
            </Grid>
        </Grid>
    )
}
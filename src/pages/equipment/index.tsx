import LibraryAddIcon from '@mui/icons-material/LibraryAdd';
import { Box, Card, Grid } from "@mui/material";
import Accordion from "components/accordion";
import { EquipoInterface } from 'interfaces';
import { useContext, useEffect, useState } from 'react';
import { authContext } from 'provider/Auth';
import EquipmentTable from './tabla';
import RegisterEquipment from './register';

function Equipment(): JSX.Element {
    const [equipos, setEquipos] = useState<EquipoInterface[] | []>([])

    const authsContext = useContext(authContext)
    const { token } = authsContext;

    const Accordions = [
        {
            title: 'Agregar Equipo',
            icon: <LibraryAddIcon color='primary' />,
            content: <RegisterEquipment setData={setEquipos} />
        }
    ]

    return (
        <Grid container spacing={6}>
            <Grid item xs={12} md={12} sm={12} lg={12}>
                <Card>
                    <Accordion accordions={Accordions} indexOpen={0} />
                </Card>
            </Grid>
            <Grid item xs={12} md={12} sm={12} lg={12}>
                <Box>
                    <EquipmentTable data={equipos} setData={setEquipos} />
                </Box>
            </Grid>
        </Grid>
    )
}

export default Equipment
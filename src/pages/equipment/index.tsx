import LibraryAddIcon from '@mui/icons-material/LibraryAdd';
import { Box, Card, Grid } from "@mui/material";
import { Accordion } from "components";
import { EquipmentInterface } from 'interfaces';
import { useContext, useEffect, useState } from 'react';
import { authContext } from 'provider/Auth';
import EquipmentTable from './table';
import RegisterEquipment from './register';
import { equipmentFindAll } from 'api/equipment';

function Equipment(): JSX.Element {
    const [equipments, setEquipments] = useState<EquipmentInterface[] | []>([])

    const authsContext = useContext(authContext)
    const { token } = authsContext;

    const Accordions = [
        {
            title: 'Agregar equipo',
            icon: <LibraryAddIcon color='primary' />,
            content: <RegisterEquipment setData={setEquipments} />
        }
    ]

    useEffect(() => {
        if (token) {
            equipmentFindAll(token).then((result) => {
                if (result.status >= 200 || result.status < 300) {
                    setEquipments(result.data.info)
                }
            })
        }
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
                    <EquipmentTable data={equipments} setData={setEquipments} />
                </Box>
            </Grid>
        </Grid>
    )
}

export default Equipment
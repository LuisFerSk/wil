import LibraryAddIcon from '@mui/icons-material/LibraryAdd';
import { Box, Card, Grid } from "@mui/material";
import { Accordion } from "components";
import { BrandInterface, EquipmentInterface } from 'interfaces';
import { useContext } from 'react';
import { authContext } from 'provider/Auth';
import EquipmentTable from './table';
import RegisterEquipment from './register';
import { equipmentFindAll } from 'api/equipment';
import { useGetQueryApi } from 'hooks/getQueryApi';
import { brandFindAll } from 'api/brand';

export default function Equipment(): JSX.Element {
    const _authContext = useContext(authContext)
    const { token } = _authContext;

    const [equipments, setEquipments] = useGetQueryApi<EquipmentInterface[]>(equipmentFindAll(token), [])

    const [brands, setBrands] = useGetQueryApi<BrandInterface[]>(brandFindAll(token), [])

    const Accordions = [
        {
            title: 'Agregar equipo',
            icon: <LibraryAddIcon color='primary' />,
            content: <RegisterEquipment setData={setEquipments} brands={brands} setBrands={setBrands} />
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
                    <EquipmentTable
                        data={equipments}
                        setData={setEquipments}
                        updateProps={{
                            brands,
                            setBrands,
                        }}
                    />
                </Box>
            </Grid>
        </Grid>
    )
}
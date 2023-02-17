import { useContext } from 'react';
import LibraryAddIcon from '@mui/icons-material/LibraryAdd';
import { Box, Card, Grid } from "@mui/material";

import { Accordion } from "components";
import { BrandInterface, EquipmentInterface } from 'interfaces';
import { authContext } from 'provider/Auth';
import { equipmentFindAll } from 'services/equipment';
import { brandFindAllByEquipment } from 'services/brand';
import { roles } from 'constants';
import { useGetQueryApi } from 'hooks';

import { AdminTableEquipment, RegisterEquipment, SupportTableEquipment } from './components';


export default function EquipmentPage() {
    const _authContext = useContext(authContext)
    const { token, user } = _authContext;

    const [equipments, setEquipments] = useGetQueryApi<EquipmentInterface[]>(equipmentFindAll(token), [])

    const [brands, setBrands] = useGetQueryApi<BrandInterface[]>(brandFindAllByEquipment(token), [])

    const Accordions = [
        {
            title: 'Agregar equipo',
            icon: <LibraryAddIcon color='primary' />,
            content: <RegisterEquipment setData={setEquipments} brands={brands} setBrands={setBrands} />
        }
    ]

    return (
        <Grid container spacing={6} paddingX={2}>
            <Grid item xs={12} md={12} sm={12} lg={12}>
                <Card>
                    <Accordion accordions={Accordions} indexOpen={0} />
                </Card>
            </Grid>
            <Grid item xs={12} md={12} sm={12} lg={12}>
                <Box>
                    {user?.role === roles.administrator ? (
                        <AdminTableEquipment
                            data={equipments}
                            setData={setEquipments}
                            updateProps={{
                                brands,
                                setBrands,
                            }}
                        />
                    ) : (
                        <SupportTableEquipment data={equipments} />
                    )}
                </Box>
            </Grid>
        </Grid>
    )
}
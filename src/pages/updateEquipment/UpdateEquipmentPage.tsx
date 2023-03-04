import { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Button, Card, Grid, Typography } from "@mui/material";
import AssignmentIcon from '@mui/icons-material/Assignment';

import { AuthContext } from "provider/Auth";
import { equipmentFind } from "services/equipment";
import { Loader } from "pages";
import { EquipmentFindBloc, EquipmentFindBlocFailure, EquipmentFindBlocLoading, EquipmentFindBlocSuccess } from "bloc";
import { FormUpdateEquipment } from "./components";
import { TryAgain } from "components";

export default function UpdateEquipmentPage() {
    const authContext = useContext(AuthContext)
    const { token } = authContext;

    const [bloc, setBloc] = useState<EquipmentFindBloc>(new EquipmentFindBlocLoading())

    let { id } = useParams();

    function getEquipment() {
        equipmentFind(token, id)
            .then((response) => {
                setBloc(new EquipmentFindBlocSuccess(response.data))
            })
            .catch((error) => {
                setBloc(new EquipmentFindBlocFailure(error))
            })
    }

    useEffect(() => {
        getEquipment()
    }, [])

    if (bloc instanceof EquipmentFindBlocLoading) {
        return <Loader />
    }

    if (bloc instanceof EquipmentFindBlocSuccess) {
        return (
            <Grid paddingX={2}>
                <Grid
                    item
                    container
                    xs={12}
                    justifyContent="space-between"
                >
                    <Typography variant="h4" sx={{ mb: 5 }} >Actualizar equipo</Typography>
                    <Link to='/equipment'>
                        <Button variant="outlined" endIcon={<AssignmentIcon />}>
                            Inventario
                        </Button>
                    </Link>
                </Grid>
                <Card>
                    <FormUpdateEquipment initData={bloc.state} />
                </Card>
            </Grid>
        )
    }

    return (
        <TryAgain
            message='Ha ocurrido un error al traer la información del equipo.'
            onClick={() => { getEquipment() }}
        >
            volver a intentarlo
        </TryAgain >
    )
}
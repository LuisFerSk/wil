import { useContext } from 'react'
import { useFormik } from "formik";
import { Button, Grid, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import AssignmentIcon from '@mui/icons-material/Assignment';

import { equipmentSchema } from "schemas";
import { EquipmentCreateRequest } from "services/models";
import { FormEquipment } from "components";
import { useMessage } from "hooks";
import { equipmentCreate } from "services/equipment";
import { AuthContext } from 'provider/Auth';

export default function RegisterEquipmentPage() {
    const authContext = useContext(AuthContext)
    const { token } = authContext;

    const [message, setMessage] = useMessage()

    const formik = useFormik({
        initialValues: new EquipmentCreateRequest(),
        validationSchema: equipmentSchema,
        onSubmit: (data, { resetForm }) => {
            equipmentCreate(token, new EquipmentCreateRequest(data))
                .then((_) => {
                    resetForm()
                    setMessage("success", 'Se ha guardado correctamente el equipo.')
                })
                .catch((error) => {
                    const { response } = error;

                    if (response) {
                        setMessage('error', response.data)
                        return;
                    }

                    setMessage('error', "Ha sucedió un error al realizar la operación")
                })
        },
    })

    return (
        <Grid paddingX={2}>
            <Grid
                item
                container
                xs={12}
                justifyContent="space-between"
            >
                <Typography variant="h4" sx={{ mb: 4 }} >Registrar equipo</Typography>
                <Link to='/equipment'>
                    <Button variant="outlined" endIcon={<AssignmentIcon />}>
                        Inventario
                    </Button>
                </Link>
            </Grid>
            <FormEquipment formik={formik} message={message} />
        </Grid>
    )
}
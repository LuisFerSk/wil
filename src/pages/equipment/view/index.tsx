import { Grid, Typography } from "@mui/material";
import { EquipmentInterface, flat, typeEquipment } from "interfaces";

interface Props {
    data: EquipmentInterface
}

export default function EquipmentView(props: Props) {
    const { data } = props;

    return (
        <Grid container spacing={2}>
            <Grid item xs={12} sm={6} lg={4}>
                <Typography variant="subtitle1" >
                    Tipo de equipo
                </Typography>
                <Typography variant="body2" >
                    {typeEquipment[data.type]}
                </Typography>
            </Grid>
            <Grid item xs={12} sm={6} lg={4}>
                <Typography variant="subtitle1" >
                    Marca
                </Typography>
                <Typography variant="body2" >
                    {data.brand.name}
                </Typography>
            </Grid>
            <Grid item xs={12} sm={6} lg={4}>
                <Typography variant="subtitle1" >
                    Modelo
                </Typography>
                <Typography variant="body2" >
                    {data.model}
                </Typography>
            </Grid>
            <Grid item xs={12} sm={6} lg={4}>
                <Typography variant="subtitle1" >
                    Serial
                </Typography>
                <Typography variant="body2" >
                    {data.serial}
                </Typography>
            </Grid>
            <Grid item xs={12} sm={6} lg={4}>
                <Typography variant="subtitle1" >
                    Serial del monitor
                </Typography>
                <Typography variant="body2" >
                    {data.monitor_serial || 'no registrado'}
                </Typography>
            </Grid>
            <Grid item xs={12} sm={6} lg={4}>
                <Typography variant="subtitle1" >
                    Placa del monitor
                </Typography>
                <Typography variant="body2" >
                    {data.monitor_license_plate || 'no registrado'}
                </Typography>
            </Grid>
            <Grid item xs={12} sm={6} lg={4}>
                <Typography variant="subtitle1" >
                    Placa
                </Typography>
                <Typography variant="body2" >
                    {data.license_plate || 'no registrado'}
                </Typography>
            </Grid>
            <Grid item xs={12} sm={6} lg={4}>
                <Typography variant="subtitle1" >
                    Sede
                </Typography>
                <Typography variant="body2" >
                    {data.campus}
                </Typography>
            </Grid>
            <Grid item xs={12} sm={12}  lg={4}>
                <Typography variant="subtitle1" >
                    Area
                </Typography>
                <Typography variant="body2" >
                    {data.area}
                </Typography>
            </Grid>
            <Grid item xs={12} sm={2}>
                <Typography variant="subtitle1" >
                    Piso
                </Typography>
                <Typography variant="body2" >
                    {flat[data.area]}
                </Typography>
            </Grid>
            <Grid item xs={12}>
                <Typography variant="subtitle2" >
                    Información del usuario
                </Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
                <Typography variant="subtitle1" >
                    Usuario
                </Typography>
                <Typography variant="body2" >
                    {data.user}
                </Typography>
            </Grid>
            <Grid item xs={12} sm={3}>
                <Typography variant="subtitle1" >
                    Cédula
                </Typography>
                <Typography variant="body2" >
                    {data.cc}
                </Typography>
            </Grid>
            <Grid item xs={12} sm={3}>
                <Typography variant="subtitle1" >
                    Teléfono
                </Typography>
                <Typography variant="body2" >
                    {data.phone || 'No registrado'}
                </Typography>
            </Grid>
        </Grid>
    )
}
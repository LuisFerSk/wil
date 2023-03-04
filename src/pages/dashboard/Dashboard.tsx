import { Grid, Container, Typography, Skeleton } from '@mui/material';
import { useContext, useEffect, useState } from 'react';

import { maintenanceFindMadePerDay } from 'services/maintenance';
import { AuthContext } from 'provider/Auth';
import { BarChar } from 'components';
import { MaintenanceFindMadePerDayBloc, MaintenanceFindMadePerDayBlocFailure, MaintenanceFindMadePerDayBlocLoading, MaintenanceFindMadePerDayBlocSuccess } from 'bloc';

export default function Dashboard() {
  const authContext = useContext(AuthContext)
  const { token } = authContext;

  const [bloc, setBloc] = useState<MaintenanceFindMadePerDayBloc>(new MaintenanceFindMadePerDayBlocLoading())

  function charRender() {
    if (bloc instanceof MaintenanceFindMadePerDayBlocSuccess) {
      return (
        <BarChar
          title="Mantenimientos realizados"
          chartLabels={bloc.state.map(row => row.date)}
          suffix='realizados'
          chartData={[
            {
              name: 'Mantenimientos',
              type: 'area',
              fill: 'gradient',
              data: bloc.state.map(row => row.count),
            },
          ]}
        />
      )
    }

    if (bloc instanceof MaintenanceFindMadePerDayBlocLoading) {
      return <Skeleton animation="wave" variant="rounded" height={380} />
    }

    return <>Ha ocurrido un error al consultar las estadísticas</>
  }

  useEffect(() => {
    maintenanceFindMadePerDay(token)
      .then((response) => {
        setBloc(new MaintenanceFindMadePerDayBlocSuccess(response.data))
      }).catch((error) => {
        setBloc(new MaintenanceFindMadePerDayBlocFailure(error))
      })
  }, [])

  return (
    <>
      <Container maxWidth="xl">
        <Typography variant="h4" sx={{ mb: 5 }}>
          Bienvenido
        </Typography>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            {charRender()}
          </Grid>
        </Grid>
      </Container>
    </>
  );
}

import { Grid, Container, Typography } from '@mui/material';
import { maintenanceFindMadePerDay } from 'api/maintenance';

import BarChar from 'components/metric/barChar';
import { useGetQueryApi } from 'hooks/getQueryApi';
import { authContext } from 'provider/Auth';
import { useContext } from 'react';

interface dataInterface {
  date: string
  count: number
}

export default function Dashboard() {
  const _authContext = useContext(authContext)
  const { token } = _authContext;

  const [data] = useGetQueryApi<dataInterface[]>(maintenanceFindMadePerDay(token), [])

  return (
    <>
      <Container maxWidth="xl">
        <Typography variant="h4" sx={{ mb: 5 }}>
          Bienvenido
        </Typography>

        <Grid container spacing={3}>
          <Grid item xs={12}>
            <BarChar
              title="Mantenimientos realizados"
              chartLabels={data.map(row => row.date)}
              suffix='realizados'
              chartData={[
                {
                  name: 'Mantenimientos',
                  type: 'area',
                  fill: 'gradient',
                  data: data.map(row => row.count),
                },
              ]}
            />
          </Grid>
        </Grid>
      </Container>
    </>
  );
}

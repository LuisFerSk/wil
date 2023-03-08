import LibraryAddIcon from '@mui/icons-material/LibraryAdd';
import { Box, Card, Grid } from "@mui/material";

import { Accordion } from "components";
import { RegisterSupport, TableSupport } from './components';

export default function Support() {
    const Accordions = [
        {
            title: 'Agregar soporte',
            icon: <LibraryAddIcon color='primary' />,
            content: <RegisterSupport />
        }
    ]

    return (
        <Grid container spacing={3} paddingX={2}>
            <Grid item xs={12} md={12} sm={12} lg={12}>
                <Card>
                    <Accordion accordions={Accordions} indexOpen={0} />
                </Card>
            </Grid>
            <Grid item xs={12} md={12} sm={12} lg={12}>
                <Box>
                    <TableSupport />
                </Box>
            </Grid>
        </Grid>
    )
}
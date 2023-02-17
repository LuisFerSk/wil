import LibraryAddIcon from '@mui/icons-material/LibraryAdd';
import { Box, Card, Grid } from "@mui/material";
import { useContext, useEffect, useState } from 'react';

import { supportFindAll } from 'services/support';
import { Accordion } from "components";
import { SupportInterface } from 'interfaces';
import { authContext } from 'provider/Auth';

import { RegisterSupport, TableSupport } from './components';

export default function Support() {
    const [support, setSupport] = useState<SupportInterface[] | []>([])

    const _authContext = useContext(authContext)
    const { token } = _authContext;

    const Accordions = [
        {
            title: 'Agregar soporte',
            icon: <LibraryAddIcon color='primary' />,
            content: <RegisterSupport setData={setSupport} />
        }
    ]

    useEffect(() => {
        supportFindAll(token).then((result) => {
            setSupport(result.data.info)
        })
    }, [])

    return (
        <Grid container spacing={6} paddingX={2}>
            <Grid item xs={12} md={12} sm={12} lg={12}>
                <Card>
                    <Accordion accordions={Accordions} indexOpen={0} />
                </Card>
            </Grid>
            <Grid item xs={12} md={12} sm={12} lg={12}>
                <Box>
                    <TableSupport data={support} setData={setSupport} />
                </Box>
            </Grid>
        </Grid>
    )
}
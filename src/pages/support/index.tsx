import LibraryAddIcon from '@mui/icons-material/LibraryAdd';
import { Box, Card, Grid } from "@mui/material";
import { supportFindAll } from 'services/support';
import { Accordion } from "components";
import { SupportInterface } from 'interfaces';
import { useContext, useEffect, useState } from 'react';
import { authContext } from 'provider/Auth';
import SupportRegister from './register';
import SupportTable from './table';

export default function Support(): JSX.Element {
    const [support, setSupport] = useState<SupportInterface[] | []>([])

    const _authContext = useContext(authContext)
    const { token } = _authContext;

    const Accordions = [
        {
            title: 'Agregar soporte',
            icon: <LibraryAddIcon color='primary' />,
            content: <SupportRegister setData={setSupport} />
        }
    ]

    useEffect(() => {
        supportFindAll(token).then((result) => {
            setSupport(result.data.info)
        })
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
                    <SupportTable data={support} setData={setSupport} />
                </Box>
            </Grid>
        </Grid>
    )
}
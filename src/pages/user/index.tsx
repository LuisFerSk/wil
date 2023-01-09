import LibraryAddIcon from '@mui/icons-material/LibraryAdd';
import { Box, Card, Grid } from "@mui/material";
import { Accordion } from "components";
import { UserInterface } from 'interfaces';
import { useContext, useEffect, useState } from 'react';
import { authContext } from 'provider/Auth';
import UserTable from './table';
import UserRegister from './register';
import { userFindAll } from 'services/user';

export default function User(): JSX.Element {
    const [users, setUsers] = useState<UserInterface[] | []>([])

    const _authContext = useContext(authContext)
    const { token } = _authContext;

    const Accordions = [
        {
            title: 'Agregar usuario',
            icon: <LibraryAddIcon color='primary' />,
            content: <UserRegister setData={setUsers} />
        }
    ]

    useEffect(() => {
        if (!token) {
            return;
        }

        userFindAll(token)
            .then((result) => {
                if (result.status >= 200 || result.status < 300) {
                    setUsers(result.data.info)
                }
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
                    <UserTable data={users} setData={setUsers} />
                </Box>
            </Grid>
        </Grid>
    )
}
import { useFormik } from 'formik'
import { useContext } from 'react'
import { Button, Grid, Paper, TextField, Typography, useTheme } from '@mui/material'

import { loginSchema } from './schema'
import { Form, Logo, TextFieldPassword } from 'components'
import { useFormikFiledProps, useMessage } from 'hooks'
import { login } from 'services/auth'
import { AuthContext } from 'provider/Auth'
import { SignInRequest } from 'services/models'

export default function Login() {
	const authContext = useContext(AuthContext)

	const theme = useTheme()

	const [mensaje, setMensaje, mensajeLoader] = useMessage()

	const formik = useFormik({
		initialValues: new SignInRequest(),
		validationSchema: loginSchema,
		onSubmit: (data) => {
			mensajeLoader()
			login(new SignInRequest(data))
				.then((result) => {
					authContext.login && authContext.login(result.data)
				})
				.catch((err) => {
					setMensaje('error', err.response.data)
				})
		},
	})

	const [getFieldFormikProps] = useFormikFiledProps(formik)

	return (
		<Form formik={formik}>
			<Grid
				container
				direction="column"
				justifyContent="center"
				alignItems="center"
				style={{
					minHeight: '100vh',
					backgroundRepeat: 'no-repeat',
					backgroundSize: '100% 100%',
				}}
			>
				<Grid
					container
					padding={3}
					spacing={2}
					component={Paper}
					elevation={5}
					style={{
						width: '40vw',
						minWidth: '310px',
						opacity: 1,
					}}
				>
					<Grid item xs={12} textAlign='center'>
						<Logo height={100} />
						<Typography color={theme.palette.primary.main} variant="h5">
							Coordinación de Sistemas y TICS
						</Typography>
					</Grid>
					<Grid item xs={12} textAlign='center'>
						{mensaje}
					</Grid>
					<Grid item xs={12}>
						<TextField
							{...getFieldFormikProps("username")}
							fullWidth
							type="text"
							label="Nombre de Usuario"
							variant="outlined"
						/>
					</Grid>
					<Grid item xs={12}>
						<TextFieldPassword
							{...getFieldFormikProps("password")}
							type="password"
							label="Contraseña"
							variant="outlined"
						/>
					</Grid>
					<Grid item xs={12} marginBottom={2} textAlign='center'>
						<Button variant="contained" color="primary" type="submit" >
							Iniciar sesión
						</Button>
					</Grid>
				</Grid>
			</Grid >
		</Form >
	)
}
import { useFormik } from 'formik'
import { loginInitialValues, loginSchema } from './schema'
import { Form, Logo, TextFieldPassword } from 'components'
import { useFormikFiledProps, useMessage } from 'hooks'
import { Button, Grid, Paper, TextField } from '@mui/material'
import { useNavigate } from 'react-router-dom'



function Login(): JSX.Element {
	const navigate = useNavigate();
	const [mensaje, setMensaje, mensajeLoader] = useMessage()

	const formik = useFormik({
		initialValues: loginInitialValues,
		validationSchema: loginSchema,
		onSubmit: (data) => {
			mensajeLoader()
			navigate("/")
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
					// backgroundImage: `url(${ImgFondo})`,
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

export default Login
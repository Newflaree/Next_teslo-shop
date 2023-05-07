// React
import {useState} from 'react';
// Next.js
import NextLink from 'next/link';
// Material UI
import {
  Box,
  Button,
  Link,
  Grid,
  TextField,
  Typography,
  Chip
} from '@mui/material';
// Material Icons
import {ErrorOutline} from '@mui/icons-material';
// React Hook Form
import { useForm } from 'react-hook-form';
//
// Api
import { tesloApi } from '@/api';
// Components
import { AuthLayout } from '@/components/layouts';
// Utils
import { validation } from '@/utils';


const LoginPage = () => {
  const [ showError, setShowError ] = useState( false );
  const { register, handleSubmit, watch, formState: { errors } } = useForm();

  const onLoginUser = async ({ email, password }) => {
    setShowError( false );

    try {
      const { data } = await tesloApi.post( '/auth/login', { email, password } );
      const { token, registeredUser } = data;
      console.log({ token, registeredUser });

      //TODO: Navegar la la pantalla desde la que viene en la app

    } catch ( error ) {
      console.log( error.response.data );
      setShowError( true );

      setTimeout( () => {
        setShowError( false );

      }, 4000 );
    }
  }

  return (
    <AuthLayout title='Ingresar'>
      <form
        onSubmit={ handleSubmit( onLoginUser ) }
        noValidate={ true }
      >
        <Box
          sx={{
            width: 350,
            padding: '10px 20px'
          }}
        >
          <Grid
            className="fadeIn"
            container
            spacing={ 2 }
          >
            <Grid
              item
              xs={ 12 }
              paddingY={ 4 }
            >
              <Typography
                variant='h1'
                component='h1'
                sx={{
                  textAlign: 'center'
                }}
              >
                Iniciar Sesión
              </Typography>
              <Chip 
                className='fadeIn'
                label='Correo electrónico o contraseña inválidos'
                color='error'
                icon={ <ErrorOutline /> }
                sx={{
                  mt: 2,
                  display: showError ? 'flex' : 'none',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              />
            </Grid>

            <Grid
              item
              xs={ 12 }
            >
              <TextField 
                type='email'
                label='Correo'
                fullWidth
                variant='filled'
                { ...register( 'email', {
                  required: 'Este campo es requerido',
                  validate: validation.isEmail
                }) }
                error={ !!errors.email }
                helperText={ errors.email?.message }
              />
            </Grid>

            <Grid
              item
              xs={ 12 }
            >
              <TextField 
                type='password'
                label='Contraseña'
                fullWidth
                variant='filled'
                { ...register( 'password', {
                  required: 'Este campo es requerido',
                  minLength: { value: 6, message: 'Mínimo 6 carácteres' }
                }) }
                error={ !!errors.password }
                helperText={ errors.password?.message }
              />
            </Grid>

            <Grid
              item
              xs={ 12 }
              marginY={ 2 }
            >
              <Button
                type='submit'
                fullWidth
                color='secondary'
                className='circular-btn'
                size='large'
              >
                Ingresar
              </Button>
            </Grid>

            <Grid
              item
              xs={ 12 }
              display='flex'
              justifyContent='end'
            >
              <NextLink
                href='/auth/register'
                passHref
                legacyBehavior
              >
                <Link
                  underline='always'
                  color='rgba(0,0,0)'
                >
                  ¿No tienes cuenta?
                </Link>
              </NextLink>
            </Grid>
          </Grid>
        </Box>
      </form>
    </AuthLayout>
  );
}

export default LoginPage;

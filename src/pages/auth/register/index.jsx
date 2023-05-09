/**
 * Author: [Camilo López A.]
 * Date: [creación/modificación]
 * Description: Página de registro para la aplicación.
 *
 * Dependencies:
*/
// React
import { useContext, useState } from 'react';
// Next.js
import NextLink from 'next/link';
import { useRouter } from 'next/router';
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
import { ErrorOutline } from '@mui/icons-material';
// React Hook Form
import { useForm } from 'react-hook-form';
//
// Api
import { tesloApi } from '@/api';
// Components
import { AuthLayout } from '@/components/layouts';
// Context
import { AuthContext } from '@/context';
// Utils
import { validation } from '@/utils';


/**
 * RegisterPage component
 *
 * Displays a registration form for the user to create an account.
 *
 * @return {JSX.Element} The JSX for the registration page.
 */
const RegisterPage = () => {

  const { replace, query } = useRouter()
  const { registerUser } = useContext( AuthContext );
  const { register, handleSubmit, watch, formState: { errors } } = useForm();
  const [ showError, setShowError ] = useState( false );
  const [ errorMessage, setErrorMessage ] = useState( '' );

  const onRegisterUser = async ({ email, password, name }) => {
    setShowError( false );

    const { hasError, message } = await registerUser( email, password, name );

    if ( hasError ) {
      setShowError( true );
      setErrorMessage( message )

      setTimeout( () => setShowError( false ), 4000 );

      return;
    }

    const destination = query.page?.toString() || '/';

    replace( destination );
  }

  return (
    <AuthLayout title='Registro'>
      <form
        onSubmit={ handleSubmit( onRegisterUser ) }
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
                Crear cuenta
              </Typography>
              <Chip
                className='fadeIn'
                label='Custom Error'
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
                type='text'
                label='Nombre'
                variant='filled'
                fullWidth
                { ...register( 'name', {
                  required: 'Debe ingresar su nombre',
                  minLength: { value: 2, message: 'Mínimo 2 carácteres' }
                }) }
                error={ !!errors.name }
                helperText={ errors.name?.message }
              />
            </Grid>

            <Grid
              item
              xs={ 12 }
            >
              <TextField 
                type='email'
                label='Correo electrónico'
                variant='filled'
                fullWidth
                { ...register( 'email', {
                  required: 'Debe ingresar su correo electrónico',
                  validate: validation.email
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
                variant='filled'
                fullWidth
                { ...register( 'password', {
                  required: 'Debe ingresar una contraseña',
                  minLength: { value: 6, message: 'Mínimo 6 carácteres' }
                }) }
                error={ !!errors.password }
                helperText={ errors.password?.message }
              />
            </Grid>

            <Grid
              item
              xs={ 12 }
            >
              <TextField 
                label='Repetir contraseña'
                type='password'
                variant='filled'
                fullWidth
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
                Registrarse
              </Button>
            </Grid>

            <Grid
              item
              xs={ 12 }
              display='flex'
              justifyContent='end'
            >
              <NextLink
                href={ query.page ? `/auth/login?page=${ query.page }` : '/auth/login' }
                passHref
                legacyBehavior
              >
                <Link
                  underline='always'
                  color='rgba(0,0,0)'
                >
                  ¿Ya tienes una cuenta?
                </Link>
              </NextLink>
            </Grid>
          </Grid>
        </Box>
      </form>
    </AuthLayout>
  );
}


export default RegisterPage;

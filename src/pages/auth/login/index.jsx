// Next.js
import NextLink from "next/link";
// Material UI
import {
  Box,
  Button,
  Link,
  Grid,
  TextField,
  Typography
} from "@mui/material";
// Components
import { AuthLayout } from "@/components/layouts";

const LoginPage = () => {
  return (
    <AuthLayout title='Ingresar'>
      <Box
        sx={{
          width: 350,
          padding: '10px 20px'
        }}
      >
        <Grid
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
          </Grid>

          <Grid
            item
            xs={ 12 }
          >
            <TextField 
              label='Correo'
              type='email'
              variant='filled'
              fullWidth
            />
          </Grid>

          <Grid
            item
            xs={ 12 }
          >
            <TextField 
              label='Contraseña'
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
    </AuthLayout>
  );
}

export default LoginPage;

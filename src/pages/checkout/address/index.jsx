// Material UI
import {
  Box,
  Button,
  FormControl,
  Grid,
  MenuItem,
  Select,
  TextField,
  Typography
} from '@mui/material';
// Layouts
import { ShopLayout } from '@/components/layouts';
// Utils
import { countries } from '@/utils';


const AddressPage = () => {
  return (
    <ShopLayout
      title='Dirección'
      pageDescription='Confirmar dirección del destino'
    >
      <Typography
        variant='h1'
        component='h1'
      >
        Dirección
      </Typography>

      <Grid
        container
        spacing={ 2 }
        sx={{
          mt: 2
        }}
      >
        <Grid
          item
          xs={ 12 }
          sm={ 6 }
        >
          <TextField 
            label='Nombre'
            variant='filled'
            fullWidth
          />
        </Grid>

        <Grid
          item
          xs={ 12 }
          sm={ 6 }
        >
          <TextField 
            label='Apellido'
            variant='filled'
            fullWidth
          />
        </Grid>

        <Grid
          item
          xs={ 12 }
          sm={ 6 }
        >
          <TextField 
            label='Dirección'
            variant='filled'
            fullWidth
          />
        </Grid>

        <Grid
          item
          xs={ 12 }
          sm={ 6 }
        >
          <TextField 
            label='Dirección 2 (opcional)'
            variant='filled'
            fullWidth
          />
        </Grid>

        <Grid
          item
          xs={ 12 }
          sm={ 6 }
        >
          <TextField 
            label='Código Postal'
            variant='filled'
            fullWidth
          />
        </Grid>

        <Grid
          item
          xs={ 12 }
          sm={ 6 }
        >
          <TextField 
            label='Ciudad'
            variant='filled'
            fullWidth
          />
        </Grid>

        <Grid
          item
          xs={ 12 }
          sm={ 6 }
        >
          <FormControl fullWidth>
            <Select
              variant='filled'
              label='Pais'
              value={ 'CHL' }
            >
              {
                countries.map( country => (
                  <MenuItem
                    key={ country.code }
                    value={ country.code }
                  >
                    { country.name }
                  </MenuItem>
                ))
              }
            </Select>
          </FormControl>
        </Grid>

        <Grid
          item
          xs={ 12 }
          sm={ 6 }
        >
          <TextField 
            label='Teléfono'
            variant='filled'
            fullWidth
          />
        </Grid>
      </Grid>

      <Box
        sx={{
          mt: 5,
          display: 'flex',
          justifyContent: 'center'
        }}
      >
        <Button
          color='secondary'
          className='circular-btn'
          size='large'
        >
          Revisar pedido
        </Button>
      </Box>
    </ShopLayout>
  );
}


/*
export const getServerSideProps = async ({ req }) => {
  const { token } = req.cookies;
  let isValidToken = false;

  try {
    await jwt.isValidToken( token );
    isValidToken = true;

  } catch ( error ) {
    isValidToken = false;
  }

  if ( !isValidToken ) {
    return {
      redirect: {
        destination: '/auth/login?page=/checkout/address',
        permanent: false
      }
    }
  }

  return {
    props: {
    }
  }
}
  * */


export default AddressPage;
